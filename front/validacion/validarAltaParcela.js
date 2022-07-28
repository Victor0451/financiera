export default function validarAltaParcela(valores) {
  let errores = {};



  if (!valores.cementerio) {
    errores.cementerio = "El cementerio es obligatorio";
  }

  if (!valores.parcela) {
    errores.parcela = "La parcela es obligatoria";
  }
  if (!valores.mza) {
    errores.mza = "La manzana es obligatoria";
  }

  if (!valores.lote) {
    errores.lote = "El lote es obligatoria";
  }

  return errores;
}