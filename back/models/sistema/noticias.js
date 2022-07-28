const Sequelize = require("sequelize");
const db = require("../../db/database");

module.exports = db.financieraSequelize.define(
    "noticias",
    {
        idnoticia: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fecha: {
            type: Sequelize.DataTypes.DATE
        },
        noticia: {
            type: Sequelize.DataTypes.STRING
        },
        operador: {
            type: Sequelize.DataTypes.STRING
        },
        perfil: {
            type: Sequelize.DataTypes.INTEGER
        },
    },
    {
        timestamps: false,
        freezeTableName: true
    },
    {
        tableName: "noticias"
    }
);
