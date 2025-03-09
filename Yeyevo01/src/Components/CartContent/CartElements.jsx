import { useContext } from "react";
import { ProductContext as Context } from "../../Context/Context";

const CartElements = () => {
  const { cart, removeFromCart } = useContext(Context);

  return (
    <div className="cart-elements">
      {cart.map((product) => (
        <div key={product.id} className="cart-item">
          <img src={product.imagen_url || "default-image.png"} alt={product.nombre} />
          <div>
            <h3>{product.nombre}</h3>
            <p>Precio: ${parseFloat(product.precio).toFixed(2)}</p> {/* Aseguramos que el precio sea un número con dos decimales */}
            <p>Cantidad: {product.quantity}</p>
          </div>
          <button onClick={() => removeFromCart(product.id)}>❌</button>
        </div>
      ))}
    </div>
  );
};

export default CartElements;
