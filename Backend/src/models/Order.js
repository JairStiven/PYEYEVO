const pool = require('../config/db.js');

class Order {
    // Crear una nueva orden
    static async create({ usuario_id, total, estado }) {
        const [result] = await pool.query(
            'INSERT INTO orders (usuario_id, total, estado, fecha) VALUES (?, ?, ?, NOW())',
            [usuario_id, total, estado]
        );
        return result.insertId;
    }

    // Obtener una orden por su ID
    static async getById(id) {
        const [rows] = await pool.query('SELECT * FROM orders WHERE id = ?', [id]);
        return rows[0]; // Retorna solo la primera fila (única orden)
    }

    // Obtener todas las órdenes de un usuario
    static async findByUser(usuario_id) {
        const [rows] = await pool.query('SELECT * FROM orders WHERE usuario_id = ?', [usuario_id]);
        return rows;
    }

    // Actualizar el estado de una orden
    static async updateStatus(id, estado) {
        const [result] = await pool.query('UPDATE orders SET estado = ? WHERE id = ?', [estado, id]);
        
        // Verificar si la orden fue actualizada
        if (result.affectedRows === 0) {
            throw new Error('La orden no existe o no se pudo actualizar.');
        }
    }
}

module.exports = Order;