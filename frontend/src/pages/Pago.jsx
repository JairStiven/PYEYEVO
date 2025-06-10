import React, { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import "../styles/Pago.css";
const Pago = () => {
  const { cart, clearCart } = useCart();
  const { token } = useAuth();
  const [fondo, setFondo] = useState(null);

  useEffect(() => {
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

    fetchFondo();
  }, []);

  if (!cart) return <p>Cargando carrito...</p>;
  if (cart.length === 0) return <p>Tu carrito está vacío.</p>;

  const total = cart.reduce((sum, item) => {
    const precio = parseFloat(item.precio) || 0;
    const cantidad = parseInt(item.cantidad) || 1;
    return sum + precio * cantidad;
  }, 0);

  const handlePagoWhatsApp = async () => {
    try {
      const cartConProductoId = cart.map(item => ({
        producto_id: item.producto_id || item.id,
        nombre: item.nombre,
        precio: item.precio,
        cantidad: item.cantidad,
      }));

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/orders/create`,
        {
          cart: cartConProductoId,
          metodoPago: "WhatsApp",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { factura_numero } = response.data;

      const mensaje = `Hola, quiero realizar el siguiente pedido (Factura ${factura_numero}):\n\n${cart
        .map((item) => {
          const precio = parseFloat(item.precio) || 0;
          const cantidad = parseInt(item.cantidad) || 1;
          return `${item.nombre} x${cantidad} - $${(precio * cantidad).toFixed(2)}`;
        })
        .join("\n")}\n\nTotal: $${total.toFixed(2)}`;

      const numero = "573222456505";
      const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

      window.open(url, "_blank");
      clearCart();
    } catch (error) {
      console.error("Error al registrar la orden:", error);
      alert("Ocurrió un error al registrar tu pedido.");
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
        <div className="pago-container">
          <h2>Resumen de tu compra</h2>
          <ul className="list-group mb-3">
            {cart.map((item) => {
              const precio = parseFloat(item.precio) || 0;
              const cantidad = parseInt(item.cantidad) || 1;
              return (
                <li
                  key={item.producto_id || item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>{item.nombre} x{cantidad}</div>
                  <span>${(precio * cantidad).toFixed(2)}</span>
                </li>
              );
            })}
          </ul>
          <h4>Total: ${total.toFixed(2)}</h4>
          <button className="btn btn-success mt-3" onClick={handlePagoWhatsApp}>
            Pagar con WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pago;