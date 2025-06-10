const express = require('express');
const router = express.Router();
const reportesController = require('../controllers/reportesController');

// Endpoints de reportes en PDF
router.get('/productos', reportesController.reporteProductos);
router.get('/usuarios', reportesController.reporteUsuarios);
router.get('/ordenes', reportesController.reporteOrdenes);
router.get('/ingresos', reportesController.reporteIngresos);

module.exports = router;