import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './estilos.css';

const Register = () => {
  const [formData, setFormData] = useState({
    doc: '',
    nombres: '',
    apellidos: '',
    correo: '',
    telefono: '',
    direccion: '',
    usuario: '',
    contraseña: '',
    confirmContraseña: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar que las contraseñas coincidan
    if (formData.contraseña !== formData.confirmContraseña) {
      setError('Las contraseñas no coinciden');
      return;
    }

    const payload = {
      cliente: {
        doc: formData.doc,
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        correo: formData.correo,
        telefono: formData.telefono,
        direccion: formData.direccion,
      },
      usuario: {
        usuario: formData.usuario,
        contraseña: formData.contraseña,
      },
    };

    try {
      const response = await axios.post('http://localhost:3000/register', payload);
      alert(response.data.message);
      navigate('/login');
    } catch (error) {
      console.error('Error en el registro:', error);
      setError('Hubo un error al registrar la cuenta');
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Registrarse</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Documento de identidad"
            name="doc"
            value={formData.doc}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Nombres"
            name="nombres"
            value={formData.nombres}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Apellidos"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Teléfono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Dirección"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Usuario"
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Contraseña"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            name="confirmContraseña"
            value={formData.confirmContraseña}
            onChange={handleChange}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button className="register-button">Crear cuenta</button>
        </form>
        <p className="login-link">
          ¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;