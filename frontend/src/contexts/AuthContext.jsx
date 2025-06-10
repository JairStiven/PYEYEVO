// src/contexts/AuthContext.jsx
import { createContext, useContext } from "react";

// Crear el contexto de autenticación
export const AuthContext = createContext(null);

// Hook para acceder al contexto
export const useAuth = () => {
  return useContext(AuthContext);
};