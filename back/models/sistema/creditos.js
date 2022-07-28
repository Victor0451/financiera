const Sequelize = require("sequelize");
const db = require("../../db/database");

module.exports = db.financieraSequelize.define(
    "creditos",
    {
        idcredito: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        idcliente: {
            type: Sequelize.DataTypes.INTEGER
        },

        prestamo: {
            type: Sequelize.DataTypes.FLOAT
        },

        monto_final: {
            type: Sequelize.DataTypes.FLOAT
        },

        monto_cuota: {
            type: Sequelize.DataTypes.FLOAT
        },

        cant_cuota: {
            type: Sequelize.DataTypes.INTEGER
        },

        monto_pagado: {
            type: Sequelize.DataTypes.FLOAT
        },

        cuotas_pagadas: {
            type: Sequelize.DataTypes.INTEGER
        },

        anticipo: {
            type: Sequelize.DataTypes.FLOAT
        },

        fecha: {
            type: Sequelize.DataTypes.DATE
        },

        operador: {
            type: Sequelize.DataTypes.STRING
        },

        vendedor: {
            type: Sequelize.DataTypes.STRING
        },

        idzona: {
            type: Sequelize.DataTypes.INTEGER
        },

        estado: {
            type: Sequelize.DataTypes.TINYINT
        },
    },
    {
        timestamps: false,
        freezeTableName: true
    },
    {
        tableName: "creditos"
    }
);
