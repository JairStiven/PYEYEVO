const express = require('express');
const router = express.Router();

// Definir las rutas de productos, recibiendo la conexión a la base de datos como parámetro
module.exports = (connection) => {
    // Obtener productos
    router.get('/', (req, res) => {
        connection.query('SELECT * FROM productos', (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener productos' });
            }
            res.json(results); // Devuelve todos los productos
        });
    });
 
    // Agregar un nuevo producto
    router.post('/', (req, res) => {
        const { nombre, descripcion, precio, stock, imagen_url } = req.body;

        if (!nombre || !descripcion || !precio || !stock || !imagen_url) {
            return res.status(400).json({ error: 'Todos los campos son necesarios' });
        }

        connection.query(
            'INSERT INTO productos (nombre, descripcion, precio, stock, imagen_url) VALUES (?, ?, ?, ?, ?)',
            [nombre, descripcion, precio, stock, imagen_url],
            (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al agregar producto' });
                }
                res.status(201).json({ id: result.insertId, nombre, descripcion, precio, stock, imagen_url });
            }
        );
    });

    // Actualizar producto
    router.put('/:id', (req, res) => {
        const { id } = req.params;
        const { nombre, descripcion, precio, stock, imagen_url } = req.body;

        if (!nombre || !descripcion || !precio || !stock || !imagen_url) {
            return res.status(400).json({ error: 'Todos los campos son necesarios' });
        }

        connection.query(
            'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, imagen_url = ? WHERE id = ?',
            [nombre, descripcion, precio, stock, imagen_url, id],
            (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al actualizar producto' });
                }
                if (result.affectedRows === 0) {
                    return res.status(404).json({ error: 'Producto no encontrado' });
                }
                res.json({ message: 'Producto actualizado' });
            }
        );
    });

    // Eliminar producto
    router.delete('/:id', (req, res) => {
        const { id } = req.params;

        connection.query(
            'DELETE FROM productos WHERE id = ?',
            [id],
            (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al eliminar producto' });
                }
                if (result.affectedRows === 0) {
                    return res.status(404).json({ error: 'Producto no encontrado' });
                }
                res.json({ message: 'Producto eliminado' });
            }
        );
    });

    return router;
};
