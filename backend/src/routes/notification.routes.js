// backend/src/routes/notification.routes.js

import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import * as notificationController from "../controllers/notification.controller.js";

const router = Router();

router.get("/unread", authenticate, notificationController.getUnread);
router.put("/:id/read", authenticate, notificationController.markAsRead);

export default router;
