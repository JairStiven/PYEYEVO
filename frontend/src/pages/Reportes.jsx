import React from "react";
import { Button } from "react-bootstrap";
import "../styles/Reportes.css";

const Reportes = () => {
  const reportes = [
    { nombre: "Productos", endpoint: "productos" },
    { nombre: "Usuarios", endpoint: "usuarios" },
    { nombre: "Órdenes", endpoint: "ordenes" },
    { nombre: "Ingresos", endpoint: "ingresos" },
  ];

  const descargarReporte = (endpoint) => {
    const url = `${import.meta.env.VITE_API_URL}/reportes/${endpoint}`;

    console.log("🔗 URL usada:", url);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Error al generar el PDF");
        return res.blob();
      })
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `reporte_${endpoint}.pdf`;
        link.click();
      })
      .catch((err) => {
        console.error(err);
        alert("Error al descargar el reporte.");
      });
  };

  return (
    <div className="reportes-page">
      <div className="reportes-card">
        <h1>📁 Generar Reportes</h1>
        <div className="buttons-container">
          {reportes.map((r) => (
            <Button
              key={r.endpoint}
              className="report-button"
              onClick={() => descargarReporte(r.endpoint)}
            >
              Descargar {r.nombre}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reportes;