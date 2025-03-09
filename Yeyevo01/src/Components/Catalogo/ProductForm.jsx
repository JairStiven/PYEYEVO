import React, { useState, useEffect } from 'react';
import './ProductForm.css';

const ProductForm = ({ onAddProduct, productToEdit }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (productToEdit) {
            setName(productToEdit.nombre);
            setDescription(productToEdit.descripcion);
            setPrice(productToEdit.precio);
            setStock(productToEdit.stock);
            setImageUrl(productToEdit.imagen_url);
        }
    }, [productToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const product = { nombre: name, descripcion: description, precio: price, stock, imagen_url: imageUrl };
        onAddProduct(product);
        setName('');
        setDescription('');
        setPrice('');
        setStock('');
        setImageUrl('');
    };

    return (
        <div className="product-form">
            <h2>{productToEdit ? 'Editar Producto' : 'Agregar Producto'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nombre</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Descripción</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Precio</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Stock</label>
                    <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Imagen URL</label>
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">
                    {productToEdit ? 'Actualizar Producto' : 'Agregar Producto'}
                </button>
                {productToEdit && (
                    <button type="button" onClick={() => onAddProduct(null)}>
                        Cancelar
                    </button>
                )}
            </form>
        </div>
    );
};

export default ProductForm;
