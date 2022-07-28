const express = require("express");
const router = express.Router();
const historialClientes = require('../../models/historial/historial_clientes')


router.post("/reghistorial", (req, res) => {

    const historial = {
        operador,
        fecha,
        accion,
    } = req.body

    historialClientes
        .create(historial)
        .then((listado) => res.json(listado))
        .catch((err) => res.json(err));
});




module.exports = router;
