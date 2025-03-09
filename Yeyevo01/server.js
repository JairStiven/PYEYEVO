// server.js
const express = require('express'); 
const mysql2 = require('mysql2');  
const cors = require('cors');
const app = express();


const db = mysql2.createConnection({
  host: 'localhost',
  user: 'root',       
  password: '',       
  database: 'yeyevo'  
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos');
});

app.use(cors());
app.use(express.json());

// Endpoint para obtener empleados
app.get('/api/empleados', (req, res) => {
  db.query('SELECT nombres, apellidos FROM empleado', (err, results) => {
    if (err) {
      return res.status(500).send('Error al obtener empleados');
    }
    res.json(results);
  });
});

// Endpoint para obtener usuarios
app.get('/api/usuarios', (req, res) => {
  db.query('SELECT nombres, apellidos FROM cliente', (err, results) => {
    if (err) {
      return res.status(500).send('Error al obtener usuarios');
    }
    res.json(results);
  });
});

// Endpoint para obtener facturas
app.get('/api/facturas', (req, res) => {
  db.query('SELECT * FROM factura', (err, results) => {
    if (err) {
      return res.status(500).send('Error al obtener facturas');
    }
    res.json(results);
  });
});

// Endpoint para obtener pedidos
app.get('/api/pedidos', (req, res) => {
  db.query('SELECT * FROM Detalle_factura', (err, results) => {
    if (err) {
      return res.status(500).send('Error al obtener pedidos');
    }
    res.json(results);
  });
});

// Puerto de escucha
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});


