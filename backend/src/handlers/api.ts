// backend/src/handlers/api.ts
// Main API Router for Cloudflare Workers

import { Router } from "itty-router";
import { Cache } from "../services/cache-service";
import { AuditService } from "../services/audit-service";
import { NotificationService } from "../services/notification-service";
import PatientService from "../services/patient-service";
import { authMiddleware, errorHandler, corsMiddleware } from "../middleware";

export function createApiRouter(env: any) {
  const router = Router();

  // Services
  const cache = new Cache(env.KV_NAMESPACE);
  const auditService = new AuditService(env.DB);
  const notificationService = new NotificationService(env.DB, {
    sendgridKey: env.SENDGRID_API_KEY,
    twilioSid: env.TWILIO_SID,
    twilioToken: env.TWILIO_TOKEN,
  });
  const patientService = new PatientService(
    env.DB,
    cache,
    auditService,
    notificationService,
  );

  // Middleware
  router.all("*", corsMiddleware);
  router.all("/api/*", authMiddleware);

  // Health check
  router.get(
    "/health",
    () =>
      new Response(JSON.stringify({ status: "ok" }), {
        headers: { "Content-Type": "application/json" },
      }),
  );

  // ============ PATIENTS ============
  router.post("/api/patients", async (req) => {
    try {
      const data = await req.json();
      const user = (req as any).user;
      const patient = await patientService.createPatient(data, user.id);
      return new Response(JSON.stringify(patient), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return errorHandler(error);
    }
  });

  router.get("/api/patients", async (req) => {
    try {
      const user = (req as any).user;
      const patients = await patientService.listPatients(user.id);
      return new Response(JSON.stringify(patients), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return errorHandler(error);
    }
  });

  router.get("/api/patients/:id", async (req) => {
    try {
      const user = (req as any).user;
      const patient = await patientService.getPatient(req.params.id, user.id);
      if (!patient) {
        return new Response(JSON.stringify({ error: "Patient not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify(patient), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return errorHandler(error);
    }
  });

  router.put("/api/patients/:id", async (req) => {
    try {
      const data = await req.json();
      const user = (req as any).user;
      const patient = await patientService.updatePatient(
        req.params.id,
        data,
        user.id,
      );
      return new Response(JSON.stringify(patient), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return errorHandler(error);
    }
  });

  router.delete("/api/patients/:id", async (req) => {
    try {
      const user = (req as any).user;
      await patientService.deletePatient(req.params.id, user.id);
      return new Response(JSON.stringify({ message: "Patient deleted" }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return errorHandler(error);
    }
  });

  router.get("/api/patients/search/:query", async (req) => {
    try {
      const limit = parseInt(req.query.limit as string) || 20;
      const patients = await patientService.searchPatients(
        req.params.query,
        limit,
      );
      return new Response(JSON.stringify(patients), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return errorHandler(error);
    }
  });

  // ============ NOTIFICATIONS ============
  router.get("/api/notifications", async (req) => {
    try {
      const user = (req as any).user;
      const unreadOnly = req.query.unread === "true";
      const notifications = await notificationService.getNotifications(
        user.id,
        unreadOnly,
      );
      return new Response(JSON.stringify(notifications), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return errorHandler(error);
    }
  });

  router.post("/api/notifications/:id/read", async (req) => {
    try {
      await notificationService.markAsRead(req.params.id);
      return new Response(JSON.stringify({ message: "Marked as read" }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return errorHandler(error);
    }
  });

  router.post("/api/notifications/read-all", async (req) => {
    try {
      const user = (req as any).user;
      await notificationService.markAllAsRead(user.id);
      return new Response(JSON.stringify({ message: "All marked as read" }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return errorHandler(error);
    }
  });

  // ============ AUDIT LOGS ============
  router.get("/api/audit-logs", async (req) => {
    try {
      const resourceType = req.query.resourceType as string;
      const resourceId = req.query.resourceId as string;
      const limit = parseInt(req.query.limit as string) || 100;
      const logs = await auditService.getLogs(resourceType, resourceId, limit);
      return new Response(JSON.stringify(logs), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return errorHandler(error);
    }
  });

  // 404 handler
  router.all(
    "*",
    () =>
      new Response(JSON.stringify({ error: "Not Found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      }),
  );

  return router;
}

export default createApiRouter;
