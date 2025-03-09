import React from 'react';
import { Link } from 'react-router-dom';
import Products from '../Products/Products'; 
import './estilos.css';

const Home = () => {
  return (
    <div className="home-container"> 
      <nav className="navbar">
        <div className="search-bar">
          <input type="text" placeholder="Buscar" />
        </div>
        <div className="navbar-center">
          <Link to="/">Inicio</Link>
          <Link to="/CatalogoUser">Catálogo</Link>
          <Link to="/Cart">
            <i className="fas fa-shopping-cart"></i>
          </Link>
        </div>
        <div className="login-icon">
          <Link to="/login">
            <i className="fas fa-user"></i> Iniciar Sesión
          </Link>
        </div>
      </nav>

      <div className="hero-section">
        <div className="hero-content">
          <h1>En Yeyevo encontrarás lo ideal para ti</h1>
        </div>
      </div>

      
      <div className="products-section">
        <h2>NOVEDADES</h2> 
        <br/>
        <Products /> 
      </div>

      <section className="about-section">
        <h2>Acerca de Nosotros</h2>
        <p>
          Somos una empresa dedicada al diseño, la confección y el estampado de prendas textiles, tales como camisetas, buzos, mamelucos, bodys, blusones y más.
          Operando desde el 2019 hasta la actualidad, nos caracterizamos por la fiabilidad, calidad y precisión de nuestros productos.
        </p>
      </section>

      <footer className="footer">
        <p>Síguenos en:</p>
        <a href="https://instagram.com/yeyevo_?igsh=djBxYmtzdmswZTI2" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://facebook.com/Yeyevomoda" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook-f"></i>
        </a>
        <p>&copy; 2024 YEYEVO - Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default Home;


