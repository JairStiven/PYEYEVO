import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/AdminNuevoProducts.css";

const AdminNuevoProducts = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Si existe ID, estamos editando
  const [categorias, setCategorias] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);

  const [formulario, setFormulario] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    imagen: "",
    categoria_id: "",
  });

  // Cargar categorías y producto (si hay id)
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
        setCategorias(res.data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    const fetchProducto = async () => {
      if (id) {
        setModoEdicion(true);
        try {
          const res = await axios.get(`/api/products/${id}`);
          const prod = res.data;
          setFormulario({
            nombre: prod.nombre,
            descripcion: prod.descripcion,
            precio: prod.precio,
            stock: prod.stock,
            imagen: prod.imagen,
            categoria_id: prod.categoria_id,
          });
        } catch (error) {
          console.error("Error al cargar producto:", error);
          alert("Error al cargar los datos del producto.");
        }
      }
    };

    fetchCategorias();
    fetchProducto();
  }, [id]);

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modoEdicion) {
        await axios.put(`/api/products/${id}`, formulario);
        alert("Producto actualizado correctamente");
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/products`, formulario);
        alert("Producto agregado correctamente");
      }
      navigate("/admin/productos");
    } catch (error) {
      console.error("Error al guardar producto:", error);
      alert("Hubo un error al guardar el producto");
    }
  };

  return (
    <div className="admin-new-product">
      <div className="header">
        <h2>{modoEdicion ? "Editar Producto" : "Agregar Nuevo Producto"}</h2>
      </div>

      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            type="text"
            name="nombre"
            value={formulario.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            rows="4"
            value={formulario.descripcion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group half">
            <label htmlFor="precio">Precio</label>
            <input
              id="precio"
              type="number"
              name="precio"
              min="0"
              step="0.01"
              value={formulario.precio}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group half">
            <label htmlFor="stock">Stock</label>
            <input
              id="stock"
              type="number"
              name="stock"
              min="0"
              value={formulario.stock}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="imagen">Imagen (URL)</label>
          <input
            id="imagen"
            type="text"
            name="imagen"
            value={formulario.imagen}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoria_id">Categoría</label>
          <select
            id="categoria_id"
            name="categoria_id"
            value={formulario.categoria_id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn-save-product">
          {modoEdicion ? "Actualizar Producto" : "Guardar Producto"}
        </button>
      </form>
    </div>
  );
};

export default AdminNuevoProducts;