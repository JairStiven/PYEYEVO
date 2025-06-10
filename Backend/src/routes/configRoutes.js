const express = require("express");
const {
    getFondoLogin,
    getFondoProductos
} = require('../controllers/configController.js');

const router = express.Router();

// Ruta para obtener la imagen de fondo del login
router.get("/fondo_login", getFondoLogin);

// Ruta para obtener la imagen de fondo de productos
router.get("/fondo_productos", getFondoProductos);

module.exports = router;