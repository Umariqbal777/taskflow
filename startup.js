require('dotenv').config();
const { execSync } = require('child_process');

async function main() {
  console.log('🔄 Running migration...');
  execSync('node src/db/migrate.js', { stdio: 'inherit' });

  console.log('🌱 Running seed...');
  execSync('node src/db/seed.js', { stdio: 'inherit' });

  console.log('🚀 Starting server...');
  require('./src/index.js');
}

main();
