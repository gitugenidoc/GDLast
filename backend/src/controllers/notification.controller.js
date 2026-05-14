// backend/src/controllers/notification.controller.js

import { NotificationService } from "../services/notification.service.js";

export const getUnread = async (req, res, next) => {
  try {
    const parentProfile = await prisma.parentProfile.findUnique({
      where: { userId: req.user.userId },
    });

    if (!parentProfile) return res.json({ status: "success", data: [] });

    const notifications = await NotificationService.getUnread(parentProfile.id);
    res.json({ status: "success", data: notifications });
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    const result = await NotificationService.markAsRead(req.params.id);
    res.json({ status: "success", data: result });
  } catch (error) {
    next(error);
  }
};
