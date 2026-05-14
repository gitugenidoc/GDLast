// backend/src/server.js - Main server entry point

import app from "./app.js";
import { logger } from "./utils/logger.js";

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

const server = app.listen(PORT, HOST, () => {
  logger.info(`🚀 Server running at http://${HOST}:${PORT}`);
  logger.info(`📝 Environment: ${process.env.NODE_ENV || "development"}`);
  logger.info(
    `🗄️  Database: ${process.env.DATABASE_URL?.split("@")[1] || "connecting..."}`,
  );
});

// Graceful shutdown
process.on("SIGTERM", () => {
  logger.info("SIGTERM received, shutting down gracefully");
  server.close(() => {
    logger.info("Server closed");
    process.exit(0);
  });
});

export default server;
