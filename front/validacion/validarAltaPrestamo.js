export default function validarAltaPrestamo(valores) {
  let errores = {};

  if (!valores.contrato) {
    errores.contrato = "El numero de socio es obligatorio";
  }
  if (!valores.legajo) {
    errores.legajo = "El numero de legajo es obligatorio";
  }

  if (!valores.neto) {
    errores.neto = "El sueldo neto es obligatorio";
  }

  if (!valores.anti) {
    errores.anti = "La antiguedad es obligatorio";
  }

  return errores;
}
