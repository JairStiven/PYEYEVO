import { useContext } from "react";
import { ProductContext as Context } from "../../Context/Context";
import NavBar from "../NavBar/NavBar";
import CartElements from "./CartElements";
import CartTotal from "./CartTotal";
import './CartContent.css';

const CartContent = () => {
  const { cart } = useContext(Context);

  // Función para calcular el total
  const getTotal = () => {
    return cart.reduce((total, product) => {
      // Asegúrate de que el precio sea un número válido
      const productPrice = parseFloat(product.precio) || 0; // Si el precio no es válido, usamos 0
      const productQuantity = product.quantity || 1; // Si la cantidad no está definida, asumimos 1
      return total + (productPrice * productQuantity);
    }, 0);
  };

  const total = getTotal();

  return (
    <>
      <NavBar />
      {cart.length > 0 ? (
        <>
          <CartElements />
          <CartTotal total={total} />
        </>
      ) : (
        <h2 className="cart-message-center">Tu carrito está vacío</h2>
      )}
    </>
  );
};

export default CartContent;


