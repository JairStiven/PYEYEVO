const pool = require('../config/db.js');

class Product {
    // Crear un nuevo producto
    static async create({ nombre, descripcion, precio, stock, imagen, categoria_id }) {
        const [result] = await pool.query(
            'INSERT INTO products (nombre, descripcion, precio, stock, imagen, categoria_id) VALUES (?, ?, ?, ?, ?, ?)',
            [nombre, descripcion, precio, stock, imagen, categoria_id]
        );
        return result.insertId;
    }

    // Obtener todos los productos con el nombre de su categoría
    static async findAll() {
        const [rows] = await pool.query(`
            SELECT products.id, products.nombre, products.descripcion, products.precio, products.stock, 
                   products.imagen, products.categoria_id, categorias.nombre AS categoria
            FROM products
            JOIN categorias ON products.categoria_id = categorias.id
        `);
        return rows;
    }

    // Obtener un producto por ID con el nombre de su categoría
    static async findById(id) {
        const [rows] = await pool.query(`
            SELECT products.id, products.nombre, products.descripcion, products.precio, products.stock, 
                   products.imagen, products.categoria_id, categorias.nombre AS categoria
            FROM products
            JOIN categorias ON products.categoria_id = categorias.id
            WHERE products.id = ?
        `, [id]);
        return rows[0] || null;
    }

    // Actualizar un producto
    static async update(id, { nombre, descripcion, precio, stock, imagen, categoria_id }) {
        await pool.query(
            'UPDATE products SET nombre = ?, descripcion = ?, precio = ?, stock = ?, imagen = ?, categoria_id = ? WHERE id = ?',
            [nombre, descripcion, precio, stock, imagen, categoria_id, id]
        );
    }

    // Eliminar un producto
    static async delete(id) {
        await pool.query('DELETE FROM products WHERE id = ?', [id]);
    }
}

module.exports = Product;