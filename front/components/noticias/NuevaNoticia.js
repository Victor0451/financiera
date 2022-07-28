import React from "react";
import Link from "next/link";

const NuevaNoticia = ({
  errores,
  handleChange,
  handleSubmit,
  handleBlur,
  error,
  noticia,
  operadorRef,
  perfilRef,
  today,
  usuario,
}) => {
  let userData = JSON.parse(usuario);

  return (
    <div className="container mt-4 border border-dark bgbox p-4 ">
      <div className="">
        <h3 className="">
          <u>Ingresar Noticia</u>
        </h3>
        <form className="mt-4 " onSubmit={handleSubmit}>
          <div className="row border border-dark  p-4">
            <div className="col-md-4">
              <label><u>Fecha</u></label>
              <input
                type="text"
                className="form-control mt-2"
                value={today}
                name="fecha"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="col-md-4 ">
              <label><u>Operador</u></label>
              <input
                type="text"
                className="form-control mt-2"
                readOnly
                name="operador"
                ref={operadorRef}
                value={userData.usuario}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="col-md-4 ">
              <label><u>Perfil</u></label>
              <select className="form-select mt-2" ref={perfilRef}>
                <option value="no" selected>
                  Dirigida a...
                </option>
                <option value="1">Administracion</option>
                <option value="2">Vendedores</option>
              </select>
            </div>
            <div className="col-md-12 mt-4">
              <label><u>Noticia</u></label>
              <textarea
                className="form-control mt-2"
                placeholder="Nueva Noticia"
                rows="3"
                name="noticia"
                value={noticia}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {errores.noticia && (
                <div className="mt-2 form-group  alert alert-danger">
                  {errores.noticia}
                </div>
              )}
            </div>
          </div>

          {error ? (
            <div className="mt-4 mb-4 alert alert-danger border border-dark text-center text-uppercase">
              {error}
            </div>
          ) : null}

          <div className="col-md-12 d-flex justify-content-end">
            <button type="submit" className="btn btn-primary mt-4 me-2 btn-block">
              Registrar Noticia
            </button>
            <Link href="/">
              <a className="btn btn-danger  btn-block mt-4">
                Cancelar
              </a>
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
};

export default NuevaNoticia;
