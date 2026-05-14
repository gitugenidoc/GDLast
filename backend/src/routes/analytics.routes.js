// backend/src/routes/analytics.routes.js

import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import * as analyticsController from "../controllers/analytics.controller.js";

const router = Router();

router.get(
  "/facility/:facilityId",
  authenticate,
  analyticsController.getFacilityDashboard,
);
router.get(
  "/newborn/:newbornId",
  authenticate,
  analyticsController.getNewbornMetrics,
);
router.get(
  "/pediatrician/:pediatricianId",
  authenticate,
  analyticsController.getPediatricianStats,
);
router.get(
  "/vaccination-coverage/:facilityId",
  authenticate,
  analyticsController.getVaccinationCoverage,
);

export default router;
