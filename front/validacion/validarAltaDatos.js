export default function validarAltaDatos(valores) {
  let errores = {};

  if (!valores.apellido) {
    errores.apellido = "El apellido es obligatorio";
  }

  if (!valores.nombre) {
    errores.nombre = "El nombre es obligatorio";
  }

  return errores;
}
