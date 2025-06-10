const express = require('express');
const { register, login, getProfile } = require('../controllers/authController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile); // Nueva ruta protegida

module.exports = router;