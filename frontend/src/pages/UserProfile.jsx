import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getUserProfile } from "../services/authService";
import axios from "axios";
import "../styles/UserProfile.css";

const UserProfile = () => {
  const { user, token } = useAuth();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    direccion: "",
    telefono: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [fondo, setFondo] = useState(null); // NUEVO

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserProfile(token);
        setFormData({
          nombre: res.nombre || "",
          email: res.email || "",
          direccion: res.direccion || "",
          telefono: res.telefono || "",
        });
      } catch (err) {
        console.error("Error al cargar perfil:", err);
        setMensaje("❌ Error al cargar el perfil");
      }
    };

    const fetchFondo = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/config/fondo_productos`);
        if (response.data?.url) {
          setFondo(response.data.url);
        }
      } catch (error) {
        console.error("Error al cargar el fondo:", error);
      }
    };

    if (user && token) fetchUser();
    fetchFondo();
  }, [user, token]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleGuardar = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/users/profile`,
        {
          nombre: formData.nombre,
          direccion: formData.direccion,
          telefono: formData.telefono,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMensaje("✅ Perfil actualizado correctamente");
      setEditMode(false);
      setFormData((prev) => ({
        ...prev,
        ...res.data.user,
      }));
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      setMensaje("❌ Error al guardar los cambios");
    } finally {
      setTimeout(() => setMensaje(""), 3000);
    }
  };

  if (!user) return <p>Cargando usuario...</p>;

  return (
    <div
      className="user-profile-background" // para poder estilizar con overlay si quieres
      style={{
        backgroundImage: fondo ? `url(${fondo})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh", // para cubrir toda la pantalla
      }}
    >
      <div className="user-profile-container">
        <h2>Mi Perfil</h2>

        {mensaje && <p className="mensaje">{mensaje}</p>}

        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            id="nombre"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="direccion">Dirección:</label>
          <input
            id="direccion"
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Teléfono:</label>
          <input
            id="telefono"
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        <div className="form-actions">
          {!editMode ? (
            <button onClick={() => setEditMode(true)}>Editar</button>
          ) : (
            <>
              <button onClick={handleGuardar}>Guardar Cambios</button>
              <button className="cancelar" onClick={() => setEditMode(false)}>
                Cancelar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
