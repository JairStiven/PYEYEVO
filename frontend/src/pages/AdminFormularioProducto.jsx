import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import "../styles/AdminFormularioProducto.css";

const API_URL = import.meta.env.VITE_API_URL || "/api";

const AdminFormularioProducto = () => {
  const { id } = useParams(); // Si hay id, estamos en edición
  const navigate = useNavigate();
  const { user } = useAuth();

  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    imagen: "",
    categoria_id: "",
  });
  const [categorias, setCategorias] = useState([]);

  // Token para las peticiones privadas
  const token = user?.token || localStorage.getItem("token");

  // Cliente Axios configurado
  const api = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    // Cargar categorías (endpoint público)
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/categories`)
      .then((res) => setCategorias(res.data))
      .catch((err) => console.error("Error al cargar categorías", err));

    if (id) {
      // Cargar datos del producto para editar
      api
        .get(`/api/products/${id}`)
        .then((res) => setProducto(res.data))
        .catch((err) => console.error("Error al cargar producto", err));
    }
  }, [id, token]);

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/api/products/${id}`, producto);
        alert("✅ Producto actualizado correctamente");
      } else {
        await api.post("/api/products", producto);
        alert("✅ Producto creado correctamente");
      }
      navigate("/admin/productos");
    } catch (err) {
      console.error("Error al guardar", err);
      alert("❌ Ocurrió un error al guardar");
    }
  };

  return (
    <div className="formulario-producto-container">
      <h2>{id ? "Editar Producto" : "Agregar Producto"}</h2>
      <form onSubmit={handleSubmit} className="formulario-producto">
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            id="nombre"
            type="text"
            name="nombre"
            value={producto.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={producto.descripcion}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group half">
            <label htmlFor="precio">Precio:</label>
            <input
              id="precio"
              type="number"
              name="precio"
              min="0"
              step="0.01"
              value={producto.precio}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group half">
            <label htmlFor="stock">Stock:</label>
            <input
              id="stock"
              type="number"
              name="stock"
              min="0"
              value={producto.stock}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="imagen">Imagen (URL):</label>
          <input
            id="imagen"
            type="text"
            name="imagen"
            value={producto.imagen}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoria_id">Categoría:</label>
          <select
            id="categoria_id"
            name="categoria_id"
            value={producto.categoria_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Selecciona una categoría --</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

        <button className="btn-guardar" type="submit">
          {id ? "Actualizar Producto" : "Agregar Producto"}
        </button>
      </form>
    </div>
  );
};

export default AdminFormularioProducto;