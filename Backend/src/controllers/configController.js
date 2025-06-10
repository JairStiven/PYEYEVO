const pool = require('../config/db.js'); // Usamos la conexión creada con mysql2

// Obtener la URL de la imagen de fondo del login desde la base de datos
const getFondoLogin = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT valor FROM configuraciones WHERE clave = ?',
            ['fondo_login']
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: '❌ No se encontró la configuración de fondo para login' });
        }

        res.status(200).json({ url: rows[0].valor });
    } catch (error) {
        console.error('⛔ ERROR en getFondoLogin:', error);
        res.status(500).json({
            message: 'Error al obtener la URL de la imagen de fondo de login',
            error: error.message
        });
    }
};

// Obtener la URL de la imagen de fondo de productos desde la base de datos
const getFondoProductos = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT valor FROM configuraciones WHERE clave = ?',
            ['fondo_productos']
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: '❌ No se encontró la configuración de fondo para productos' });
        }

        res.status(200).json({ url: rows[0].valor });
    } catch (error) {
        console.error('⛔ ERROR en getFondoProductos:', error);
        res.status(500).json({
            message: 'Error al obtener la URL de la imagen de fondo de productos',
            error: error.message
        });
    }
};

module.exports = {
    getFondoLogin,
    getFondoProductos
};