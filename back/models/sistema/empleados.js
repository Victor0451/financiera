const Sequelize = require("sequelize");
const db = require("../../db/database");

module.exports = db.financieraSequelize.define(
    "empleados",
    {
        idempleado: {
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
        },
        direccion: {
            type: Sequelize.DataTypes.STRING
        },
        telefono: {
            type: Sequelize.DataTypes.STRING
        },
        barrio: {
            type: Sequelize.DataTypes.STRING
        },
        localidad: {
            type: Sequelize.DataTypes.STRING
        },
        cuil: {
            type: Sequelize.DataTypes.INTEGER
        },

    },
    {
        timestamps: false,
        freezeTableName: true
    },
    {
        tableName: "empleados"
    }
);
