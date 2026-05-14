// backend/src/middleware/errorHandler.js - Global error handler

import { logger } from "../utils/logger.js";

export const errorHandler = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Log error
  if (status >= 500) {
    logger.error(err);
  } else {
    logger.warn({ status, message });
  }

  // Send response
  res.status(status).json({
    error: {
      status,
      message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  });
};

export default errorHandler;
