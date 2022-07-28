export default function validarAltaNovell(valores) {
  let errores = {};

  if (!valores.servicio) {
    errores.servicio = "El servicio es obligatorio";
  }

  if (!valores.monto) {
    errores.monto = "El monto es obligatorio";
  }
  if (!valores.montoletra) {
    errores.montoletra = "El monto es obligatorio";
  }

  if (!valores.anticipo) {
    errores.anticipo = "El anticipo es obligatorio";
  }

  if (!valores.cuota) {
    errores.cuota = "Las cuotas del saldo son obligatorias";
  }

  if (!valores.gastosadm) {
    errores.gastosadm = "El gasto administrativo es obligatorio";
  }

  if (!valores.apellidosol) {
    errores.apellidosol = "El apellido del solicitante es obligatorio";
  }

  if (!valores.nombresol) {
    errores.nombresol = "El nombre del solicitante es obligatorio";
  }
  if (!valores.dnisol) {
    errores.dnisol = "El dni del solicitante es obligatorio";
  }
  if (!valores.estcivilsol) {
    errores.estcivilsol = "El estado civil del solicitante es obligatorio";
  }
  if (!valores.fecnacsol) {
    errores.fecnacsol = "La fecha de nacimiento del solicitante es obligatorio";
  }
  if (!valores.domsol) {
    errores.domsol = "El domicilio del solicitante es obligatorio";
  }
  if (!valores.domnumsol) {
    errores.domnumsol = "El numero del solicitante es obligatorio";
  }

  //   if (!valores.pisosol) {
  //     errores.pisosol = "El piso del solicitante es obligatorio";
  //   }
  if (!valores.barriosol) {
    errores.barriosol = "El barrio del solicitante es obligatorio";
  }
  if (!valores.localidadsol) {
    errores.localidadsol = "La localidad del solicitante es obligatorio";
  }
  if (!valores.codpostalsol) {
    errores.codpostalsol = "El codigo postal del solicitante es obligatorio";
  }

  if (!valores.telefonosol) {
    errores.telefonosol = "El telefono del solicitante es obligatorio";
  }
  if (!valores.movilsol) {
    errores.movilsol = "El celular del solicitante es obligatorio";
  }

  if (!valores.apellidoben) {
    errores.apellidoben = "El apellido del beneficiario es obligatorio";
  }

  if (!valores.nombreben) {
    errores.nombreben = "El nombre del beneficiario es obligatorio";
  }
  if (!valores.dniben) {
    errores.dniben = "El dni del beneficiario es obligatorio";
  }
  if (!valores.estcivilben) {
    errores.estcivilben = "El estado civil del beneficiario es obligatorio";
  }
  if (!valores.fecnacben) {
    errores.fecnacben =
      "La fecha de nacimiento del beneficiario es obligatorio";
  }
  if (!valores.domben) {
    errores.domben = "El domicilio del beneficiario es obligatorio";
  }
  if (!valores.domnumben) {
    errores.domnumben = "El numero del beneficiario es obligatorio";
  }

  //   if (!valores.pisoben) {
  //     errores.pisoben = "El piso del beneficiario es obligatorio";
  //   }

  if (!valores.barrioben) {
    errores.barrioben = "El barrio del beneficiario es obligatorio";
  }
  if (!valores.localidadben) {
    errores.localidadben = "La localidad del beneficiario es obligatorio";
  }
  if (!valores.codpostalben) {
    errores.codpostalben = "El codigo postal del beneficiario es obligatorio";
  }

  if (!valores.nacionalidadsol) {
    errores.nacionalidadsol = "La nacionalidad del solicitante es obligatorio";
  }

  if (!valores.nacionalidadben) {
    errores.nacionalidadben = "La nacionalidad del beneficiario es obligatorio";
  }

  if (!valores.montosaldo) {
    errores.montosaldo = "El monto del saldo es obligatorio";
  }
  if (!valores.montosaldoletra) {
    errores.montosaldoletra = "El monto del saldo es obligatorio";
  }

  if (!valores.cuotamantenimiento) {
    errores.cuotamantenimiento = "La cuota de mantenimiento es obligatorio";
  }

  if (!valores.telefonoben) {
    errores.telefonoben = "El telefono del beneficiario es obligatorio";
  }
  if (!valores.movilben) {
    errores.movilben = "El celular del beneficiario es obligatorio";
  }

  return errores;
}
