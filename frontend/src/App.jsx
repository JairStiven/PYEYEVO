import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Componentes comunes
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

// Páginas públicas
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import Pago from "./pages/Pago";

// Páginas protegidas (usuario autenticado)
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import UserProfile from "./pages/UserProfile";

// Páginas de administrador
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminNuevoProducts from "./pages/AdminNuevoProducts";
import AdminFormularioProducto from "./pages/AdminFormularioProducto";
import Reportes from "./pages/Reportes";
import AdminVerUsuarios from "./pages/AdminVerUsuarios";  // ← import

// Rutas protegidas
import PrivateRoute from "./contexts/PrivateRoute";

function App() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh" }}>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/pago" element={<Pago />} />

          {/* Rutas protegidas para usuarios autenticados */}
          <Route element={<PrivateRoute />}>
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<UserProfile />} />
          </Route>

          {/* Rutas sólo para administradores */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/productos" element={<AdminProducts />} />
            <Route path="/admin/productos/nuevo" element={<AdminNuevoProducts />} />
            <Route path="/admin/productos/formulario" element={<AdminFormularioProducto />} />
            <Route path="/admin/productos/formulario/:id" element={<AdminFormularioProducto />} />
            <Route path="/admin/reportes" element={<Reportes />} />
            <Route path="/admin/usuarios" element={<AdminVerUsuarios />} />  {/* ← ruta sincronizada */}
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;