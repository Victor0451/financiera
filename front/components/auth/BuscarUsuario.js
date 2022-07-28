import React from "react";

const BuscarUsuario = ({ erroruser, userRef, buscarUserName }) => {
  return (
    <div className="container border border-dark bgbox col-md-6 p-4 mt-4 ">
      <h3 className="mb-4">
        <strong>
          <u>Buscar Usuario</u>
        </strong>
      </h3>

      <div className="row border border-dark p-4 mt-4 ">

        <div className="form-group col-md-8 ">
          <label><u>Nombre de Usuario</u></label>
          <input
            type="text"
            className="form-control mt-2"
            placeholder="Usuario"
            name="usuario"
            ref={userRef}
          />
          {erroruser && (
            <div className="mt-2 form-group  alert alert-danger border border-dark text-center text-uppercase">
              {erroruser}
            </div>
          )}
        </div>
        <div className="form-group col-md-4 mt-2">
          <button
            className="btn btn-primary btn-block mt-4"
            onClick={buscarUserName}
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuscarUsuario;
