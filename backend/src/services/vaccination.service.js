// backend/src/services/vaccination.service.js

import { prisma } from "../prisma/client.js";
import { logger } from "../utils/logger.js";

export class VaccinationService {
  static async create(data, userId) {
    const vaccination = await prisma.vaccination.create({
      data,
      include: { newborn: true },
    });

    await prisma.auditLog.create({
      data: {
        userId,
        action: "VACCINATION_CREATED",
        resource: "VACCINATION",
        resourceId: vaccination.id,
        status: "SUCCESS",
      },
    });

    return vaccination;
  }

  static async getById(id) {
    return await prisma.vaccination.findUnique({
      where: { id },
      include: { newborn: true },
    });
  }

  static async listByNewborn(newbornId) {
    return await prisma.vaccination.findMany({
      where: { newbornId },
      orderBy: { administeredDate: "desc" },
    });
  }

  static async update(id, data, userId) {
    const vaccination = await prisma.vaccination.update({
      where: { id },
      data,
      include: { newborn: true },
    });

    await prisma.auditLog.create({
      data: {
        userId,
        action: "VACCINATION_UPDATED",
        resource: "VACCINATION",
        resourceId: id,
        status: "SUCCESS",
      },
    });

    return vaccination;
  }

  static async delete(id, userId) {
    await prisma.vaccination.delete({ where: { id } });

    await prisma.auditLog.create({
      data: {
        userId,
        action: "VACCINATION_DELETED",
        resource: "VACCINATION",
        resourceId: id,
        status: "SUCCESS",
      },
    });
  }
}
