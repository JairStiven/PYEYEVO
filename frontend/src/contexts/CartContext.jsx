import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  getCart,
  addToCart as apiAddToCart,
  removeFromCart as apiRemoveFromCart,
  clearCart as apiClearCart,
} from "../services/cartService";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const carrito = await getCart();
          setCart(carrito);
        } catch (err) {
          console.error("Error cargando carrito:", err);
        }
      } else {
        setCart([]);
      }
    };

    fetchCart();
  }, []);

  const addToCart = async (producto, cantidad = 1) => {
    try {
      await apiAddToCart(producto.id, cantidad);
      const updatedCart = await getCart();
      setCart(updatedCart);
    } catch (err) {
      console.error("Error al añadir al carrito:", err);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await apiRemoveFromCart(id);
      const updatedCart = await getCart();
      setCart(updatedCart);
    } catch (err) {
      console.error("Error al eliminar del carrito:", err);
    }
  };

  const clearCart = async () => {
    try {
      await apiClearCart();
      setCart([]);
    } catch (err) {
      console.error("Error al vaciar el carrito:", err);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCart = () => useContext(CartContext);
