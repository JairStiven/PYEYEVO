const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const dotenv = require('dotenv');

dotenv.config();

// Registrar usuario
const register = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // Verificar si el correo ya está registrado
        const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'El correo ya está en uso' });
        }

        // Encriptar contraseña antes de guardar
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            'INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)',
            [nombre, email, hashedPassword]
        );

        res.status(201).json({ message: 'Registro exitoso', userId: result.insertId });
    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({ message: 'Error en el registro', error: error.message });
    }
};

// Inicio de sesión con generación de token
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        const user = users[0];

        // Comparar contraseña con la almacenada en la BD
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // 🔥 AHORA el token incluye el rol también
        const token = jwt.sign(
            { id: user.id, email: user.email, rol: user.rol },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        // ✅ Responder incluyendo el rol
        res.json({
            message: 'Inicio de sesión exitoso',
            token,
            user: {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol
            }
        });
    } catch (error) {
        console.error('Error en inicio de sesión:', error);
        res.status(500).json({ message: 'Error en el inicio de sesión', error: error.message });
    }
};

// Obtener perfil del usuario autenticado
const getProfile = async (req, res) => {
    try {
        const userId = req.user.id; // `req.user` viene del `authMiddleware`

        // Obtener datos del usuario desde la base de datos
        const [users] = await pool.query('SELECT id, nombre, email, rol FROM users WHERE id = ?', [userId]);

        if (users.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(users[0]); // Enviar datos del usuario
    } catch (error) {
        console.error('Error al obtener el perfil:', error);
        res.status(500).json({ message: 'Error al obtener el perfil', error: error.message });
    }
};

module.exports = { register, login, getProfile };