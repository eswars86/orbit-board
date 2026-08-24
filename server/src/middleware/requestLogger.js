'use strict';

/**
 * Tiny request logger middleware.
 * Logs method, path, status, and duration for every request.
 */
module.exports = function requestLogger(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const ms = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} → ${res.statusCode} (${ms}ms)`);
  });
  next();
};
