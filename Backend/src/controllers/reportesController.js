const pool = require('../config/db');
const puppeteer = require('puppeteer');

// Función auxiliar para generar PDF desde HTML
const generarPDF = async (htmlContent, nombreArchivo, res) => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
     
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: false,
      margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' },
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${nombreArchivo}.pdf"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    res.status(200).send(pdfBuffer);
    
  } catch (err) {
    console.error('Error generando el PDF:', err);
    res.status(500).send('Error interno al generar el PDF');
  } finally {
    if (browser) await browser.close();
  }
};

// --------------------- Reporte de Productos ---------------------
const reporteProductos = async (req, res) => {
  try {
    const [productos] = await pool.query('SELECT * FROM products');

    const html = `<!DOCTYPE html><html><head>
      <meta charset="UTF-8"><title>Reporte de Productos</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 30px; }
        h1 { color: #b30000; text-align: center; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 10px; }
        th { background-color: #f2f2f2; }
      </style></head><body>
      <h1>Reporte de Productos</h1>
      <table>
        <thead><tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Stock</th></tr></thead>
        <tbody>
        ${productos.map(p => `
          <tr>
            <td>${p.id}</td>
            <td>${p.nombre}</td>
            <td>$${p.precio}</td>
            <td>${p.stock}</td>
          </tr>
        `).join('')}
        </tbody>
      </table>
    </body></html>`;

    await generarPDF(html, 'reporte_productos', res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generando el reporte de productos');
  }
};

// --------------------- Reporte de Usuarios ---------------------
const reporteUsuarios = async (req, res) => {
  try {
    const [usuarios] = await pool.query('SELECT id, nombre, email, rol, fecha_registro FROM users');

    const html = `<!DOCTYPE html><html><head>
      <meta charset="UTF-8"><title>Reporte de Usuarios</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 30px; }
        h1 { color: #b30000; text-align: center; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 10px; }
        th { background-color: #f2f2f2; }
      </style></head><body>
      <h1>Reporte de Usuarios</h1>
      <table>
        <thead><tr><th>ID</th><th>Nombre</th><th>Email</th><th>Rol</th><th>Registro</th></tr></thead>
        <tbody>
        ${usuarios.map(u => `
          <tr>
            <td>${u.id}</td>
            <td>${u.nombre}</td>
            <td>${u.email}</td>
            <td>${u.rol}</td>
            <td>${new Date(u.fecha_registro).toLocaleDateString()}</td>
          </tr>
        `).join('')}
        </tbody>
      </table>
    </body></html>`;

    await generarPDF(html, 'reporte_usuarios', res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generando el reporte de usuarios');
  }
};

// --------------------- Reporte de Órdenes ---------------------
const reporteOrdenes = async (req, res) => {
  try {
    const [ordenes] = await pool.query(`
      SELECT o.id, u.nombre AS usuario, o.total, o.estado, o.fecha
      FROM orders o
      JOIN users u ON o.usuario_id = u.id
    `);

    const html = `<!DOCTYPE html><html><head>
      <meta charset="UTF-8"><title>Reporte de Órdenes</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 30px; }
        h1 { color: #b30000; text-align: center; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 10px; }
        th { background-color: #f2f2f2; }
      </style></head><body>
      <h1>Reporte de Órdenes</h1>
      <table>
        <thead><tr><th>ID</th><th>Usuario</th><th>Total</th><th>Estado</th><th>Fecha</th></tr></thead>
        <tbody>
        ${ordenes.map(o => `
          <tr>
            <td>${o.id}</td>
            <td>${o.usuario}</td>
            <td>$${o.total}</td>
            <td>${o.estado}</td>
            <td>${new Date(o.fecha).toLocaleDateString()}</td>
          </tr>
        `).join('')}
        </tbody>
      </table>
    </body></html>`;

    await generarPDF(html, 'reporte_ordenes', res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generando el reporte de órdenes');
  }
};

// --------------------- Reporte de Ingresos ---------------------
const reporteIngresos = async (req, res) => {
  try {
    const [ingresos] = await pool.query(`
      SELECT 
        DATE(o.fecha) AS fecha,
        SUM(o.total) AS ingreso_total
      FROM orders o
      WHERE o.estado = 'Pagado'
      GROUP BY DATE(o.fecha)
      ORDER BY fecha DESC
    `);

    const html = `<!DOCTYPE html><html><head>
      <meta charset="UTF-8"><title>Reporte de Ingresos</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 30px; }
        h1 { color: #b30000; text-align: center; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 10px; }
        th { background-color: #f2f2f2; }
      </style></head><body>
      <h1>Reporte de Ingresos</h1>
      <table>
        <thead><tr><th>Fecha</th><th>Ingreso Total</th></tr></thead>
        <tbody>
        ${ingresos.map(i => `
          <tr>
            <td>${new Date(i.fecha).toLocaleDateString()}</td>
            <td>$${i.ingreso_total.toFixed(2)}</td>
          </tr>
        `).join('')}
        </tbody>
      </table>
    </body></html>`;

    await generarPDF(html, 'reporte_ingresos', res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generando el reporte de ingresos');
  }
};

module.exports = {
  reporteProductos,
  reporteUsuarios,
  reporteOrdenes,
  reporteIngresos,
};