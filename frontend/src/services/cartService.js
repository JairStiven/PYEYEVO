import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "/api";
// Configura la instancia de axios con el token automáticamente
const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para agregar el token a cada solicitud
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
   (error) => Promise.reject(error instanceof Error ? error : new Error(error))
);

// Obtener el carrito del usuario autenticado
export const getCart = async () => {
  const res = await api.get("/api/cart");
  return res.data;
};

// Añadir producto al carrito
export const addToCart = async (producto_id, cantidad = 1) => {
  await api.post("/api/cart", { producto_id, cantidad });
};

// Eliminar un producto del carrito
export const removeFromCart = async (id) => {
  await api.delete(`/api/cart/${id}`);
};

// Vaciar todo el carrito
export const clearCart = async () => {
  await api.delete("/api/cart");
};

export default api;
