// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import ProductForm from "./ProductForm.jsx";
import ProductList from './ProductList.jsx';

const Catalogo = () => {
    const [products, setProducts] = useState([]);
    const [productToEdit, setProductToEdit] = useState(null);

    // Obtener productos desde el backend
    useEffect(() => {
        fetch('http://localhost:3000/api/consulta/productos')  // Asegúrate de que la URL sea correcta
            .then(response => response.json())
            .then(data => setProducts(data))  // Establece los productos en el estado
            .catch(error => console.error('Error fetching products:', error));
    }, []);  // Este useEffect se ejecuta una vez cuando el componente se monta

    const handleAddProduct = (product) => {
        if (product) {
            if (productToEdit) {
                setProducts(products.map(p => (p.id === productToEdit.id ? product : p)));
            } else {
                setProducts([...products, { ...product, id: products.length + 1 }]);
            }
            setProductToEdit(null);
        }
    };

    const handleEditProduct = (product) => {
        setProductToEdit(product);
    };

    const handleDeleteProduct = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    return (
        <div className="Catalogo">
            <ProductForm onAddProduct={handleAddProduct} productToEdit={productToEdit} />
            <ProductList
                products={products}
                onEditProduct={handleEditProduct}
                onDeleteProduct={handleDeleteProduct}
            />
        </div>
    );
};

export default Catalogo;
