const Sequelize = require("sequelize");
const db = require("../../db/database");

module.exports = db.financieraSequelize.define(
    "plan_cuotas",
    {
        idplancuotas: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        plan_cuotas: {
            type: Sequelize.DataTypes.INTEGER
        },

    },
    {
        timestamps: false,
        freezeTableName: true
    },
    {
        tableName: "plan_cuotas"
    }
);
