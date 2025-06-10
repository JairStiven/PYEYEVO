const pool = require('../config/db'); // Asegúrate que la ruta sea correcta

const getStats = async (req, res) => {
  try {
    const [usuarios] = await pool.query('SELECT COUNT(*) as total FROM users');
    const [productos] = await pool.query('SELECT COUNT(*) as total FROM products');
    const [ordenes] = await pool.query('SELECT COUNT(*) as total FROM orders');
    const [ventas] = await pool.query('SELECT SUM(total) as total FROM orders');

    res.json({
      totalUsuarios: usuarios[0].total,
      totalProductos: productos[0].total,
      totalOrdenes: ordenes[0].total,
      totalVentas: ventas[0].total || 0
    });
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
};

module.exports = { getStats };