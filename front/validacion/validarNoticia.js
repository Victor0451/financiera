export default function validarNoticia(valores) {
    let errores = {};



    if (!valores.noticia) {
        errores.noticia = "La noticia es obligatoria";
    }


    return errores;
}
