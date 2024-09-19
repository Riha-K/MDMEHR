// mysql.js
const mysql = require('mysql2/promise');

const mysqlConnection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Qweriha@123$',
  database: 'ehr',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = mysqlConnection;