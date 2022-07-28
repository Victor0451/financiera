import React from "react";

const LoginUsuario = ({
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
    <div className="container ">
      <form
        className=" container mt-4 border border-dark p-5 col-md-6 bgbox "
        onSubmit={handleSubmit}
      >
        <h1 className="mb-4">
          <u>Login</u>
        </h1>
        <div className="row  ">
          <div className="form-group col-md-12">
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

          <div className="form-group col-md-12 mt-4">
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

          <div className="col-md-12 d-flex justify-content-end mt-4">
            <button type="submit" className="btn btn-primary btn-block mt-4">
              Ingresar
            </button>
          </div>
          {error && (
            <div className="mt-4 form-group text-center alert alert-danger border border-dark">
              {error}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
export default LoginUsuario;
