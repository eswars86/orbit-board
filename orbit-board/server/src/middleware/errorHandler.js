'use strict';

/**
 * Global error-handling middleware.
 * Catches errors thrown in routes and returns a JSON 500 response.
 */
// eslint-disable-next-line no-unused-vars
module.exports = function errorHandler(err, req, res, next) {
  console.error(`✖ Error handling ${req.method} ${req.originalUrl}:`, err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
};
