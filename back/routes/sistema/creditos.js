const express = require("express");
const router = express.Router();
const creditos = require('../../models/sistema/creditos')
const planCuotas = require('../../models/sistema/plan_cuotas')
const empleados = require('../../models/sistema/empleados')


router.get("/listadocreditos", (req, res) => {
    creditos
        .findAll()
        .then((listado) => res.json(listado))
        .catch((err) => res.json(err));
});

router.get("/existecredito/:id", (req, res) => {
    creditos
        .findOne({
            where: { idcredito: req.params.id }
        })
        .then((listado) => res.json(listado))
        .catch((err) => res.json(err));
});

router.get("/creditoscliente/:id", (req, res) => {
    creditos
        .findAll({
            where: { idcliente: req.params.id }
        })
        .then((listado) => res.json(listado))
        .catch((err) => res.json(err));
});

router.get("/listadoplancuotas", (req, res) => {
    planCuotas
        .findAll()
        .then((listado) => res.json(listado))
        .catch((err) => res.json(err));
});

router.get("/listadoempleados", (req, res) => {
    empleados
        .findAll()
        .then((listado) => res.json(listado))
        .catch((err) => res.json(err));
});


router.post("/nuevocredito", (req, res) => {

    const credito = {
        idcliente,
        prestamo,
        monto_final,
        monto_cuota,
        cant_cuota,
        monto_pagado,
        anticipo,
        vendedor,
        operador,
        fecha,
        idzona,
        estado,
    } = req.body

    creditos.create(credito)
        .then((listado) => res.json(listado))
        .catch((err) => res.json(err));

})

router.put("/puttotales/:id", (req, res) => {

    const datos = {
        monto_pagado,
        cuotas_pagadas,
        estado
    } = req.body

    creditos.update(
        datos, {
        where: { idcredito: req.params.id }
    })
        .then((listado) => res.json(listado))
        .catch((err) => res.json(err));

})


router.delete("/eliminarcredito/:id", (req, res) => {

    creditos.destroy({
        where: {
            idcredito: req.params.id
        }
    })
        .then((listado) => { res.json(listado) })
        .catch((err) => res.json(err));

})



module.exports = router;
