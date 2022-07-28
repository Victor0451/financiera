const express = require("express");
const router = express.Router();
const zonas = require('../../models/sistema/zonas')


router.get("/listadozonas", (req, res) => {
    zonas
        .findAll()
        .then((listado) => res.json(listado))
        .catch((err) => res.json(err));
});




module.exports = router;
