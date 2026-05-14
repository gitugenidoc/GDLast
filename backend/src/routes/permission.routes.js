// backend/src/routes/permission.routes.js

import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import * as permissionController from "../controllers/permission.controller.js";

const router = Router();

router.post("/request", authenticate, permissionController.requestAccess);
router.put("/:id/approve", authenticate, permissionController.approveAccess);
router.put("/:id/deny", authenticate, permissionController.denyAccess);
router.get(
  "/:newbornId/:pediatricianId",
  authenticate,
  permissionController.checkAccess,
);

export default router;
