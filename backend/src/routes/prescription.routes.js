// backend/src/routes/prescription.routes.js

import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import * as prescriptionController from "../controllers/prescription.controller.js";

const router = Router();

router.post("/", authenticate, prescriptionController.createPrescription);
router.get(
  "/newborn/:newbornId",
  authenticate,
  prescriptionController.getPrescriptionsByNewborn,
);
router.post(
  "/:id/dispense",
  authenticate,
  prescriptionController.dispensePrescription,
);
router.post(
  "/check-interactions",
  authenticate,
  prescriptionController.checkDrugInteractions,
);

export default router;
