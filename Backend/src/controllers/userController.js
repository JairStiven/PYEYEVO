const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Asegura que las variables de entorno sean cargadas

// Registro general (usuario común o admin, según se reciba el rol)
const register = async (req, res) => {
    try {
        const { nombre, email, password, direccion, telefono, rol } = req.body;

        const existingUser = await User.findByEmail(email);
        if (existingUser) return res.status(400).json({ message: 'El email ya está registrado' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const userId = await User.create({ nombre, email, password: hashedPassword, direccion, telefono, rol });

        res.status(201).json({ message: 'Usuario registrado con éxito', userId });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario', error });
    }
};

// ✅ NUEVO: Registro de administrador (solo desde /admin/register)
const registerAdmin = async (req, res) => {
    try {
        const { nombre, email, password, direccion, telefono } = req.body;

        const existingUser = await User.findByEmail(email);
        if (existingUser) return res.status(400).json({ message: 'El email ya está registrado' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const userId = await User.create({
            nombre,
            email,
            password: hashedPassword,
            direccion,
            telefono,
            rol: 'admin' // 👈 se fuerza a "admin"
        });

        res.status(201).json({ message: 'Administrador registrado con éxito', userId });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar administrador', error });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByEmail(email);

        if (!user) return res.status(400).json({ message: 'Credenciales incorrectas' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Credenciales incorrectas' });

        const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token,
            user: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error en el inicio de sesión', error });
    }
};

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el perfil', error });
    }
};

const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { nombre, direccion, telefono } = req.body;

        const updated = await User.updateById(userId, { nombre, direccion, telefono });
        if (updated === 0) return res.status(404).json({ message: 'Usuario no encontrado' });

        const updatedUser = await User.findById(userId);
        res.status(200).json({ message: 'Perfil actualizado con éxito', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el perfil', error });
    }
};

module.exports = {
    register,
    registerAdmin, // ✅ exportado
    login,
    getProfile,
    updateProfile
};