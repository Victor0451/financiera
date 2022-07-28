const Sequelize = require("sequelize");
const db = require("../../db/database");

module.exports = db.financieraSequelize.define(
    "clientes",
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
        },
        telefono: {
            type: Sequelize.DataTypes.STRING
        },
        direccion: {
            type: Sequelize.DataTypes.STRING
        },
        cod_postal: {
            type: Sequelize.DataTypes.STRING
        },
        barrio: {
            type: Sequelize.DataTypes.STRING
        },
        localidad: {
            type: Sequelize.DataTypes.STRING
        },
        fecha_nacimiento: {
            type: Sequelize.DataTypes.STRING
        },
        operador: {
            type: Sequelize.DataTypes.STRING
        },
        idzona: {
            type: Sequelize.DataTypes.INTEGER
        },
    },
    {
        timestamps: false,
        freezeTableName: true
    },
    {
        tableName: "clientes"
    }
);
