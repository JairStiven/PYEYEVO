import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Products.css";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

const Products = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [addedMessage, setAddedMessage] = useState(false);
  const [fondo, setFondo] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const categoryRefs = useRef({});

  useEffect(() => {
    const fetchProductosYCategorias = async () => {
      try {
        const [productosRes, categoriasRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/products`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/categories`),
        ]);
        setProductos(productosRes.data);
        setCategorias(categoriasRes.data);
      } catch (error) {
        console.error("Error cargando productos o categorías:", error);
      }
    };

    const fetchFondo = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/config/fondo_productos`
        );
        if (response.data?.url) {
          setFondo(response.data.url);
        }
      } catch (error) {
        console.error("Error cargando el fondo:", error);
      }
    };

    fetchProductosYCategorias();
    fetchFondo();
  }, []);

  useEffect(() => {
    if (location.hash) {
      const categoryId = location.hash.replace("#category-", "");
      const categoryElement = categoryRefs.current[categoryId];
      if (categoryElement) {
        categoryElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location.hash, categorias]);

  const handleAddToCart = (producto) => {
    addToCart(producto);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
  };

  const handleViewCart = () => {
    if (!user) {
      navigate("/login", { state: { from: "/cart" } });
    } else {
      navigate("/cart");
    }
  };

  return (
    <div
      className="products-background"
      style={{
        backgroundImage: fondo ? `url(${fondo})` : "none",
      }}
    >
      <div className="products-overlay">
        <div className="products-container">
          <div className="products-header">
            <h2>Nuestros Productos</h2>
            <button onClick={handleViewCart} className="view-cart-button">
              Ver Carrito
            </button>
          </div>

          {addedMessage && (
            <div className="added-message">
              Producto añadido al carrito
            </div>
          )}

          {categorias.map((categoria) => (
            <div
              key={categoria.id}
              id={`category-${categoria.id}`}
              ref={(el) => (categoryRefs.current[categoria.id] = el)}
              className="category-container"
            >
              <h3 className="category-title">{categoria.nombre}</h3>
              {/* === Aquí cambiamos la clase === */}
              <div className="public-products-grid">
                {productos
                  .filter((producto) => producto.categoria_id === categoria.id)
                  .map((producto) => (
                    <div key={producto.id} className="product-card">
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                      />
                      <h4>{producto.nombre}</h4>
                      <p>Precio: ${producto.precio}</p>
                      <Link to={`/product/${producto.id}`}>
                        <button>Ver Detalles</button>
                      </Link>
                      <button onClick={() => handleAddToCart(producto)}>
                        Añadir al Carrito
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;