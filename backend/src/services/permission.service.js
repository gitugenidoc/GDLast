// backend/src/services/permission.service.js

import { prisma } from "../prisma/client.js";

export class PermissionService {
  static async requestAccess(newbornId, parentId, pediatricianId, userId) {
    const permission = await prisma.accessPermission.create({
      data: {
        newbornId,
        parentId,
        pediatricianId,
        status: "PENDING",
        requestedAt: new Date(),
      },
      include: { newborn: true, parent: { include: { user: true } } },
    });

    await prisma.auditLog.create({
      data: {
        userId,
        action: "ACCESS_REQUESTED",
        resource: "PERMISSION",
        resourceId: permission.id,
        status: "SUCCESS",
      },
    });

    return permission;
  }

  static async approveAccess(permissionId, userId, expiryDays = 365) {
    const permission = await prisma.accessPermission.update({
      where: { id: permissionId },
      data: {
        status: "APPROVED",
        respondedAt: new Date(),
        expiresAt: new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000),
      },
      include: { newborn: true, parent: { include: { user: true } } },
    });

    await prisma.auditLog.create({
      data: {
        userId,
        action: "ACCESS_APPROVED",
        resource: "PERMISSION",
        resourceId: permission.id,
        status: "SUCCESS",
      },
    });

    return permission;
  }

  static async denyAccess(permissionId, userId) {
    const permission = await prisma.accessPermission.update({
      where: { id: permissionId },
      data: {
        status: "DENIED",
        respondedAt: new Date(),
      },
    });

    await prisma.auditLog.create({
      data: {
        userId,
        action: "ACCESS_DENIED",
        resource: "PERMISSION",
        resourceId: permission.id,
        status: "SUCCESS",
      },
    });

    return permission;
  }

  static async checkAccess(newbornId, pediatricianId) {
    const permission = await prisma.accessPermission.findFirst({
      where: {
        newbornId,
        pediatricianId,
        status: "APPROVED",
        expiresAt: { gt: new Date() },
      },
    });

    return !!permission;
  }
}
