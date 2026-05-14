// backend/src/routes/index.js - Main route aggregator

import express from "express";
import authRoutes from "./auth.routes.js";
import newbornRoutes from "./newborn.routes.js";
import consultationRoutes from "./consultation.routes.js";
import vaccinationRoutes from "./vaccination.routes.js";
import growthRoutes from "./growth.routes.js";
import prescriptionRoutes from "./prescription.routes.js";
import billingRoutes from "./billing.routes.js";
import smartcardRoutes from "./smartcard.routes.js";
import notificationRoutes from "./notification.routes.js";
import analyticsRoutes from "./analytics.routes.js";
import permissionRoutes from "./permission.routes.js";

const router = express.Router();

// API Routes
router.get("/", (req, res) => {
  res.json({
    name: "GeniDoc Hayat API",
    version: "0.1.0",
    status: "running",
    endpoints: {
      auth: "/api/auth",
      users: "/api/users",
      newborns: "/api/newborns",
      consultations: "/api/consultations",
      vaccinations: "/api/vaccinations",
      growth: "/api/growth",
      prescriptions: "/api/prescriptions",
      billing: "/api/billing",
      smartcards: "/api/smartcards",
      notifications: "/api/notifications",
      analytics: "/api/analytics",
      permissions: "/api/permissions",
      documents: "/api/documents",
      facilities: "/api/facilities",
      fhir: "/api/fhir",
    },
  });
});

// Register all routes
router.use("/auth", authRoutes);
router.use("/newborns", newbornRoutes);
router.use("/consultations", consultationRoutes);
router.use("/vaccinations", vaccinationRoutes);
router.use("/growth", growthRoutes);
router.use("/prescriptions", prescriptionRoutes);
router.use("/billing", billingRoutes);
router.use("/smartcards", smartcardRoutes);
router.use("/notifications", notificationRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/permissions", permissionRoutes);

export default router;
