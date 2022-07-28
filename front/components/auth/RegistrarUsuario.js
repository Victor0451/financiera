import React from "react";
import Link from "next/link";

const RegistrarUsuario = ({
  handleChange,
  handleSubmit,
  handleBlur,
  nombre,
  apellido,
  usuario,
  contrasena,
  errores,
  error,
}) => {
  return (
    <div className="container border border-dark bgbox mt-4 p-4">
      <h4 className="  mb-4">
        <strong>
          <u>Registro de Usuarios</u>
        </strong>
      </h4>

      <form className=" mt-4 " onSubmit={handleSubmit}>
        <div className="row border border-dark p-4">
          <div className="form-group col-md-6 ">
            <label><u>Usuario</u></label>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Usuario"
              name="usuario"
              value={usuario}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errores.usuario && (
              <div className="mt-2 form-group  alert alert-danger">
                {errores.usuario}
              </div>
            )}
          </div>

          <div className="form-group col-md-6 ">
            <label><u>Contraseña</u></label>
            <input
              type="password"
              className="form-control mt-2"
              placeholder="Contrasena"
              name="contrasena"
              value={contrasena}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errores.contrasena && (
              <div className="mt-2 form-group  alert alert-danger">
                {errores.contrasena}
              </div>
            )}
          </div>

          <div className="form-group col-md-6 mt-4">
            <label><u>Nombre</u></label>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Nombre"
              name="nombre"
              value={nombre}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errores.nombre && (
              <div className="mt-2 form-group  alert alert-danger">
                {errores.nombre}
              </div>
            )}
          </div>

          <div className="form-group col-md-6 mt-4">
            <label><u>Apellido</u></label>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Apellido"
              name="apellido"
              value={apellido}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errores.apellido && (
              <div className="mt-2 form-group  alert alert-danger">
                {errores.apellido}
              </div>
            )}
          </div>

          {error && (
            <div className="mt-4 mb-4 form-group text-center alert alert-danger">
              {error}
            </div>
          )}
        </div>

        <div className="col-md-12 d-flex justify-content-end">
          <button type="submit" className="btn btn-primary btn-block mt-4 me-2">
            Registrar
          </button>

          <Link href="/">
            <a className="btn btn-danger  btn-block mt-4">
              Cancelar
            </a>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegistrarUsuario;