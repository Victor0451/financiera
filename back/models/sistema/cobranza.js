const Sequelize = require("sequelize");
const db = require("../../db/database");

module.exports = db.financieraSequelize.define(
    "cobranza",
    {
        idcobranza: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        idcliente: {
            type: Sequelize.DataTypes.INTEGER
        },

        idcredito: {
            type: Sequelize.DataTypes.INTEGER
        },
        idzona: {
            type: Sequelize.DataTypes.INTEGER
        },
        monto: {
            type: Sequelize.DataTypes.FLOAT
        },
        cuota: {
            type: Sequelize.DataTypes.INTEGER
        },
        fecha: {
            type: Sequelize.DataTypes.DATE
        },
        metodo_pago: {
            type: Sequelize.DataTypes.STRING
        },

        descripcion: {
            type: Sequelize.DataTypes.STRING
        },
        caja: {
            type: Sequelize.DataTypes.STRING
        },
        factura: {
            type: Sequelize.DataTypes.STRING
        },
        estado: {
            type: Sequelize.DataTypes.TINYINT
        },
        fecha_anulacion: {
            type: Sequelize.DataTypes.DATE
        },

    },
    {
        timestamps: false,
        freezeTableName: true
    },
    {
        tableName: "cobranza"
    }
);
