import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AdminDashboard.css";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
} from "recharts";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user || user.rol !== "admin") {
      navigate("/login");
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/stats`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setStats(res.data);
      } catch (error) {
        console.error("Error al cargar estadísticas", error);
      }
    };

    fetchStats();
  }, [user, navigate]);

  if (!stats) return <div className="admin-dashboard">Cargando...</div>;

  const productosData = [
    { name: "Lun", value: 12 },
    { name: "Mar", value: 8 },
    { name: "Mié", value: 16 },
    { name: "Jue", value: 9 },
    { name: "Vie", value: 14 },
  ];

  const usuariosData = [
    { name: "Jan", value: 20 },
    { name: "Feb", value: 35 },
    { name: "Mar", value: 50 },
    { name: "Abr", value: 45 },
    { name: "May", value: 70 },
  ];

  const ordenesData = [
    { name: "Semana 1", value: 15 },
    { name: "Semana 2", value: 30 },
    { name: "Semana 3", value: 10 },
    { name: "Semana 4", value: 25 },
  ];

  const ingresosData = [
    { name: "Lun", value: 400 },
    { name: "Mar", value: 600 },
    { name: "Mié", value: 550 },
    { name: "Jue", value: 700 },
    { name: "Vie", value: 900 },
  ];

  const pendientesData = [
    { name: "1", value: 4 },
    { name: "2", value: 5 },
    { name: "3", value: 2 },
    { name: "4", value: 3 },
    { name: "5", value: 6 },
  ];

  const statCards = [
    {
      title: "Productos",
      value: stats.productos,
      chart: (
        <BarChart data={productosData}>
          <Bar dataKey="value" fill="#e74c3c" radius={[4, 4, 0, 0]} />
        </BarChart>
      ),
      buttonText: "🛍️ Ver Productos",
      onClick: () => navigate("/admin/productos"),
    },
    {
      title: "Usuarios",
      value: stats.usuarios,
      chart: (
        <LineChart data={usuariosData}>
          <Line type="monotone" dataKey="value" stroke="#3498db" strokeWidth={2} />
          <Tooltip />
        </LineChart>
      ),
      buttonText: "👤 Ver Usuarios",
      onClick: () => navigate("/admin/usuarios"),
    },
    {
      title: "Reportes",
      value: stats.ordenes,
      chart: (
        <BarChart data={ordenesData}>
          <Bar dataKey="value" fill="#2ecc71" radius={[4, 4, 0, 0]} />
        </BarChart>
      ),
      buttonText: "📄 Ver Reportes",
      onClick: () => navigate("/admin/reportes"),
    },
    
  ];

  return (
    <div className="admin-dashboard">
      <h2>Bienvenido, Administrador 👑</h2>
      <div className={`admin-stats ${statCards.length % 2 !== 0 ? "impar" : ""}`}>
        {statCards.map((card, i) => (
          <div key={i} className="stat-card">
            <h4>{card.title}</h4>
            <p>{card.value}</p>
            <ResponsiveContainer width="100%" height={60}>
              {card.chart}
            </ResponsiveContainer>
            <div className="button-container">
              <button className="stat-button" onClick={card.onClick}>
                {card.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;