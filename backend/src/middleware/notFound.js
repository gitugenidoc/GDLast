// backend/src/middleware/notFound.js - 404 handler

export const notFound = (req, res) => {
  res.status(404).json({
    error: {
      status: 404,
      message: `Route ${req.originalUrl} not found`,
    },
  });
};

export default notFound;
