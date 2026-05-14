// backend/src/services/newborn.service.js - Newborn management

import { prisma } from "../prisma/client.js";
import { logger } from "../utils/logger.js";

export class NewbornService {
  static async create(
    {
      genidocId,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      bloodType,
      city,
      facilityId,
    },
    userId,
  ) {
    const newborn = await prisma.newborn.create({
      data: {
        genidocId,
        firstName,
        lastName,
        dateOfBirth: new Date(dateOfBirth),
        gender,
        bloodType,
        city,
        facilityId,
        parentId: (await prisma.parentProfile.findUnique({ where: { userId } }))
          ?.id,
      },
      include: { parent: { include: { user: true } } },
    });

    await prisma.auditLog.create({
      data: {
        userId,
        action: "NEWBORN_CREATED",
        resource: "NEWBORN",
        resourceId: newborn.id,
        status: "SUCCESS",
      },
    });

    logger.info(`Newborn created: ${newborn.id}`);
    return newborn;
  }

  static async getById(id, userId) {
    const newborn = await prisma.newborn.findUnique({
      where: { id },
      include: {
        parent: { include: { user: true } },
        smartCards: true,
        consultations: {
          include: { pediatrician: { include: { user: true } } },
        },
        vaccinations: true,
        growthRecords: true,
      },
    });

    if (!newborn) throw new Error("Newborn not found");
    return newborn;
  }

  static async listByParent(userId) {
    const parentProfile = await prisma.parentProfile.findUnique({
      where: { userId },
    });
    if (!parentProfile) return [];

    return await prisma.newborn.findMany({
      where: { parentId: parentProfile.id },
      include: { smartCards: true, consultations: true, vaccinations: true },
      orderBy: { createdAt: "desc" },
    });
  }

  static async listByFacility(facilityId) {
    return await prisma.newborn.findMany({
      where: { facilityId },
      include: { parent: { include: { user: true } }, smartCards: true },
      orderBy: { createdAt: "desc" },
    });
  }

  static async update(id, data, userId) {
    const newborn = await prisma.newborn.update({
      where: { id },
      data: {
        ...data,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
      },
      include: { parent: { include: { user: true } } },
    });

    await prisma.auditLog.create({
      data: {
        userId,
        action: "NEWBORN_UPDATED",
        resource: "NEWBORN",
        resourceId: newborn.id,
        status: "SUCCESS",
      },
    });

    return newborn;
  }

  static async delete(id, userId) {
    await prisma.newborn.delete({ where: { id } });

    await prisma.auditLog.create({
      data: {
        userId,
        action: "NEWBORN_DELETED",
        resource: "NEWBORN",
        resourceId: id,
        status: "SUCCESS",
      },
    });
  }
}
