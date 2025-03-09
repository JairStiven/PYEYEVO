import { createContext, useEffect, useState } from 'react';

// Creación del contexto
export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]); // Productos que provienen del backend
    const [cart, setCart] = useState([]); // Productos agregados al carrito

    // Obtener los productos del backend (API)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/productos');
                const data = await response.json();
                setProducts(data); // Guardar los productos en el estado
            } catch (error) {
                console.error('Error fetching products:', error); // Manejo de errores
            }
        };

        fetchProducts();
    }, []); // El useEffect solo se ejecuta una vez cuando el componente se monta

    // Función para agregar productos al carrito
    const buyProducts = (product) => {
        const productInCart = cart.find(item => item.id === product.id);
        
        if (productInCart) {
            setCart(cart.map(item => 
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]); // Agregar el producto con cantidad 1
        }
    };

    // Función para eliminar productos del carrito
    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId)); // Filtrar el carrito para eliminar el producto
    };

    return (
        <ProductContext.Provider value={{ products, cart, buyProducts, removeFromCart }}>
            {children} {/* Los hijos de este proveedor tienen acceso al contexto */}
        </ProductContext.Provider>
    );
};

export default ProductProvider;



