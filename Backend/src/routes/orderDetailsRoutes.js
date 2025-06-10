const express = require("express");
const {
    getOrderDetails,
    addOrderDetail,
    deleteOrderDetail,
} = require("../controllers/orderDetailsController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Obtener detalles de una orden específica (requiere autenticación)
router.get("/:orderId/details", authMiddleware, getOrderDetails);

// Agregar un nuevo detalle a una orden (requiere autenticación)
router.post("/:orderId/details", authMiddleware, addOrderDetail);

// Eliminar un detalle de orden específico (requiere autenticación)
router.delete("/:orderId/details/:detailId", authMiddleware, deleteOrderDetail);

module.exports = router;