const Sequelize = require("sequelize");
const db = require("../../db/database");

module.exports = db.financieraSequelize.define(
    "historial_clientes",
    {
        idhistorial: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        operador: {
            type: Sequelize.DataTypes.STRING
        },
        fecha: {
            type: Sequelize.DataTypes.DATE
        },
        accion: {
            type: Sequelize.DataTypes.STRING
        },
        idcliente: {
            type: Sequelize.DataTypes.INTEGER
        },
    },
    {
        timestamps: false,
        freezeTableName: true
    },
    {
        tableName: "historial_clientes"
    }
);