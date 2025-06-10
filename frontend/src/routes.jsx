import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

// Componentes comunes
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Loader from "./components/common/Loader";

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
import AdminVerUsuarios from "./pages/AdminVerUsuarios";  // <-- import

// Rutas protegidas
import PrivateRoute from "./contexts/PrivateRoute";

const AppRoutes = () => {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;

  return (
    <>
      <Navbar />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/products" replace /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/products" replace /> : <Register />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/pago" element={<Pago />} />

        {/* Rutas protegidas para usuarios autenticados */}
        <Route element={<PrivateRoute />}>
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Route>

        {/* Rutas exclusivas para administradores */}
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/productos" element={<AdminProducts />} />
          <Route path="/admin/productos/nuevo" element={<AdminNuevoProducts />} />
          <Route path="/admin/productos/formulario" element={<AdminFormularioProducto />} />
          <Route path="/admin/productos/formulario/:id" element={<AdminFormularioProducto />} />
          <Route path="/admin/reportes" element={<Reportes />} />
          <Route path="/admin/usuarios" element={<AdminVerUsuarios />} />  {/* ← ruta sincronizada */}
        </Route>

        {/* Redirección para rutas no existentes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AppRoutes;