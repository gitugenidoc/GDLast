// backend/src/services/growth.service.js

import { prisma } from "../prisma/client.js";

export class GrowthService {
  static async create(data, userId) {
    const growth = await prisma.growthRecord.create({
      data: {
        ...data,
        measuredAt: data.measuredAt ? new Date(data.measuredAt) : new Date(),
      },
      include: { newborn: true },
    });

    await prisma.auditLog.create({
      data: {
        userId,
        action: "GROWTH_CREATED",
        resource: "GROWTH",
        resourceId: growth.id,
        status: "SUCCESS",
      },
    });

    return growth;
  }

  static async listByNewborn(newbornId) {
    return await prisma.growthRecord.findMany({
      where: { newbornId },
      orderBy: { measuredAt: "desc" },
    });
  }

  static async update(id, data, userId) {
    const growth = await prisma.growthRecord.update({
      where: { id },
      data: {
        ...data,
        measuredAt: data.measuredAt ? new Date(data.measuredAt) : undefined,
      },
      include: { newborn: true },
    });

    await prisma.auditLog.create({
      data: {
        userId,
        action: "GROWTH_UPDATED",
        resource: "GROWTH",
        resourceId: id,
        status: "SUCCESS",
      },
    });

    return growth;
  }

  static async delete(id, userId) {
    await prisma.growthRecord.delete({ where: { id } });

    await prisma.auditLog.create({
      data: {
        userId,
        action: "GROWTH_DELETED",
        resource: "GROWTH",
        resourceId: id,
        status: "SUCCESS",
      },
    });
  }
}
