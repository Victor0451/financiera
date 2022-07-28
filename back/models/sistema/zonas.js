const Sequelize = require("sequelize");
const db = require("../../db/database");

module.exports = db.financieraSequelize.define(
    "zonas",
    {
        idzona: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion: {
            type: Sequelize.DataTypes.STRING
        },

    },
    {
        timestamps: false,
        freezeTableName: true
    },
    {
        tableName: "zonas"
    }
);
