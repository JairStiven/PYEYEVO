import { useState, useEffect } from "react";
import RegisterForm from "../components/auth/RegisterForm";
import axios from "axios";
import "../styles/Login.css"; // ✅ Usamos el mismo fondo que en Login

const Register = () => {
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/config/fondo_login`);
        if (response.data && response.data.url) {
          setBackgroundImage(response.data.url);
        } else {
          setBackgroundImage("/default-background.jpg");
        }
      } catch {
        setBackgroundImage("/default-background.jpg");
      }
    };
    fetchBackgroundImage();
  }, []);

  return (
    <div
      className="login-bg"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
      }}
    >
      <div className="overlay" /> {/* ✅ Capa oscura si se necesita */}
      <RegisterForm />
    </div>
  );
};

export default Register;