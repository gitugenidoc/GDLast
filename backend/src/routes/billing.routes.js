// backend/src/routes/billing.routes.js

import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import * as billingController from "../controllers/billing.controller.js";

const router = Router();

router.post("/invoices", authenticate, billingController.createInvoice);
router.post("/payments", authenticate, billingController.recordPayment);
router.get(
  "/invoices/:facilityId",
  authenticate,
  billingController.listInvoices,
);

export default router;
