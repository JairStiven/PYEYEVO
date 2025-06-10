import React from "react";
import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  // Mostrar "Cargando..." mientras se obtiene la información del usuario
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Si no hay usuario autenticado, redirigir al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si se definieron allowedRoles como array y el rol del usuario no está permitido, redirigir al home
  if (Array.isArray(allowedRoles) && !allowedRoles.includes(user?.rol)) {
    return <Navigate to="/" replace />;
  }

  // Si no se definen allowedRoles o el usuario tiene un rol permitido, renderizar el contenido
  return <Outlet />;
};

PrivateRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string), // <-- validación agregada
};

export default PrivateRoute;
