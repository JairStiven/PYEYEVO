// src/models/config.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.js'); // ✅ Corrección: Importar desde db.js

const Config = sequelize.define('Config', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    clave: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    valor: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'configuraciones', // Cambiamos el nombre a la tabla correcta
    timestamps: false // No usamos timestamps en esta tabla
});

module.exports = Config;