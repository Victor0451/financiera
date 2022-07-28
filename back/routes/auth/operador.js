const express = require("express");
const router = express.Router();
const operador = require("../../models/auth/operador");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

router.get("/operador/:id", (req, res, next) => {
  console.log(req.params.id);
  operador
    .findOne({
      where: { usuario: req.params.id },
    })
    .then((operador) => {
      res.status(200).json(operador);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/postoperador", (req, res, next) => {
  const { usuario, contrasena, apellido, nombre, perfil, estado } = req.body;

  //Validacion simple

  if (!usuario || !contrasena) {
    return res.status(400).json({ msg: "Todos los campos son obligatorios" });
  }

  const newOperador = {
    usuario,
    contrasena,
    nombre,
    apellido,
    perfil,
    estado,
  };

  // chek usuario existente
  operador
    .findOne({
      where: {
        usuario: usuario,
      },
    })
    .then((usuario) => {
      if (usuario) {
        res.status(400).json({ msg: "Usuario Existente" });
      } else {
        res.status(200).json({ msg: "Usuario creado con exito" });

        //Create salt & hash

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newOperador.contrasena, salt, (err, hash) => {
            if (err) throw err;
            newOperador.contrasena = hash;
            operador.create(newOperador).then((user) => {
              jwt.sign(
                { id: user.id },
                config.get("jwtSecret"),
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) throw err;
                  res.json({
                    token,
                    user: {
                      id: user.id,
                      usuario: user.usuario,
                      contrasena: user.contrasena,
                      nombre: user.nombre,
                      apellido: user.apellido,
                      perfil: user.perfil,
                      estado: user.estado,
                      createdAt: user.createdAt,
                      updatedAt: user.updatedAt,
                    },
                  });
                }
              );
            });
          });
        });
      }
    });
});

router.put("/editar/:id", (req, res, next) => {
  const { contrasena, apellido, nombre, perfil, codigo } = req.body;

  const OperadorEdit = {
    contrasena,
    nombre,
    apellido,
    perfil,
    codigo,
  };

  //Create salt & hash

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(OperadorEdit.contrasena, salt, (err, hash) => {
      if (err) throw err;
      OperadorEdit.contrasena = hash;
      operador.update(
        {
          nombre: OperadorEdit.nombre,
          apellido: OperadorEdit.apellido,
          perfil: OperadorEdit.perfil,
          codigo: OperadorEdit.codigo,
          estado: OperadorEdit.estado,
          contrasena: OperadorEdit.contrasena,
        },
        { where: { usuario: req.params.id } }
      )
        .then((operador) => {
          res.status(200).json(operador);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    });
  });
});

module.exports = router;
