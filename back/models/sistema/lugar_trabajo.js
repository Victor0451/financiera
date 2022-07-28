const Sequelize = require("sequelize");
const db = require("../../db/database");

module.exports = db.financieraSequelize.define(
    "lugar_trabajo",
    {
        idcliente: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        razon_social: {
            type: Sequelize.DataTypes.STRING
        },
        direccion_legal: {
            type: Sequelize.DataTypes.STRING
        },
        tel_legal: {
            type: Sequelize.DataTypes.INTEGER
        },
        cuil: {
            type: Sequelize.DataTypes.STRING
        },
        fecha: {
            type: Sequelize.DataTypes.STRING
        },
        idzona: {
            type: Sequelize.DataTypes.INTEGER
        },
        barrio_legal: {
            type: Sequelize.DataTypes.STRING
        },
        empresa: {
            type: Sequelize.DataTypes.STRING
        },
        clasi: {
            type: Sequelize.DataTypes.STRING
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    },
    {
        tableName: "lugar_trabajo"
    }
);
