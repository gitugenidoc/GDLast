// backend/src/controllers/auth.controller.js - Auth HTTP endpoints

import { AuthService } from "../services/auth.service.js";
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
} from "../validators/auth.schema.js";
import { logger } from "../utils/logger.js";

/**
 * POST /api/auth/register
 */
export const register = async (req, res, next) => {
  try {
    // Validate request
    const validated = registerSchema.parse(req.body);

    // Register user
    const result = await AuthService.register(validated);

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        status: "error",
        message: "Validation error",
        errors: error.errors,
      });
    }
    next(error);
  }
};

/**
 * POST /api/auth/login
 */
export const login = async (req, res, next) => {
  try {
    // Validate request
    const validated = loginSchema.parse(req.body);

    // Login user
    const result = await AuthService.login(validated);

    res.status(200).json({
      status: "success",
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        status: "error",
        message: "Validation error",
        errors: error.errors,
      });
    }
    if (error.message === "Invalid email or password") {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }
    if (error.message === "User account is not active") {
      return res.status(403).json({
        status: "error",
        message: "User account is not active",
      });
    }
    next(error);
  }
};

/**
 * POST /api/auth/refresh
 */
export const refresh = async (req, res, next) => {
  try {
    const validated = refreshTokenSchema.parse(req.body);
    const result = await AuthService.refreshToken(validated.refreshToken);

    res.status(200).json({
      status: "success",
      message: "Token refreshed successfully",
      data: result,
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        status: "error",
        message: "Validation error",
        errors: error.errors,
      });
    }
    if (error.message === "Invalid refresh token") {
      return res.status(401).json({
        status: "error",
        message: "Invalid or expired refresh token",
      });
    }
    next(error);
  }
};

/**
 * GET /api/auth/me
 */
export const me = async (req, res, next) => {
  try {
    const user = await AuthService.getCurrentUser(req.user.userId);

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/logout
 */
export const logout = async (req, res, next) => {
  try {
    await AuthService.logout(req.user.userId);

    res.status(200).json({
      status: "success",
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};
