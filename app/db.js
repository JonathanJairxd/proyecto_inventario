// app/db.js 
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'mysql-master',
  user: 'root',
  password: 'root',       // <-- cambia si tu MySQL tiene contraseña
  database: 'inventario'
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar a la base de datos:', err);
  } else {
    console.log('✅ Conexión a la base de datos establecida');
  }
});

module.exports = connection;
