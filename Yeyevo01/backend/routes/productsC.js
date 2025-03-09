const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'yeyevo'
});

// Ruta para obtener todos los productos
router.get('/productos', (req, res) => {
    const query = 'SELECT * FROM productos';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error obteniendo productos:', err);
            res.status(500).json({ error: 'Error obteniendo productos' });
        } else {
            res.json(results);
        }
    });
});

// Exportar el router
module.exports = router;
