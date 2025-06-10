// src/middlewares/requireAdmin.js

const requireAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'No autenticado: token no válido o no proporcionado' });
    }

    if (req.user.rol !== 'admin') {
        return res.status(403).json({ message: 'Acceso denegado: solo administradores' });
    }

    next();
};

module.exports = requireAdmin;