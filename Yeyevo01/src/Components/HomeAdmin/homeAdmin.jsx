import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import './estilos.css';

const HomeAdmin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (type) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/consulta/${type}`);
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setLoading(false);
    }
  };

  
  const generarPDF = () => {
    const doc = new jsPDF();

    doc.text("Información Yeyevo", 10, 10);
    
    if (data.length === 0) {
      doc.text("No hay datos disponibles.", 10, 20);
    } else {
      
      let y = 20;
      data.forEach((item, index) => {
        y += 10;
        doc.text(`${index + 1}. ${Object.values(item).join(' - ')}`, 10, y);
      });
    }

    
    doc.save("informacion_Yeyevo.pdf");
  };

  return (
    <div>
      <nav className="navbar">
        <div className="search-bar">
          <input type="text" placeholder="Buscar..." />
        </div>
        <div className="navbar-center">
          <Link to="/catalogo">Catálogo</Link>
        </div>
      </nav>

      <div className="hero-section">
        <div className="hero-content">
          <h1>Administración Yeyevo</h1>
        </div>
      </div>

      <div className="products-section">
        <div className="product-item">
          <div className="product-description">
            <h3>Empleados</h3>
            <p>Gestiona la información de los empleados de la tienda.</p>
            <button onClick={() => fetchData('empleado')}>Generar PDF de Empleados</button>
          </div>
        </div>

        <div className="product-item">
          <div className="product-description">
            <h3>Usuarios</h3>
            <p>Visualiza y administra la información de los usuarios registrados.</p>
            <button onClick={() => fetchData('usuarios')}>Generar PDF de Usuarios</button>
          </div>
        </div>

        <div className="product-item">
          <div className="product-description">
            <h3>Facturas</h3>
            <p>Accede a las facturas generadas por las compras de los usuarios.</p>
            <button onClick={() => fetchData('factura')}>Generar PDF de Facturas</button>
          </div>
        </div>

        <div className="product-item">
          <div className="product-description">
            <h3>Pedidos</h3>
            <p>Revisa el estado y detalles de los pedidos realizados.</p>
            <button onClick={() => fetchData('pedidos')}>Generar PDF de Pedidos</button>
          </div>
        </div>
      </div>

      <div>
        {loading && <p>Cargando datos...</p>}
      </div>

      
      <div className="pdf-download-button">
        <button onClick={generarPDF}>Descargar PDF</button>
      </div>

      
    </div>
  );
};

export default HomeAdmin;









