const express = require('express');
const { createFullOrder, getOrdersByUser, getOrderById } = require('../controllers/orderController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

const router = express.Router();

// Crear orden completa
router.post('/create', authMiddleware, createFullOrder);

// Obtener órdenes del usuario autenticado
router.get('/', authMiddleware, getOrdersByUser);

// Obtener una orden por ID
router.get('/:id', authMiddleware, getOrderById);

module.exports = router;