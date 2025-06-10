import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import "../styles/ProductDetails.css";

const tallasDisponibles = ["XS", "S", "M", "L", "XL", "XXL"];

const ProductDetails = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [fondo, setFondo] = useState(null);
  const [addedMessage, setAddedMessage] = useState(false);
  const [tallaSeleccionada, setTallaSeleccionada] = useState("");
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
        setProducto(response.data);
      } catch (error) {
        console.error("Error al obtener detalles del producto:", error);
      }
    };

    const fetchFondo = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/config/fondo_productos`);
        if (response.data?.url) {
          setFondo(response.data.url);
        }
      } catch (error) {
        console.error("Error cargando el fondo:", error);
      }
    };

    fetchProductDetails();
    fetchFondo();
  }, [id]);

  const handleAddToCart = () => {
    if (!tallaSeleccionada) return alert("Por favor, selecciona una talla.");
    addToCart({ ...producto, talla: tallaSeleccionada });
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

  if (!producto) {
    return <p className="loading">Cargando detalles del producto...</p>;
  }

  return (
    <div
      className="products-background"
      style={{
        backgroundImage: fondo ? `url(${fondo})` : "none",
      }}
    >
      <div className="products-overlay">
        <div className="product-details-container">
          <h2>{producto.nombre}</h2>
          <img src={producto.imagen} alt={producto.nombre} />
          <p className="product-description">{producto.descripcion}</p>
          <p className="product-category">Categoría: {producto.categoria || "General"}</p>
          <p className="product-stock">Stock disponible: {producto.stock}</p>

          <div className="talla-section">
            <label htmlFor="talla">Selecciona tu talla:</label>
            <select
              id="talla"
              value={tallaSeleccionada}
              onChange={(e) => setTallaSeleccionada(e.target.value)}
            >
              <option value="">-- Seleccionar --</option>
              {tallasDisponibles.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <h3 className="product-price">Precio: ${producto.precio}</h3>

          <div className="buttons">
            <button className="btn-add" onClick={handleAddToCart}>
              Añadir al Carrito
            </button>
            <button className="btn-cart" onClick={handleViewCart}>
              Ver Carrito
            </button>
          </div>

          {addedMessage && (
            <p className="added-message">Producto añadido al carrito</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;