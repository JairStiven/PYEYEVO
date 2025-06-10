const Payment = require('../models/Payment.js');
const Order = require('../models/Order.js');

const processPayment = async (req, res) => {
    try {
        const { order_id, metodo } = req.body;

        // Verificar si la orden existe y está pendiente
        const order = await Order.getById(order_id);
        if (!order) return res.status(404).json({ message: 'Orden no encontrada' });
        if (order.estado !== 'pendiente') return res.status(400).json({ message: 'La orden ya fue pagada o cancelada' });

        // Verificar si ya existe un pago para esta orden
        const existingPayment = await Payment.getByOrderId(order_id);
        if (existingPayment) {
            return res.status(400).json({ message: 'Ya se ha procesado un pago para esta orden' });
        }

        // Registrar el pago
        const paymentId = await Payment.create(order_id, metodo, 'aprobado');

        // Cambiar el estado de la orden a "pagada"
        await Order.updateStatus(order_id, 'pagada');

        res.status(200).json({ message: 'Pago procesado con éxito', paymentId });
    } catch (error) {
        console.error('Error al procesar el pago:', error);
        res.status(500).json({ message: 'Error al procesar el pago', error });
    }
};

module.exports = { processPayment };