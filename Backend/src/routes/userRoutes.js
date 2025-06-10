const express = require('express');
const {
    register,
    login,
    getProfile,
    updateProfile,
    registerAdmin
} = require('../controllers/userController.js');

const authMiddleware = require('../middlewares/authMiddleware.js');
const requireAdmin = require('../middlewares/requireAdmin.js');
const User = require('../models/User.js'); 

const router = express.Router();

// Registro e inicio de sesión
router.post('/register', register);
router.post('/login', login);

// Perfil (requiere estar autenticado)
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);

// ✅ Solo el admin puede registrar otro admin
router.post('/register-admin', authMiddleware, requireAdmin, registerAdmin);

// ✅ Solo el admin puede ver todos los usuarios
router.get('/', authMiddleware, requireAdmin, async (req, res) => {
    try {
        const users = await User.getAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error });
    }
});

module.exports = router;