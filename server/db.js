const mysql = require('mysql');
require('dotenv').config();

console.log('DB Config:', {  // Add this to verify your env variables
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD ? '*****' : 'empty',
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
  connectTimeout: 10000 // Add timeout
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err);
    process.exit(1); // Exit process with error
  }
  console.log('MySQL connected successfully');
});

// Handle connection errors after initial connect
connection.on('error', (err) => {
  console.error('MySQL connection error:', err);
});

module.exports = connection;