#!/usr/bin/env node
// startup.js — Run DB migration then start the server
// Used in Railway's startCommand so you never have to remember
// to run migrate separately after a fresh deploy.

require('dotenv').config();
const { execSync } = require('child_process');

async function main() {
  console.log('🔄  Running database migration...');
  try {
    execSync('node src/db/migrate.js', { stdio: 'inherit' });
  } catch (err) {
    console.error('❌  Migration failed — aborting startup.');
    process.exit(1);
  }

  console.log('🚀  Starting server...');
  require('./src/index.js');
}

main();
