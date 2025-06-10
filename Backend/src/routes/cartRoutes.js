const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authMiddleware = require("../middlewares/authMiddleware");

// Aplicar autenticación a todas las rutas
router.use(authMiddleware);

// Rutas del carrito
router.post("/", cartController.addToCart);
router.get("/", cartController.getCart);
router.delete("/:id", cartController.removeFromCart);
router.delete("/", cartController.clearCart);

module.exports = router;