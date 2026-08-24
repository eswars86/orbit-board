#!/usr/bin/env node
/**
 * check-env.js
 * Verifies that the required environment variables exist.
 * Used by the server on startup and available as `npm run check-env`.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const REQUIRED_VARS = ['PORT', 'API_URL', 'DATA_FILE'];

/**
 * Ensures a .env file exists and required vars are set.
 * Throws a friendly error if config is missing.
 */
function checkEnv({ exitOnError = false } = {}) {
  const envPath = path.resolve(__dirname, '..', '.env');

  // Load .env if present (dotenv is a root dependency)
  if (fs.existsSync(envPath)) {
    require('dotenv').config({ path: envPath });
  }

  const hasEnvFile = fs.existsSync(envPath);
  const missing = REQUIRED_VARS.filter((key) => !process.env[key]);

  if (!hasEnvFile || missing.length > 0) {
    const message = 'Missing config: did you run `cp .env.example .env`?';
    if (exitOnError) {
      console.error(`\n✖ ${message}`);
      if (missing.length > 0) {
        console.error(`  Missing variables: ${missing.join(', ')}`);
      }
      process.exit(1);
    }
    throw new Error(message);
  }

  return true;
}

// Allow running directly: `node scripts/check-env.js`
if (require.main === module) {
  checkEnv({ exitOnError: true });
  console.log('✓ Environment looks good — all required vars are set.');
}

module.exports = { checkEnv, REQUIRED_VARS };
