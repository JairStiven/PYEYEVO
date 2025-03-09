import React from 'react';

const ProductList1 = ({ products }) => {
    return (
        <div className="product-list">
            <div className="row">
                {products && products.length > 0 ? ( 
                    products.map((product) => (
                        <div className="col-md-4 mb-4" key={product.id}>
                            <div className="card h-100">
                                <img src={product.imagen_url} className="card-img-top" alt={product.nombre} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.nombre}</h5>
                                    <p className="card-text">{product.descripcion}</p>
                                    <p className="card-text"><strong>Precio:</strong> ${product.precio}</p>
                                    <p className="card-text"><strong>Stock:</strong> {product.stock}</p>
                                    <button className="btn btn-primary">Comprar</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <p>No hay productos disponibles.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductList1;
