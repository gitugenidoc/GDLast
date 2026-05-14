// backend/src/services/consultation.service.js

import { prisma } from "../prisma/client.js";

export class ConsultationService {
  static async create(data, userId) {
    const consultation = await prisma.consultation.create({
      data: {
        ...data,
        consultedAt: data.consultedAt ? new Date(data.consultedAt) : new Date(),
      },
      include: { newborn: true, pediatrician: { include: { user: true } } },
    });

    await prisma.auditLog.create({
      data: {
        userId,
        action: "CONSULTATION_CREATED",
        resource: "CONSULTATION",
        resourceId: consultation.id,
        status: "SUCCESS",
      },
    });

    return consultation;
  }

  static async getById(id) {
    return await prisma.consultation.findUnique({
      where: { id },
      include: { newborn: true, pediatrician: { include: { user: true } } },
    });
  }

  static async listByNewborn(newbornId) {
    return await prisma.consultation.findMany({
      where: { newbornId },
      include: { pediatrician: { include: { user: true } } },
      orderBy: { consultedAt: "desc" },
    });
  }

  static async update(id, data, userId) {
    const consultation = await prisma.consultation.update({
      where: { id },
      data: {
        ...data,
        consultedAt: data.consultedAt ? new Date(data.consultedAt) : undefined,
      },
      include: { newborn: true, pediatrician: { include: { user: true } } },
    });

    await prisma.auditLog.create({
      data: {
        userId,
        action: "CONSULTATION_UPDATED",
        resource: "CONSULTATION",
        resourceId: id,
        status: "SUCCESS",
      },
    });

    return consultation;
  }

  static async delete(id, userId) {
    await prisma.consultation.delete({ where: { id } });

    await prisma.auditLog.create({
      data: {
        userId,
        action: "CONSULTATION_DELETED",
        resource: "CONSULTATION",
        resourceId: id,
        status: "SUCCESS",
      },
    });
  }
}
