const express = require("express");
const router = express.Router();
const clientes = require('../../models/sistema/clientes')
const adherentes = require('../../models/sistema/adherentes')
const lugarTrabajo = require('../../models/sistema/lugar_trabajo')


// API DATOS CLIENTES

router.get("/listadoclientes", (req, res) => {
    clientes
        .findAll({
            order: [
                ['idcliente', 'DESC']
            ],

        })
        .then((listado) => res.json(listado))
        .catch((err) => res.json(err));
});

router.get("/existedni/:id", (req, res) => {
    clientes
        .findOne({
            where: { dni: req.params.id }
        })
        .then((listado) => res.json(listado))
        .catch((err) => res.json(err));
});

router.get("/existeidcliente/:id", (req, res) => {
    clientes
        .findOne({
            where: { idcliente: req.params.id }
        })
        .then((listado) => res.json(listado))
        .catch((err) => res.json(err));
});

router.post("/nuevocliente", (req, res) => {

    const reg = {
        apellido,
        nombre,
        dni,
        telefono,
        direccion,
        cod_postal,
        barrio,
        localidad,
        fecha_nacimiento,
        idzona,
        operador,
    } = req.body

    clientes.create(reg)
        .then((listado) => res.json(listado))
        .catch((err) => res.json(err));

})

router.delete("/eliminarcliente/:id", (req, res) => {

    clientes.destroy({
        where: {
            idcliente: req.params.id
        }
    })
        .then((listado) => {
            res.json(listado)

            adherentes.destroy({
                where: {
                    idcliente: req.params.id
                }
            })
                .then((listado) => res.json(listado))
                .catch((err) => res.json(err));

            lugarTrabajo.destroy({
                where: {
                    idcliente: req.params.id
                }
            })
                .then((listado) => res.json(listado))
                .catch((err) => res.json(err));

        })
        .catch((err) => res.json(err));

})


// API CONYUGUE

router.get("/adherentes/:id", (req, res) => {
    adherentes
        .findAll({
            where: { idcliente: req.params.id }
        })
        .then((listado) => res.json(listado[0]))
        .catch((err) => res.json(err));
});

router.post("/nuevoadherente", (req, res) => {

    const regCon = {
        idcliente,
        apellido,
        nombre,
        dni,
    } = req.body

    adherentes.create(regCon)
        .then((listado) => res.json(listado))
        .catch((err) => res.json(err));

})

// API RAZON SOC

router.get("/razonsocial/:id", (req, res) => {
    lugarTrabajo
        .findAll({
            where: { idcliente: req.params.id }
        })
        .then((listado) => res.json(listado[0]))
        .catch((err) => res.json(err));
});

router.post("/nuevarazonsocial", (req, res) => {

    const regRS = {
        idcliente,
        razon_social,
        direccion_legal,
        barrio_legal,
        tel_legal,
    } = req.body

    lugarTrabajo.create(regRS)
        .then((listado) => res.json(listado))
        .catch((err) => res.json(err));

})


module.exports = router;
