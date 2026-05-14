import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

// Import routes
import authRoutes from "./routes/auth";
import newbornRoutes from "./routes/newborns";
import vaccinationRoutes from "./routes/vaccinations";
import growthRoutes from "./routes/growth";
import consultationRoutes from "./routes/consultations";
import prescriptionRoutes from "./routes/prescriptions";
import billingRoutes from "./routes/billing";
import smartcardRoutes from "./routes/smartcards";
import notificationRoutes from "./routes/notifications";
import analyticsRoutes from "./routes/analytics";

type Env = {
  Bindings: {
    DB: D1Database;
    RATE_LIMIT: KVNamespace;
    JWT_SECRET: string;
    JWT_REFRESH_SECRET: string;
    ENVIRONMENT: string;
    CORS_ORIGIN: string;
  };
};

const app = new Hono<Env>();

// Middleware
app.use("*", logger());
app.use("*", prettyJSON());

// CORS middleware
app.use(
  "*",
  cors({
    origin: (origin) => {
      const env = app.env;
      return origin === env.CORS_ORIGIN ? origin : "http://localhost:5173";
    },
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
    maxAge: 600,
  }),
);

// Custom middleware to inject DB and utilities
app.use("*", async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DB,
  }).$extends(withAccelerate());

  c.set("prisma", prisma);
  c.set("db", c.env.DB);
  c.set("kv", c.env.RATE_LIMIT);

  await next();
});

// Health check
app.get("/health", (c) => {
  return c.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: c.env.ENVIRONMENT,
  });
});

// API Routes
app.route("/api/auth", authRoutes);
app.route("/api/newborns", newbornRoutes);
app.route("/api/vaccinations", vaccinationRoutes);
app.route("/api/growth", growthRoutes);
app.route("/api/consultations", consultationRoutes);
app.route("/api/prescriptions", prescriptionRoutes);
app.route("/api/billing", billingRoutes);
app.route("/api/smartcards", smartcardRoutes);
app.route("/api/notifications", notificationRoutes);
app.route("/api/analytics", analyticsRoutes);

// 404 handler
app.notFound((c) => {
  return c.json(
    {
      status: "error",
      message: "Route not found",
      path: c.req.path,
    },
    404,
  );
});

// Error handler
app.onError((err, c) => {
  console.error("Error:", err);
  return c.json(
    {
      status: "error",
      message: err.message || "Internal server error",
      ...(c.env.ENVIRONMENT === "development" && { stack: err.stack }),
    },
    500,
  );
});

export default app;
