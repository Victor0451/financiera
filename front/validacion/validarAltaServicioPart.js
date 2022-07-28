export default function validarAltaServicio(valores) {
  let errores = {};

  if (!valores.dni) {
    errores.dni = "El dni es obligatorio";
  }
  if (!valores.nombre) {
    errores.nombre = "El nombre es obligatorio";
  }
  if (!valores.apellido) {
    errores.apellido = "El apellido es obligatorio";
  }
  if (!valores.edad) {
    errores.edad = "La edad es obligatorio";
  }
  if (!valores.fechafallecimiento) {
    errores.fechafallecimiento = "La fecha de fallecimiento es obligatorio";
  }
  if (!valores.lugarfallecimiento) {
    errores.lugarfallecimiento = "El lugar de fallecimiento es obligatorio";
  }

  if (!valores.casamortuaria) {
    errores.casamortuaria = "La casa mortuaria es obligatorio";
  }

  if (!valores.fechainhumacion) {
    errores.fechainhumacion = "La fecha de inhumacion es obligatorio";
  }

  if (!valores.horainhumacion) {
    errores.horainhumacion = "La hora de inhumacion es obligatorio";
  }

  if (!valores.cementerio) {
    errores.cementerio = "Este campo es obligatorio";
  }

  if (!valores.dni_solicitante) {
    errores.dni_solicitante = "El DNI del solicitante es obligatorio";
  }

  if (!valores.solicitado) {
    errores.solicitado = "El solicitante es obligatorio";
  }

  if (!valores.altura) {
    errores.altura = "La altura es obligatorio";
  }

  if (!valores.peso) {
    errores.peso = "El peso es obligatorio";
  }

  return errores;
}
