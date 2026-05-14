// backend/src/services/auth.service.js - Authentication business logic

import { prisma } from "../prisma/client.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";
import { logger } from "../utils/logger.js";

export class AuthService {
  /**
   * Register a new user
   */
  static async register({ email, password, firstName, lastName, phone, role }) {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        role,
        status: "ACTIVE",
      },
    });

    // Create role-specific profile if PARENT
    if (role === "PARENT") {
      await prisma.parentProfile.create({
        data: {
          userId: user.id,
          status: "ACTIVE",
        },
      });
    } else if (role === "PEDIATRICIAN") {
      await prisma.pediatricianProfile.create({
        data: {
          userId: user.id,
          status: "ACTIVE",
        },
      });
    }

    // Log audit
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: "USER_REGISTERED",
        resource: "USER",
        resourceId: user.id,
        status: "SUCCESS",
      },
    });

    logger.info(`User registered: ${user.id} (${user.email})`);

    // Generate tokens
    const accessToken = generateAccessToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id);

    return {
      user: this._formatUser(user),
      accessToken,
      refreshToken,
    };
  }

  /**
   * Login user
   */
  static async login({ email, password }) {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Check password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // Check user status
    if (user.status !== "ACTIVE") {
      throw new Error("User account is not active");
    }

    // Log audit
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: "USER_LOGIN",
        resource: "USER",
        resourceId: user.id,
        status: "SUCCESS",
      },
    });

    logger.info(`User logged in: ${user.id} (${user.email})`);

    // Generate tokens
    const accessToken = generateAccessToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id);

    return {
      user: this._formatUser(user),
      accessToken,
      refreshToken,
    };
  }

  /**
   * Refresh access token
   */
  static async refreshToken(refreshToken) {
    try {
      const decoded = verifyRefreshToken(refreshToken);
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user || user.status !== "ACTIVE") {
        throw new Error("User not found or inactive");
      }

      const newAccessToken = generateAccessToken(user.id, user.role);
      const newRefreshToken = generateRefreshToken(user.id);

      return {
        user: this._formatUser(user),
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new Error("Invalid refresh token");
    }
  }

  /**
   * Get current user
   */
  static async getCurrentUser(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        parentProfile: true,
        pediatricianProfile: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return this._formatUser(user);
  }

  /**
   * Logout user (audit log)
   */
  static async logout(userId) {
    await prisma.auditLog.create({
      data: {
        userId,
        action: "USER_LOGOUT",
        resource: "USER",
        resourceId: userId,
        status: "SUCCESS",
      },
    });

    logger.info(`User logged out: ${userId}`);
  }

  /**
   * Format user response (exclude password)
   */
  static _formatUser(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
