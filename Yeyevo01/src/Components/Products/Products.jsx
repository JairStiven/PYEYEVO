import { useContext } from 'react';
import { ProductContext } from '../../Context/Context';
import './products.css';

const Products = () => {
  const { products, buyProducts } = useContext(ProductContext);
  if (products.length === 0) {
    return <p>No se han encontrado productos.</p>;
  }

  return (
    <div className="products-container">
      {products.map((product) => ( 
        <div className="product-card" key={product.id}>
          {/* Usamos la URL de la imagen directamente desde la base de datos */}
          <img 
            src={product.imagen_url}  // Aquí va la URL directamente de la base de datos
            alt={product.nombre}
            className="product-image" 
          />
          <h3>{product.nombre}</h3>
          <p>{product.descripcion}</p>
          <h4>{product.precio}</h4>
          <button onClick={() => buyProducts(product)}>Comprar</button> 
        </div>
      ))}
    </div>
  );
};

export default Products;





