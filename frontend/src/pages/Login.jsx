import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";

import { AuthContext } from "../contexts/AuthContext";
import "../styles/Login.css";

const Login = () => {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (user) {
      if (user.rol === "admin") {
        navigate("/admin"); // 🔁 ruta actualizada
      } else {
        navigate("/products");
      }
    }
  }, [user, navigate]);

  // Cargar la imagen de fondo
  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/config/fondo_login`);
        setBackgroundImage(response.data?.url || "/default-background.jpg");
      } catch {
        setBackgroundImage("/default-background.jpg");
      }
    };
    fetchBackgroundImage();
  }, []);

  // Manejar login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const loggedUser = await login({ email, password });

      if (loggedUser?.rol === "admin") {
        navigate("/admin"); // 🔁 ruta actualizada
      } else {
        navigate("/products");
      }
    } catch {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="login-container"
      style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none" }}
    >
      <div className="overlay"></div>
      <div className="login-box">
        <h2 className="brand-title">YEYEVO</h2>
        <p className="tagline">Bienvenido, ingresa a tu cuenta</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group password-container">
            <label htmlFor="password">Contraseña</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>

          <div className="options">
            <Link to="/forgot-password" className="forgot-link">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button type="submit" className="login-btn">
            Ingresar
          </button>
        </form>

        <div className="extra-links">
          <p>
            ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;