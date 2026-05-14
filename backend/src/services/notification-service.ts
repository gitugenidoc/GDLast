// backend/src/services/notification-service.ts
// Real-time Notification Service with Email & SMS support

import { Database } from "@cloudflare/d1";

export interface Notification {
  id?: string;
  user_id: string;
  title: string;
  message: string;
  type?: "INFO" | "SUCCESS" | "WARNING" | "ERROR";
  is_read?: boolean;
  link?: string;
  created_at?: string;
}

export class NotificationService {
  private db: Database;
  private sendgridKey?: string;
  private twilioSid?: string;
  private twilioToken?: string;

  constructor(
    db: Database,
    options?: {
      sendgridKey?: string;
      twilioSid?: string;
      twilioToken?: string;
    },
  ) {
    this.db = db;
    this.sendgridKey = options?.sendgridKey;
    this.twilioSid = options?.twilioSid;
    this.twilioToken = options?.twilioToken;
  }

  async send(
    userId: string,
    notification: Omit<
      Notification,
      "id" | "user_id" | "created_at" | "is_read"
    >,
    opts?: { sendEmail?: boolean; sendSms?: boolean },
  ): Promise<string> {
    try {
      const id = this.generateId();
      const now = new Date().toISOString();

      await this.db
        .prepare(
          `INSERT INTO notifications 
           (id, user_id, title, message, type, link, is_read, created_at) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        )
        .bind(
          id,
          userId,
          notification.title,
          notification.message,
          notification.type || "INFO",
          notification.link,
          false,
          now,
        )
        .run();

      // Optional: Send email
      if (opts?.sendEmail) {
        await this.sendEmail(userId, notification);
      }

      // Optional: Send SMS
      if (opts?.sendSms) {
        await this.sendSms(userId, notification);
      }

      return id;
    } catch (error) {
      console.error("Failed to send notification:", error);
      throw error;
    }
  }

  async getNotifications(
    userId: string,
    unreadOnly: boolean = false,
  ): Promise<Notification[]> {
    try {
      let query = "SELECT * FROM notifications WHERE user_id = ?";
      const params: any[] = [userId];

      if (unreadOnly) {
        query += " AND is_read = 0";
      }

      query += " ORDER BY created_at DESC LIMIT 50";

      const result = await this.db
        .prepare(query)
        .bind(...params)
        .all<Notification>();

      return result.results || [];
    } catch (error) {
      console.error("Failed to get notifications:", error);
      return [];
    }
  }

  async markAsRead(notificationId: string): Promise<void> {
    try {
      await this.db
        .prepare(
          "UPDATE notifications SET is_read = 1, read_at = ? WHERE id = ?",
        )
        .bind(new Date().toISOString(), notificationId)
        .run();
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  }

  async markAllAsRead(userId: string): Promise<void> {
    try {
      await this.db
        .prepare(
          "UPDATE notifications SET is_read = 1, read_at = ? WHERE user_id = ?",
        )
        .bind(new Date().toISOString(), userId)
        .run();
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  }

  private async sendEmail(
    userId: string,
    notification: Notification,
  ): Promise<void> {
    if (!this.sendgridKey) return;

    try {
      // Get user email from database
      const user = await this.db
        .prepare("SELECT email FROM users WHERE id = ?")
        .bind(userId)
        .first<{ email: string }>();

      if (!user?.email) return;

      const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.sendgridKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: user.email }],
              subject: notification.title,
            },
          ],
          from: { email: "noreply@genidoc-hayat.com" },
          content: [
            {
              type: "text/html",
              value: `<h3>${notification.title}</h3><p>${notification.message}</p>`,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`SendGrid error: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Failed to send email notification:", error);
    }
  }

  private async sendSms(
    userId: string,
    notification: Notification,
  ): Promise<void> {
    if (!this.twilioSid || !this.twilioToken) return;

    try {
      // Get user phone from database
      const user = await this.db
        .prepare("SELECT phone FROM users WHERE id = ?")
        .bind(userId)
        .first<{ phone: string }>();

      if (!user?.phone) return;

      const auth = btoa(`${this.twilioSid}:${this.twilioToken}`);
      const response = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${this.twilioSid}/Messages.json`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            From: "+1234567890", // Your Twilio number
            To: user.phone,
            Body: `${notification.title}: ${notification.message}`,
          }).toString(),
        },
      );

      if (!response.ok) {
        throw new Error(`Twilio error: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Failed to send SMS notification:", error);
    }
  }

  private generateId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 9);
    return `NOTIF-${timestamp}-${random}`.toUpperCase();
  }
}

export default NotificationService;
