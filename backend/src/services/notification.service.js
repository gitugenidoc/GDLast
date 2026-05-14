// backend/src/services/notification.service.js

import { prisma } from "../prisma/client.js";

export class NotificationService {
  static async create(parentId, data) {
    return await prisma.notification.create({
      data: {
        parentId,
        title: data.title,
        message: data.message,
        type: data.type,
        isRead: false,
      },
    });
  }

  static async getUnread(parentId) {
    return await prisma.notification.findMany({
      where: { parentId, isRead: false },
      orderBy: { createdAt: "desc" },
    });
  }

  static async markAsRead(notificationId) {
    return await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });
  }

  static async notifyNewConsultation(newbornId, consultationData) {
    const newborn = await prisma.newborn.findUnique({
      where: { id: newbornId },
      include: { parent: { include: { user: true } } },
    });

    if (!newborn) return;

    return await this.create(newborn.parent.id, {
      title: "Nouvelle consultation",
      message: `Une consultation a été créée pour ${newborn.firstName} ${newborn.lastName}`,
      type: "consultation",
    });
  }

  static async notifyVaccinationDue(newbornId) {
    const newborn = await prisma.newborn.findUnique({
      where: { id: newbornId },
      include: { parent: { include: { user: true } } },
    });

    if (!newborn) return;

    return await this.create(newborn.parent.id, {
      title: "Vaccination due",
      message: `Une vaccination est prévue pour ${newborn.firstName}`,
      type: "vaccination",
    });
  }
}
