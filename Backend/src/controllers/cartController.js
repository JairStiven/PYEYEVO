const db = require("../config/db");

// Agregar un producto al carrito
exports.addToCart = async (req, res) => {
    try {
        const { producto_id, cantidad } = req.body;

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Usuario no autenticado" });
        }

        const usuario_id = req.user.id;

        if (!producto_id || cantidad <= 0) {
            return res.status(400).json({ message: "Datos inválidos" });
        }

        // Verificar si el producto existe
        const [product] = await db.query("SELECT * FROM products WHERE id = ?", [producto_id]);
        if (product.length === 0) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        // Verificar si ya está en el carrito
        const [existingItem] = await db.query(
            "SELECT * FROM cart WHERE usuario_id = ? AND producto_id = ?",
            [usuario_id, producto_id]
        );

        if (existingItem.length > 0) {
            // Actualizar cantidad
            await db.query(
                "UPDATE cart SET cantidad = cantidad + ? WHERE usuario_id = ? AND producto_id = ?",
                [cantidad, usuario_id, producto_id]
            );
        } else {
            // Insertar nuevo
            await db.query(
                "INSERT INTO cart (usuario_id, producto_id, cantidad, fecha) VALUES (?, ?, ?, NOW())",
                [usuario_id, producto_id, cantidad]
            );
        }

        res.status(200).json({ message: "Producto agregado al carrito" });
    } catch (error) {
        console.error("Error en addToCart:", error);
        res.status(500).json({ message: "Error al agregar al carrito", error: error.message });
    }
};

// Obtener productos en el carrito (con producto_id incluido)
exports.getCart = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Usuario no autenticado" });
        }

        const usuario_id = req.user.id;

        const [cartItems] = await db.query(
            `SELECT 
                c.id, 
                c.producto_id, 
                p.nombre, 
                p.precio, 
                c.cantidad, 
                p.imagen 
             FROM cart c 
             JOIN products p ON c.producto_id = p.id 
             WHERE c.usuario_id = ?`,
            [usuario_id]
        );

        res.status(200).json(cartItems);
    } catch (error) {
        console.error("Error en getCart:", error);
        res.status(500).json({ message: "Error al obtener el carrito", error: error.message });
    }
};

// Eliminar un producto del carrito
exports.removeFromCart = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Usuario no autenticado" });
        }

        const usuario_id = req.user.id;
        const { id } = req.params;

        const [result] = await db.query(
            "DELETE FROM cart WHERE id = ? AND usuario_id = ?",
            [id, usuario_id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Producto no encontrado en el carrito" });
        }

        res.status(200).json({ message: "Producto eliminado del carrito" });
    } catch (error) {
        console.error("Error en removeFromCart:", error);
        res.status(500).json({ message: "Error al eliminar producto", error: error.message });
    }
};

// Vaciar el carrito completo
exports.clearCart = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Usuario no autenticado" });
        }

        const usuario_id = req.user.id;

        const [result] = await db.query(
            "DELETE FROM cart WHERE usuario_id = ?",
            [usuario_id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "El carrito ya estaba vacío" });
        }

        res.status(200).json({ message: "Carrito vaciado correctamente" });
    } catch (error) {
        console.error("Error en clearCart:", error);
        res.status(500).json({ message: "Error al vaciar el carrito", error: error.message });
    }
};