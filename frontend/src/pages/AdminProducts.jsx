import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/AdminProducts.css";

const API_URL = import.meta.env.VITE_API_URL || "/api";

const AdminProducts = () => {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  const token = user?.token || localStorage.getItem("token");

  const api = axios.create({
    baseURL: API_URL,
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await api.get("api/products");
        setProductos(res.data);
      } catch (error) {
        console.error("Error al obtener productos", error);
      }
    };
    fetchProductos();
  }, [token]);

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await api.delete(`api/products/${id}`);
        setProductos((prev) => prev.filter((p) => p.id !== id));
      } catch (error) {
        console.error("Error al eliminar producto", error);
      }
    }
  };

  return (
    <div className="admin-products">
      <div className="header">
        <h2>Gestión de Productos</h2>
        <button
          className="btn-add-product"
          onClick={() => navigate("/admin/productos/formulario")}
        >
          <Plus size={18} /> Agregar Producto
        </button>
      </div>

      <div className="products-grid">
        {productos.map((producto) => (
          <div key={producto.id} className="product-card">
            <div className="image-wrapper">
              <img src={producto.imagen} alt={producto.nombre} />
            </div>
            <div className="info">
              <div>
                <h3 className="product-name">{producto.nombre}</h3>
                <p className="product-price">${producto.precio}</p>
              </div>
              <div className="actions">
                <button
                  className="edit-btn"
                  onClick={() =>
                    navigate(`/admin/productos/formulario/${producto.id}`)
                  }
                >
                  <Pencil size={16} />
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleEliminar(producto.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;