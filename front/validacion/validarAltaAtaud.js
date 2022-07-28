export default function validarAltaAtaud(valores) {
  let errores = {};

  if (!valores.nombre) {
    errores.nombre = "El nombre es obligatorio";
  }

  if (!valores.tipo) {
    errores.tipo = "El tipo es obligatoria";
  }
  if (!valores.medidas) {
    errores.medidas = "El medidas es obligatoria";
  }

  if (!valores.uso) {
    errores.uso = "El uso es obligatoria";
  }

  if (!valores.fabricante) {
    errores.fabricante = "El fabricante es obligatoria";
  }

  if (!valores.stock) {
    errores.stock = "El stock es obligatoria";
  }

  // if (!valores.observaciones) {
  //   errores.observaciones = "La observacion es obligatoria";
  // }
  return errores;
}
