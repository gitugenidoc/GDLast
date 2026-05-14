// backend/src/services/prescription.service.js

import { prisma } from "../prisma/client.js";

export class PrescriptionService {
  static async create(data, userId) {
    const prescription = await prisma.prescription.create({
      data: {
        ...data,
        prescribedDate: data.prescribedDate
          ? new Date(data.prescribedDate)
          : new Date(),
      },
      include: { consultation: true, newborn: true },
    });

    await prisma.auditLog.create({
      data: {
        userId,
        action: "PRESCRIPTION_CREATED",
        resource: "PRESCRIPTION",
        resourceId: prescription.id,
        status: "SUCCESS",
      },
    });

    return prescription;
  }

  static async getById(id) {
    return await prisma.prescription.findUnique({
      where: { id },
      include: { consultation: true, newborn: true },
    });
  }

  static async listByNewborn(newbornId) {
    return await prisma.prescription.findMany({
      where: { newbornId },
      include: { consultation: true },
      orderBy: { prescribedDate: "desc" },
    });
  }

  static async update(id, data, userId) {
    const prescription = await prisma.prescription.update({
      where: { id },
      data: {
        ...data,
        prescribedDate: data.prescribedDate
          ? new Date(data.prescribedDate)
          : undefined,
      },
      include: { consultation: true, newborn: true },
    });

    await prisma.auditLog.create({
      data: {
        userId,
        action: "PRESCRIPTION_UPDATED",
        resource: "PRESCRIPTION",
        resourceId: id,
        status: "SUCCESS",
      },
    });

    return prescription;
  }
}
