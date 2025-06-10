const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Ruta de estadísticas del administrador
router.get('/stats', adminController.getStats);

module.exports = router;