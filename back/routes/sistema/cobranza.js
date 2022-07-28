const express = require("express");
const router = express.Router();
const cobranza = require('../../models/sistema/cobranza')


router.get("/cobranzacredito/:id", (req, res) => {
    cobranza
        .findAll({
            where: { idcredito: req.params.id, estado: 1 }
        })
        .then((listado) => res.json(listado))
        .catch((err) => res.json(err));
});

router.post("/regpagoscredito", (req, res) => {

    const nupagos = {
        idcredito,
        idcliente,
        fecha,
        monto,
        cuota,
        metodo_pago,
        descripcion,
        idzona,
        estado
    } = req.body

    for (let i = 0; i < nupagos.length; i++) {
        cobranza
            .create({
                idcliente: nupagos[i].idcliente,
                idcredito: nupagos[i].idcredito,
                fecha: nupagos[i].fecha,
                monto: nupagos[i].monto,
                cuota: nupagos[i].cuota,
                metodo_pago: nupagos[i].metodo_pago,
                descripcion: nupagos[i].descripcion,
                idzona: nupagos[i].idzona,
                estado: nupagos[i].estado
            })
            .then((listado) => res.json(listado))
            .catch((err) => res.json(err));
    }

});



module.exports = router;
