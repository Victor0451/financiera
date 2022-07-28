const Sequelize = require("sequelize");
const db = require("../../db/database");

module.exports = db.financieraSequelize.define(
  "operador",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: Sequelize.DataTypes.STRING
    },
    apellido: {
      type: Sequelize.DataTypes.STRING
    },
    usuario: {
      type: Sequelize.DataTypes.STRING
    },
    contrasena: {
      type: Sequelize.DataTypes.STRING
    },
    perfil: {
      type: Sequelize.DataTypes.INTEGER
    },
    estado: {
      type: Sequelize.DataTypes.TINYINT
    },
    puestom: {
      type: Sequelize.DataTypes.INTEGER
    },
    puestow: {
      type: Sequelize.DataTypes.INTEGER
    },
    m: {
      type: Sequelize.DataTypes.TINYINT
    },
    w: {
      type: Sequelize.DataTypes.TINYINT
    },
    codigo: {
      type: Sequelize.DataTypes.INTEGER
    }
  },
  {
    timestamps: true,
    freezeTableName: true
  },
  {
    tableName: "operador"
  }
);
