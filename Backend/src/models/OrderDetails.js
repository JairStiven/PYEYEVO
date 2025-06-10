const pool = require("../config/db.js");

class OrderDetails {
    static async create({ order_id, producto_id, cantidad, precio_unitario }) {
        const [result] = await pool.query(
            "INSERT INTO order_details (order_id, producto_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)",
            [order_id, producto_id, cantidad, precio_unitario]
        );
        return result.insertId;
    }

    static async findByOrder(order_id) {
        const [rows] = await pool.query(
            "SELECT * FROM order_details WHERE order_id = ?",
            [order_id]
        );
        return rows;
    }

    static async deleteByOrder(order_id) {
        await pool.query("DELETE FROM order_details WHERE order_id = ?", [order_id]);
    }
}

module.exports = OrderDetails;