export default function validarGastoServicio(valores) {
  let errores = {};

  if (!valores.hsinicio) {
    errores.hsinicio = "La hora de inicio es obligatoria";
  }
  if (!valores.hsfin) {
    errores.hsfin = "La hora de fin es obligatoria";
  }

  if (!valores.tipogasto) {
    errores.tipogasto = "El tipo de gasto es obligatorio";
  }

  if (!valores.operador) {
    errores.operador = "El operador es obligatorio";
  }

  return errores;
}
