import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './estilos.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        usuario: '', contraseña: ''
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); 
    
        console.log("Datos del formulario:", formData); 
    
        try {
            const response = await axios.post('http://localhost:3000/login', {
                usuario: formData.usuario,  
                contraseña: formData.contraseña  
            });
    
            console.log("Respuesta del servidor:", response); 
    
            if (response.data.success) {
                if (response.data.redirect === '/homeAdmin') {
                    navigate('/homeAdmin'); 
                } else {
                    navigate('/catalogoUser');
                }
            } else {
                setError(response.data.message || 'Credenciales inválidas.');  
            }
        } catch (error) {
            console.error('Error en el login:', error);
            setError('Hubo un error al iniciar sesión. Intenta nuevamente.');
        }
    };
    
    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Iniciar sesión</h2>
                <form onSubmit={handleSubmit}>
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
                    <div className="login-options">
                        <label>
                            <input type="checkbox" /> Recuérdame
                        </label>
                        <Link to="/" className="forgot-password">¿Olvidaste la contraseña?</Link>
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>} 
                    <button className="login-button">Iniciar sesión</button>
                </form>
                <p className="register-link">
                    ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
