import React, { useState, useEffect } from 'react';
import ProductList1 from './ProductList1';
import './CatalogoUser.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const CatalogoUser = () => {
    const [products, setProducts] = useState([]);

    // Obtener productos desde el backend
    useEffect(() => {
        fetch('http://localhost:3000/api/productos')  // Asegúrate de que la URL es correcta
            .then(response => response.json())
            .then(data => setProducts(data))  // Establece los productos en el estado
            .catch(error => console.error('Error fetching products:', error));
    }, []);  // Este useEffect se ejecuta una vez cuando el componente se monta

    return (
        <div className="App">
            {/* Barra superior */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">YEYEVO</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" href="/">Inicio</a>
                            </li>
                            <li className="nav-item">
                                <a className="fas fa-shopping-cart" href="/Cart"></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Sección de bienvenida */}
            <div className="welcome-container">
                <div className="Welcome-content">
                <h1>Bienvenidos a YEYEVO</h1>
                </div>
            </div>

            {/* Sección de productos */}
            <div id="productos" className="product-section">
                <h2>Lista de Productos</h2>
                <ProductList1 products={products} />
            </div>

            {/* Pie de página */}
            <footer className="footer">
                <p>&copy; 2024 YEYEVO. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default CatalogoUser;
