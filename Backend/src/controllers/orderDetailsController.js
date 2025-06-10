const OrderDetails = require("../models/OrderDetails");
const Order = require("../models/Order");
const Product = require("../models/Product");

// Obtener detalles de una orden específica
const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;

    const details = await OrderDetails.findAll({
      where: { order_id: orderId },
      include: [{ model: Product, attributes: ["nombre", "precio", "imagen"] }],
    });

    if (!details.length) {
      return res.status(404).json({ message: "No se encontraron detalles para esta orden." });
    }

    res.json(details);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener detalles de la orden", error });
  }
};

// Agregar un producto a los detalles de una orden
const addOrderDetail = async (req, res) => {
  try {
    const { order_id, producto_id, cantidad, precio_unitario } = req.body;

    // Verificar si la orden existe
    const order = await Order.findByPk(order_id);
    if (!order) {
      return res.status(404).json({ message: "La orden no existe" });
    }

    // Verificar si el producto existe
    const product = await Product.findByPk(producto_id);
    if (!product) {
      return res.status(404).json({ message: "El producto no existe" });
    }

    // Crear el detalle de la orden
    const newDetail = await OrderDetails.create({
      order_id,
      producto_id,
      cantidad,
      precio_unitario,
    });

    res.status(201).json({ message: "Detalle de orden agregado con éxito", newDetail });
  } catch (error) {
    res.status(500).json({ message: "Error al agregar detalle de orden", error });
  }
};

// Eliminar un detalle de orden
const deleteOrderDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const detail = await OrderDetails.findByPk(id);
    if (!detail) {
      return res.status(404).json({ message: "Detalle de orden no encontrado" });
    }

    await detail.destroy();
    res.json({ message: "Detalle de orden eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar detalle de orden", error });
  }
};

module.exports = {
  getOrderDetails,
  addOrderDetail,
  deleteOrderDetail,
};