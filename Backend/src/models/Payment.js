const pool = require('../config/db.js'); // Conexión a MySQL

const Payment = {
    // Crear un nuevo pago
    create: async (order_id, metodo, estado) => {
        const [result] = await pool.query(
            'INSERT INTO payments (order_id, metodo, estado, fecha) VALUES (?, ?, ?, NOW())',
            [order_id, metodo, estado]
        );
        return result.insertId;
    },

    // Obtener un pago por ID de la orden
    getByOrderId: async (order_id) => {
        const [rows] = await pool.query('SELECT * FROM payments WHERE order_id = ?', [order_id]);
        return rows[0];
    },

    // Obtener todos los pagos
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM payments');
        return rows;
    },

    // Actualizar el estado de un pago
    updateStatus: async (payment_id, estado) => {
        await pool.query('UPDATE payments SET estado = ? WHERE id = ?', [estado, payment_id]);
    },
};

module.exports = Payment;