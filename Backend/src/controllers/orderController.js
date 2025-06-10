const pool = require('../config/db.js'); // Conexión a MySQL

// Función para obtener el siguiente número de factura usando la conexión activa
const getNextInvoiceNumber = async (connection) => {
    const [rows] = await connection.query("SELECT factura_numero FROM orders ORDER BY id DESC LIMIT 1");
    if (rows.length === 0 || !rows[0].factura_numero) return "001";
    const last = parseInt(rows[0].factura_numero);
    const next = (last + 1).toString().padStart(3, "0");
    return next;
};

// Crear una orden completa (orden + detalles + pago)
const createFullOrder = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const { cart, metodoPago = 'WhatsApp' } = req.body;
        const usuario_id = req.user.id; // Obtenido del token (authMiddleware)

        if (!cart || cart.length === 0) {
            return res.status(400).json({ message: "El carrito está vacío" });
        }

        await connection.beginTransaction();

        // Generar número de factura dentro de la transacción
        const factura_numero = await getNextInvoiceNumber(connection);
        const total = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

        // Insertar la orden
        const [orderResult] = await connection.query(
            "INSERT INTO orders (usuario_id, total, estado, fecha, factura_numero) VALUES (?, ?, 'pendiente', NOW(), ?)",
            [usuario_id, total, factura_numero]
        );
        const orderId = orderResult.insertId;

        // Insertar detalles de la orden
        for (const item of cart) {
            // Usar el campo 'producto_id' en lugar de 'id'
            const [producto] = await connection.query("SELECT id FROM products WHERE id = ?", [item.producto_id]);
            if (producto.length === 0) {
                // Si el producto no existe, se detiene la transacción y se informa el error.
                throw new Error(`Producto con ID ${item.producto_id} no existe.`);
            }
            await connection.query(
                "INSERT INTO order_details (order_id, producto_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)",
                [orderId, item.producto_id, item.cantidad, item.precio]
            );
        }

        // Insertar el registro de pago
        await connection.query(
            "INSERT INTO payments (order_id, metodo, estado, fecha) VALUES (?, ?, 'pendiente', NOW())",
            [orderId, metodoPago]
        );

        await connection.commit();
        res.status(201).json({ message: "Orden creada con éxito", factura_numero, total, orderId });
    } catch (error) {
        await connection.rollback();
        console.error("Error al crear orden completa:", error.message);
        res.status(500).json({ message: "Error al crear la orden", error: error.message });
    } finally {
        connection.release();
    }
};

// Obtener todas las órdenes del usuario (usando el token)
const getOrdersByUser = async (req, res) => {
    try {
        const usuario_id = req.user.id;
        const [orders] = await pool.query("SELECT * FROM orders WHERE usuario_id = ?", [usuario_id]);
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error al obtener órdenes:", error);
        res.status(500).json({ message: "Error al obtener órdenes" });
    }
};

// Obtener una orden por su ID
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const [order] = await pool.query("SELECT * FROM orders WHERE id = ?", [id]);
        if (order.length === 0) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }
        res.status(200).json(order[0]);
    } catch (error) {
        console.error("Error al obtener la orden:", error);
        res.status(500).json({ message: "Error al obtener la orden" });
    }
};

module.exports = {
    createFullOrder,
    getOrdersByUser,
    getOrderById
};