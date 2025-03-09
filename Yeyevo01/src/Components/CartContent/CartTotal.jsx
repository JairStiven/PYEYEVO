import React from "react";

const CartTotal = ({ total }) => {
  return (
    <div className="cart-total">
      <h3>Total a pagar: ${total.toFixed(2)}</h3> {/* Asegúrate de que total sea un número con 2 decimales */}
    </div>
  );
};

export default CartTotal;
