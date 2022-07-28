const express = require("express");
const router = express.Router();
const noticias = require('../../models/sistema/noticias')


router.get("/noticias/:id", (req, res, next) => {
    noticias.findOne({
      where: { perfil: req.params.id },
      order: [["idnoticia", "DESC"]],
    })
      .then((noticias) => {
        res.status(200).json(noticias);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
  
  


router.post("/nuevanoticia", (req, res, next) => {
    const { fecha, noticia, operador, perfil } = req.body;
    const notii = {
        fecha,
        noticia,
        operador,
        perfil,
    };

    noticias.create(notii)
        .then((notii) => {
            res.status(200).json(notii);
        })
        .catch((err) => {
            console.log(err);
        });
});



module.exports = router;
