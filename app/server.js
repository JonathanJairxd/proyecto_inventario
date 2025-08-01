// app/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

// app/server.js
const instancia = process.env.APP_ID || 'Instancia desconocida';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// -----------------------------
// RUTAS
// -----------------------------

// Login simple
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  db.query(
    'SELECT * FROM usuarios WHERE username = ? AND password = ?',
    [username, password],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Error del servidor' });
      if (results.length > 0) {
        res.json({ status: 'success' });
      } else {
        res.json({ status: 'error', message: 'Credenciales incorrectas' });
      }
    }
  );
});

// Agregar producto
app.post('/api/productos', (req, res) => {
  const { codigo, nombre, descripcion, unidad, categoria } = req.body;
  db.query(
    'SELECT * FROM productos WHERE codigo = ?',
    [codigo],
    (err, results) => {
      if (results.length > 0) {
        return res.json({ status: 'error', message: 'Código duplicado' });
      }

      db.query(
        'INSERT INTO productos (codigo, nombre, descripcion, unidad, categoria) VALUES (?, ?, ?, ?, ?)',
        [codigo, nombre, descripcion, unidad, categoria],
        (err) => {
          if (err) return res.status(500).json({ message: 'Error al guardar el producto', instancia });
          res.json({ status: 'success', message: 'Producto registrado', instancia});
        }
      );
    }
  );
});

// Mostrar productos
app.get('/api/productos', (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) return res.status(500).json({ message: 'Error' });
    res.json(results);
  });
});

// -----------------------------
app.listen(3000, () => {
  console.log('🌐 Servidor corriendo en http://localhost:3000');
});
