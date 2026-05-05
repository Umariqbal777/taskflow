// src/db/index.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('error', (err) => {
  console.error('Unexpected DB error:', err.message);
});

// Helper: run a query and return rows
async function query(text, params) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[DB] ${duration}ms — ${text.slice(0, 80)}`);
  }
  return res;
}

// Helper: log activity
async function logActivity(userId, message, entityType = null, entityId = null) {
  try {
    await query(
      'INSERT INTO activity_log (user_id, message, entity_type, entity_id) VALUES ($1,$2,$3,$4)',
      [userId, message, entityType, entityId]
    );
  } catch (_) {}
}

module.exports = { pool, query, logActivity };
