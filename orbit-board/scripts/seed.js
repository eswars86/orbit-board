#!/usr/bin/env node
/**
 * seed.js
 * Seeds sample boards & cards into the JSON data file (DATA_FILE).
 * Run with:  npm run seed
 */
'use strict';

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// Load env if available (non-fatal — we fall back to a sensible default)
const envPath = path.join(rootDir, '.env');
if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath });
}

const DATA_FILE = process.env.DATA_FILE || './server/data/board.json';
const SAMPLE_FILE = path.join(rootDir, 'server', 'data', 'board.sample.json');

function seed() {
  const target = path.resolve(rootDir, DATA_FILE);
  const targetDir = path.dirname(target);

  if (!fs.existsSync(SAMPLE_FILE)) {
    console.error(`✖ Sample data not found at ${SAMPLE_FILE}`);
    process.exit(1);
  }

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const sample = fs.readFileSync(SAMPLE_FILE, 'utf-8');
  fs.writeFileSync(target, sample, 'utf-8');

  console.log(`✓ Seeded sample boards & cards → ${DATA_FILE}`);
  console.log('  Run `npm run dev` and open http://localhost:3000 to see them.');
}

seed();
