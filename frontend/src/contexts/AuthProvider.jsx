import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import {
  getUserProfile,
  loginUser,
  registerUser,
  logoutUser,
} from "../services/authService";
import PropTypes from "prop-types"; // <-- Añadido para validación de props

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Función para cerrar sesión
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    logoutUser();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }, [navigate]);

  // Obtener perfil al montar o cambiar el token
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userData = await getUserProfile(token);
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (error) {
        console.error("Error obteniendo perfil:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token, logout]);

  // Función de login con redirección según rol
  const login = async (credentials) => {
    try {
      const { token: newToken, user } = await loginUser(credentials);

      setToken(newToken);
      setUser(user);
      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirigir según el rol
      if (user.rol === "admin") {
        navigate("/admin");
      } else {
        navigate("/products");
      }

      return user;
    } catch (error) {
      console.error("Error en el inicio de sesión", error);
      throw error;
    }
  };

  // Función de registro
  const register = async (userData) => {
    try {
      await registerUser(userData);
      alert("Registro exitoso, ahora puedes iniciar sesión.");
      navigate("/login");
    } catch (error) {
      console.error("Error en el registro", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Validación de props (para SonarQube y buenas prácticas)
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
