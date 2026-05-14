// backend/src/services/audit-service.ts
// Comprehensive Audit Logging Service

import { Database } from "@cloudflare/d1";

export interface AuditLog {
  userId?: string;
  action: string;
  resourceType: string;
  resourceId: string;
  oldValue?: any;
  newValue?: any;
  ipAddress?: string;
  userAgent?: string;
}

export class AuditService {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async log(audit: AuditLog, request?: Request): Promise<void> {
    try {
      const id = this.generateId();
      const now = new Date().toISOString();

      await this.db
        .prepare(
          `INSERT INTO audit_logs 
           (id, user_id, action, resource_type, resource_id, old_value, new_value, ip_address, user_agent, created_at) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        )
        .bind(
          id,
          audit.userId,
          audit.action,
          audit.resourceType,
          audit.resourceId,
          JSON.stringify(audit.oldValue),
          JSON.stringify(audit.newValue),
          request?.headers.get("cf-connecting-ip") || "unknown",
          request?.headers.get("user-agent") || "unknown",
          now,
        )
        .run();
    } catch (error) {
      console.error("Audit log error:", error);
    }
  }

  async getLogs(
    resourceType?: string,
    resourceId?: string,
    limit: number = 100,
  ): Promise<AuditLog[]> {
    try {
      let query = "SELECT * FROM audit_logs WHERE 1=1";
      const params: any[] = [];

      if (resourceType) {
        query += " AND resource_type = ?";
        params.push(resourceType);
      }

      if (resourceId) {
        query += " AND resource_id = ?";
        params.push(resourceId);
      }

      query += " ORDER BY created_at DESC LIMIT ?";
      params.push(limit);

      const stmt = this.db.prepare(query);
      const result = await stmt.bind(...params).all();

      return result.results || [];
    } catch (error) {
      console.error("Failed to get audit logs:", error);
      return [];
    }
  }

  private generateId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 9);
    return `AUDIT-${timestamp}-${random}`.toUpperCase();
  }
}

export default AuditService;
