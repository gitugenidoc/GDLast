// backend/src/routes/auth.routes.js - Auth API endpoints

import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

/**
 * POST /api/auth/register - Register new user
 */
router.post("/register", authController.register);

/**
 * POST /api/auth/login - Login user
 */
router.post("/login", authController.login);

/**
 * POST /api/auth/refresh - Refresh access token
 */
router.post("/refresh", authController.refresh);

/**
 * GET /api/auth/me - Get current user (protected)
 */
router.get("/me", authenticate, authController.me);

/**
 * POST /api/auth/logout - Logout user (protected)
 */
router.post("/logout", authenticate, authController.logout);

export default router;
