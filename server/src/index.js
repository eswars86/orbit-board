'use strict';

const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');

const { checkEnv } = require('../../scripts/check-env');
const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');
const boardsRouter = require('./routes/boards');

// ---------------------------------------------------------------------------
// 1. Verify configuration BEFORE doing anything else.
//    Throws: "Missing config: did you run `cp .env.example .env`?"
// ---------------------------------------------------------------------------
try {
  checkEnv();
} catch (err) {
  console.error(`\n✖ ${err.message}\n`);
  process.exit(1);
}

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

// API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'orbit-board' });
});
app.use('/api', boardsRouter);

// ---------------------------------------------------------------------------
// 2. Serve the built client (client/dist) so the board loads at "/".
//    If the client hasn't been built yet, show a helpful message.
// ---------------------------------------------------------------------------
const clientDist = path.resolve(__dirname, '..', '..', 'client', 'dist');

if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(clientDist, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res
      .status(200)
      .send(
        '<h1>🛰️ OrbitBoard API is running</h1>' +
          '<p>The client build was not found. Run <code>npm run dev</code> ' +
          '(which builds the client) or <code>npm run build:client</code>.</p>' +
          '<p>API health: <a href="/api/health">/api/health</a></p>'
      );
  });
}

// Global error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`\n✓ server ready · OrbitBoard API on http://localhost:${PORT}`);
  console.log(`➜  Local:   http://localhost:${PORT}\n`);
});

module.exports = app;
