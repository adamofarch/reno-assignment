const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'schooluser',
  password: process.env.DB_PASSWORD || 'schoolpass',
  database: process.env.DB_NAME || 'schools_db',
  port: process.env.DB_PORT || 3306,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
};

let connection;

async function getConnection() {
  if (!connection) {
    connection = await mysql.createConnection(dbConfig);
  }
  return connection;
}

async function initDatabase() {
  try {
    const conn = await getConnection();
    
    // Create schools table (database is already selected in connection)
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name TEXT NOT NULL,
        address TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        contact VARCHAR(15) NOT NULL,
        image TEXT,
        email_id VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('Database and table initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

module.exports = {
  getConnection,
  initDatabase
};
