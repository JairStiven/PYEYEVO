const pool = require('../config/db.js');

class User {
    static async create({ nombre, email, password, direccion, telefono, rol }) {
        const [result] = await pool.query(
            'INSERT INTO users (nombre, email, password, direccion, telefono, rol, fecha_registro) VALUES (?, ?, ?, ?, ?, ?, NOW())',
            [nombre, email, password, direccion, telefono, rol]
        );
        return result.insertId;
    }

    static async findByEmail(email) {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async findById(id) {
        const [rows] = await pool.query(
            'SELECT id, nombre, email, direccion, telefono, rol, fecha_registro FROM users WHERE id = ?',
            [id]
        );
        return rows[0];
    }

    // ✅ Método para actualizar datos del perfil
    static async updateById(id, { nombre, direccion, telefono }) {
        const [result] = await pool.query(
            'UPDATE users SET nombre = ?, direccion = ?, telefono = ? WHERE id = ?',
            [nombre, direccion, telefono, id]
        );
        return result.affectedRows;
    }

    // ✅ Método para obtener todos los usuarios (uso admin)
    static async getAll() {
        const [rows] = await pool.query(
            'SELECT id, nombre, email, rol, fecha_registro FROM users'
        );
        return rows;
    }
}

module.exports = User;