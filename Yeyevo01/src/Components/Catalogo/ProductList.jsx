import React from 'react';
import './ProductList.css';

const ProductList = ({ products, onEditProduct, onDeleteProduct }) => {
    return (
        <div className="product-list">
            <h2>Lista de Productos</h2>
            <table className="table table-striped">
                <thead>
                    <tr> 
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Imagen</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.nombre}</td>
                            <td>{product.descripcion}</td>
                            <td>${product.precio}</td>
                            <td>{product.stock}</td>
                            <td>
                                <img src={product.imagen_url} alt={product.nombre} width="100" />
                            </td>
                            <td className="action-buttons">
                                <button
                                    className="btn btn-success"
                                    onClick={() => onEditProduct(product)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => onDeleteProduct(product.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
