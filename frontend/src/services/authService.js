// src/services/authService.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const AUTH_API_URL = `${API_URL}/api/auth`;
const USER_API_URL = `${API_URL}/api/users`;

// ==========================
// 🔐 UTILIDADES DE LOCALSTORAGE
// ==========================

export const getToken = () => localStorage.getItem("token");

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const login = (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// ✅ Alias para evitar conflicto con la palabra "logout" en AuthProvider
export const logoutUser = logout;

// ==========================
// 📩 REGISTRO
// ==========================

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${AUTH_API_URL}/register`, userData);
    
    // Normalmente no se inicia sesión al registrarse
    // Pero si el backend devuelve token + user, los puedes guardar:
    const { token, user } = response.data || {};
    if (token && user) {
      login(token, user);
    }

    return { token, user };
  } catch (error) {
    console.error("Error en registerUser:", error.response?.data || error);
    throw new Error(error.response?.data?.message || "Error en el registro");
  }
};

// ==========================
// 🔑 LOGIN
// ==========================

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${AUTH_API_URL}/login`, userData);
    const { token, user } = response.data;

    // Guardar en localStorage
    login(token, user);
    return { token, user };
  } catch (error) {
    console.error("Error en login:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error en el inicio de sesión");
  }
};

// ==========================
// 👤 PERFIL
// ==========================

export const getUserProfile = async () => {
  const token = getToken();
  if (!token) throw new Error("Token no encontrado");

  try {
    const response = await axios.get(`${USER_API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener perfil:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error al obtener el perfil");
  }
};