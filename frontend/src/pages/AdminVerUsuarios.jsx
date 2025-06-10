import React, { useEffect, useState } from "react";
import { Users, Plus } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import "../styles/AdminVerUsuarios.css";

const API_URL = import.meta.env.VITE_API_URL || "/api";
  
const AdminVerUsuarios = () => {
  const { user, token } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoAdmin, setNuevoAdmin] = useState({
    nombre: "",
    email: "",
    password: "",
    direccion: "",
    telefono: "",
  });
  const [mensaje, setMensaje] = useState("");

  const api = axios.create({
    baseURL: API_URL,
    headers: { Authorization: `Bearer ${token}` },
  });

  const cargarUsuarios = async () => {
    try {
      const res = await api.get("/api/users");
      setUsuarios(res.data);
    } catch (error) {
      console.error("Error al cargar usuarios", error);
    }
  };

  useEffect(() => {
    if (user?.rol === "admin" && token) {
      cargarUsuarios();
    }
  }, [user, token]);

  const handleChange = (e) => {
    setNuevoAdmin({ ...nuevoAdmin, [e.target.name]: e.target.value });
  };

  const registrarAdmin = async (e) => {
    e.preventDefault();

    // Validación de nombre
    const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (!nombreRegex.test(nuevoAdmin.nombre)) {
      setMensaje("❌ El nombre solo debe contener letras.");
      return;
    }

    // Validación de teléfono (solo números, entre 7 y 15 dígitos)
    const telefonoRegex = /^[0-9]{7,15}$/;
    if (!telefonoRegex.test(nuevoAdmin.telefono)) {
      setMensaje("❌ El teléfono debe contener solo números.");
      return;
    }

    try {
      await api.post("/users/register-admin", nuevoAdmin);
      setMensaje("✅ Administrador registrado con éxito");
      setNuevoAdmin({
        nombre: "",
        email: "",
        password: "",
        direccion: "",
        telefono: "",
      });
      cargarUsuarios();
    } catch (error) {
      setMensaje("❌ Error al registrar administrador");
      console.error("Error al registrar administrador", error);
    }
  };

  return (
    <div className="admin-ver-usuarios">
      <div className="header">
        <Users className="icon" size={24} />
        <h2>Usuarios Registrados</h2>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Registro</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>{u.rol}</td>
                <td>{new Date(u.fecha_registro).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="form-header">
        <Plus className="icon-plus" size={20} />
        <h3>Registrar nuevo administrador</h3>
      </div>
      {mensaje && <div className="message">{mensaje}</div>}

      <div className="form-wrapper">
        <form onSubmit={registrarAdmin}>
          <div className="form-row">
            <div className="form-group">
              <input
                name="nombre"
                value={nuevoAdmin.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                required
              />
            </div>
            <div className="form-group">
              <input
                name="email"
                type="email"
                value={nuevoAdmin.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <input
                name="password"
                type="password"
                value={nuevoAdmin.password}
                onChange={handleChange}
                placeholder="Contraseña"
                required
              />
            </div>
            <div className="form-group">
              <input
                name="telefono"
                value={nuevoAdmin.telefono}
                onChange={handleChange}
                placeholder="Teléfono"
                required
              />
            </div>
          </div>

          <div className="form-group full">
            <input
              name="direccion"
              value={nuevoAdmin.direccion}
              onChange={handleChange}
              placeholder="Dirección"
            />
          </div>

          <div className="form-group full">
            <button type="submit" className="btn">
              Registrar Administrador
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminVerUsuarios;
