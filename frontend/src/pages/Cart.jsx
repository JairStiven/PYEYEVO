import React, { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/cart.css";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [fondo, setFondo] = useState(null);

  const total = cart.reduce((acc, item) => acc + item.precio * (item.cantidad || 1), 0);

  const handlePagar = () => {
    navigate("/pago");
  };

  useEffect(() => {
    const fetchFondo = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/config/fondo_productos`);
        if (response.data?.url) {
          setFondo(response.data.url);
        }
      } catch (error) {
        console.error("Error cargando el fondo del carrito:", error);
      }
    };

    fetchFondo();
  }, []);

  return (
    <div
      className="cart-background"
      style={{
        backgroundImage: fondo ? `url(${fondo})` : "none",
      }}
    >
      <div className="cart-overlay">
        <div className="cart-container">
          <h2>🛒 Carrito de Compras</h2>
          {cart.length === 0 ? (
            <p>El carrito está vacío.</p>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((producto, index) => (
                  <div key={index} className="cart-item">
                    <img src={producto.imagen} alt={producto.nombre} />
                    <div className="cart-info">
                      <h4>{producto.nombre}</h4>
                      <p>Precio: ${producto.precio}</p>
                      <p>Cantidad: {producto.cantidad || 1}</p>
                      <button className="btn-eliminar" onClick={() => removeFromCart(producto.id)}>
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <h3>Total: ${total.toFixed(2)}</h3>
                <div className="cart-buttons">
                  <button className="btn-vaciar" onClick={clearCart}>
                    Vaciar Carrito
                  </button>
                  <button className="btn-pagar" onClick={handlePagar}>
                    Ir a Pagar
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
