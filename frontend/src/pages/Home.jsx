// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Home.css";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/categories`)
      .then((response) => setCategories(response.data))
      
  }, []);

  const handleCategoryClick = (categoryId) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/products#category-${categoryId}`);
    }
  };

  return (
    <div className="home-wrapper">
      {/* 🎠 Carrusel */}
      <Carousel className="custom-carousel">
        <Carousel.Item>
          <img
            src="https://media.gq.com.mx/photos/633b2a142c83728c8c557a3b/master/w_1600%2Cc_limit/mejores-gorras-de-hombre-para-look-casual-y-sobrio-new-era-nfl-staple.jpg"
            alt="Primera imagen"
          />
          <Carousel.Caption>
            <h3>Los mejores productos</h3>
            <p>Encuentra calidad y buenos precios aquí.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://britanico.edu.pe/be-britanico/wp-content/uploads/sites/5/2019/12/prendas-vestir-ingles-1.jpg"
            alt="Segunda imagen"
          />
          <Carousel.Caption>
            <h3>Ofertas exclusivas</h3>
            <p>Compra lo que necesitas, con la confianza de siempre.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://chauchaudeviaje.com/wp-content/uploads/2022/04/tienda-de-ropa-en-italia-portada-02.jpg"
            alt="Tercera imagen"
          />
          <Carousel.Caption>
            <h3>Envíos a todo el país</h3>
            <p>Recibe tus productos en la puerta de tu casa.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* 💬 Presentación */}
      <div className="container mt-5 text-center">
        <h1 className="welcome-title">BIENVENIDOS A YEYEVO</h1>
        <p>
          En YeYeVo, transformamos tus ideas en prendas personalizadas.
          Explora nuestra colección y crea tu propio estilo.
        </p>
      </div>

      {/* 📦 Categorías */}
      <div className="container mt-5 mb-5">
        <h2 className="categories-title">NUESTRAS CATEGORÍAS</h2>
        <div className="categories-grid">
          {categories.map((category) => (
              <div
                key={category.id}
                className="category-card"
                role="button"
                tabIndex={0}
                onClick={() => handleCategoryClick(category.id)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleCategoryClick(category.id);
                  }
                }}
              >
              <img src={category.imagen} alt={category.nombre} />
              <p>{category.nombre}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
