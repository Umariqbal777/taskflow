require('dotenv').config();
const { execSync } = require('child_process');

async function main() {
  try {
    console.log('🔄 Running migration...');
    execSync('node src/db/migrate.js', { stdio: 'inherit' });
    console.log('✅ Migration done');
  } catch (e) {
    console.error('Migration error:', e.message);
  }

  try {
    console.log('🌱 Running seed...');
    execSync('node src/db/seed.js', { stdio: 'inherit' });
    console.log('✅ Seed done');
  } catch (e) {
    // seed may fail if data already exists — that's ok
    console.log('Seed skipped (data may already exist)');
  }

  console.log('🚀 Starting server...');
  require('./src/index.js');
}

main();
