const pool = require('../config/db');

const Category = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM categorias');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM categorias WHERE id = ?', [id]);
        return rows.length > 0 ? rows[0] : null;
    },

    create: async (nombre, imagen) => {
        const [result] = await pool.query('INSERT INTO categorias (nombre, imagen) VALUES (?, ?)', [nombre, imagen]);
        return { id: result.insertId, nombre, imagen };
    },

    update: async (id, nombre, imagen) => {
        await pool.query('UPDATE categorias SET nombre = ?, imagen = ? WHERE id = ?', [nombre, imagen, id]);
        return { id, nombre, imagen };
    },

    delete: async (id) => {
        await pool.query('DELETE FROM categorias WHERE id = ?', [id]);
    }
};

module.exports = Category;