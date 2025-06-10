import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleProductsClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/products");
    }
  };

  const isAdmin = user?.rol === "admin";

  return (
    <header className="navbar-container">
      <div className="navbar-content">
        <Link to="/" className="navbar-logo">YeYeVo</Link>

        <button className="navbar-toggle" onClick={toggleMenu}>
          <span className="toggle-icon">&#9776;</span>
        </button>

        <nav className={`navbar-links ${isOpen ? "active" : ""}`}>
          {/* Navbar para ADMIN */}
          {isAdmin ? (
            <>
              <button onClick={logout} className="logout-btn">
                <img
                  src="/icons/dejar.png"
                  alt="Cerrar Sesión"
                  className="nav-icon"
                />Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              {/* Navbar para usuarios normales o no logueados */}
              <Link to="/" onClick={toggleMenu}>
                <img src="/icons/hogar.png" alt="Inicio" className="nav-icon" />Inicio
              </Link>

              <button onClick={handleProductsClick} className="nav-button">
                <img
                  src="/icons/carrito-de-compras.png"
                  alt="Productos"
                  className="nav-icon"
                />Productos
              </button>

              {user ? (
                <>
                  <Link to="/profile" onClick={toggleMenu}>
                    <img
                      src="/icons/usuario.png"
                      alt="Perfil"
                      className="nav-icon"
                    />Perfil
                  </Link>
                  <button onClick={logout} className="logout-btn">
                    <img
                      src="/icons/dejar.png"
                      alt="Cerrar Sesión"
                      className="nav-icon"
                    />Cerrar Sesión
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={toggleMenu}>
                  <img
                    src="/icons/entrada.png"
                    alt="Iniciar Sesión"
                    className="nav-icon"
                  />Iniciar Sesión
                </Link>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
