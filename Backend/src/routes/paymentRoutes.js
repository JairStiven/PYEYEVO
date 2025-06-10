const express = require('express');
const { processPayment } = require('../controllers/paymentController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

const router = express.Router();

// Ruta para procesar un pago
router.post('/', authMiddleware, async (req, res, next) => {
    try {
        console.log('📢 Procesando pago...');
        await processPayment(req, res);  // Procesamos el pago
    } catch (error) {
        // Error de procesamiento del pago
        console.error('❌ Error al procesar el pago:', error.message);  // Más detalles en el log
        next(error);  // Pasa el error al siguiente middleware de manejo de errores
    }
});

module.exports = router;