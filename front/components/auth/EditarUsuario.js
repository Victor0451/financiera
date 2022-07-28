import React from "react";
import Spinner from "../Layouts/Spinner";
import Link from "next/link";

const EditarUsuario = ({
  username,
  nombreRef,
  apellidoRef,
  usuarioRef,
  contrasenaRef,
  codigoRef,
  perfilRef,
  editUsuario,
}) => {
  if (!username) return <Spinner />;

  return (
    <div className="container border border-dark bgbox mt-4 p-4">
      <h1 className="  mb-4">
        <strong>
          <u>Editar de Usuarios</u>
        </strong>
      </h1>

      <form className=" mt-4 " onSubmit={editUsuario}>
        <div className="row border border-dark p-4">
          <div className="form-group col-md-6">
            <label><u>Usuario</u></label>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Usuario"
              name="usuario"
              defaultValue={username.usuario}
              ref={usuarioRef}
            />
          </div>

          <div className="form-group col-md-6">
            <label><u>Contraseña</u></label>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Contrasena"
              name="contrasena"
              defaultValue={username.contrasena}
              ref={contrasenaRef}
            />
          </div>

          <div className="form-group col-md-6 mt-4">
            <label><u>Nombre</u></label>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Nombre"
              name="nombre"
              defaultValue={username.nombre}
              ref={nombreRef}
            />
          </div>

          <div className="form-group col-md-6 mt-4">
            <label><u>Apellido</u></label>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Apellido"
              name="apellido"
              defaultValue={username.apellido}
              ref={apellidoRef}
            />
          </div>

          <div className="form-group col-md-6 mt-4">
            <label><u>Prerfil</u></label>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Prerfil"
              name="apellido"
              defaultValue={username.perfil}
              ref={perfilRef}
            />
          </div>

          <div className="form-group col-md-6 mt-4">
            <label><u>Codigo</u></label>
            <input
              type="number"
              className="form-control mt-2"
              placeholder="Codigo"
              name="apellido"
              defaultValue={username.codigo}
              ref={codigoRef}

            />
          </div>
        </div>
        <div className="col-md-12 d-flex justify-content-end">
          <button type="submit" className="btn btn-primary  btn-block mt-4 me-2">
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

export default EditarUsuario;
