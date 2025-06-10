const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = (req, res, next) => {
    try {
        let token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'Acceso denegado. No hay token.' });
        }

        // Remover "Bearer " si está presente
        token = token.replace('Bearer ', '');

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Guardar info del usuario en req.user
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado.', error: error.message });
    }
};

module.exports = authMiddleware;