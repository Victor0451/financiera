const Sequelize = require("sequelize");
const db = require("../../db/database");

module.exports = db.financieraSequelize.define(
    "adherentes",
    {
        idcliente: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        apellido: {
            type: Sequelize.DataTypes.STRING
        },
        nombre: {
            type: Sequelize.DataTypes.STRING
        },
        dni: {
            type: Sequelize.DataTypes.INTEGER
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    },
    {
        tableName: "adherentes"
    }
);
