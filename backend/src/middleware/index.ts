// backend/src/middleware/index.ts
// Express-like middleware for Cloudflare Workers

import * as jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const corsMiddleware = (request: Request) => {
  const headers = {
    "Access-Control-Allow-Origin": process.env.CORS_ORIGIN || "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { headers });
  }

  return null;
};

export const authMiddleware = async (request: AuthRequest) => {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const token = authHeader.slice(7);

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret",
    ) as any;
    request.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };
    return null; // Continue to next handler
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid token" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const errorHandler = (error: any): Response => {
  console.error(error);

  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  return new Response(
    JSON.stringify({
      error: message,
      timestamp: new Date().toISOString(),
    }),
    {
      status: statusCode,
      headers: { "Content-Type": "application/json" },
    },
  );
};

export const rateLimitMiddleware = (
  maxRequests: number = 1000,
  windowMs: number = 60000,
) => {
  const store: Record<string, number[]> = {};

  return (request: Request) => {
    const ip = request.headers.get("cf-connecting-ip") || "unknown";
    const now = Date.now();

    if (!store[ip]) {
      store[ip] = [];
    }

    // Clean old entries
    store[ip] = store[ip].filter((timestamp) => now - timestamp < windowMs);

    if (store[ip].length >= maxRequests) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
        status: 429,
        headers: { "Content-Type": "application/json" },
      });
    }

    store[ip].push(now);
    return null;
  };
};

export const loggingMiddleware = (request: Request) => {
  console.log({
    method: request.method,
    url: request.url,
    timestamp: new Date().toISOString(),
    userAgent: request.headers.get("user-agent"),
  });
  return null;
};

export default {
  corsMiddleware,
  authMiddleware,
  errorHandler,
  rateLimitMiddleware,
  loggingMiddleware,
};
