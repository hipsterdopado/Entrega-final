// backend/db.js
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0308', 
  database: 'centro_deportivo'
});
connection.connect(err => {
  if (err) throw err;
  console.log('Base de datos conectada.');
});
module.exports = connection.promise();
