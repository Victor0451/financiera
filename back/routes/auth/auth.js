const express = require("express");
const router = express.Router();
const operador = require("../../models/auth/operador");
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

router.post("/authenticate", (req, res, next) => {
  const { usuario, contrasena } = req.body;

  //Validacion simple

  if (!usuario || !contrasena) {
    return res.status(400).json({ msg: "Todos los campos son obligatorios" });
  }

  // chek usuario existente
  operador
    .findOne({
      where: {
        usuario: usuario,
      },
    })
    .then((user) => {
      if (!user) {
        res.status(400).json({ msg: "Usuario Ingresado No Existe" });
      }

      if (user.estado === 0) {
        res.status(400).json({ msg: "Usuario Dado de Baja" });
      }

      //Validate password
      bcrypt.compare(contrasena, user.contrasena).then((isMatch) => {
        if (!isMatch) {
          res.status(400).json({ msg: "Credenciales Invalidas" });
        }
        {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.status(200).json({
                token,
                user: {
                  id: user.id,
                  usuario: user.usuario,
                  contrasena: user.contrasena,
                  perfil: user.perfil,
                  estado: user.estado,
                  puestom: user.puestom,
                  m: user.m,
                  puestow: user.puestow,
                  w: user.w,
                  codigo: user.codigo,
                  createdAt: user.createdAt,
                  updatedAt: user.updatedAt,
                },
              });
            }
          );
        }
      });
    });
});

router.get("/operador", auth, (req, res) => {
  operador
    .findByPk(req.user.id)

    .then((operador) => res.json(operador))
    .catch((err) => res.json(err));
});

module.exports = router;
