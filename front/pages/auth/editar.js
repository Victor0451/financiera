import React, { useState, useEffect } from "react";
import Layout from "../../components/Layouts/Layout";
import EditarUsuario from "../../components/auth/EditarUsuario";
import axios from "axios";
import Router from "next/router";
import jsCookie from "js-cookie";
import toastr from "toastr";
import BuscarUsuario from "../../components/auth/BuscarUsuario";
import { ip } from '../../config/config'

const Editar = () => {
  let userRef = React.createRef();
  let nombreRef = React.createRef();
  let apellidoRef = React.createRef();
  let usuarioRef = React.createRef();
  let contrasenaRef = React.createRef();
  let codigoRef = React.createRef();
  let perfilRef = React.createRef();

  const [erroruser, guardarErrorUser] = useState(null);
  const [username, guardarUsername] = useState(null);

  let token = jsCookie.get("token");

  useEffect(() => {
    if (!token) {
      Router.push("/redirect");
    }
  }, [token]);

  const buscarUserName = async (e) => {
    e.preventDefault();
    if (userRef.current.value === "") {
      guardarErrorUser("Debes ingresar un nombre de usuario");
    } else {
      let id = userRef.current.value;

      await axios
        .get(`${ip}api/auth/operador/operador/${id}`)
        .then((res) => {
          if (res.data) {
            guardarUsername(res.data);
            toastr.success("Usuario encontrado", "ATENCION")
          } else {
            toastr.error("El usuario que buscas no se encuentra registrado")
          }

        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const editUsuario = async (e) => {
    e.preventDefault();

    const user = {
      usuario: usuarioRef.current.value,
      contrasena: contrasenaRef.current.value,
      nombre: nombreRef.current.value,
      apellido: apellidoRef.current.value,
      codigo: codigoRef.current.value,
      perfil: perfilRef.current.value,
    };

    if (user.codigo === '') {
      user.codigo = 0
    }

    await axios
      .put(
        `${ip}api/auth/operador/editar/${user.usuario}`,
        user
      )
      .then((res) => {

        if (res.status === 200) {
          toastr.success("Usuario editado con exito", "ATENCION");
        }
      })
      .catch((error) => {
        console.log(error);
        toastr.error("Ocurrio un error al editar el usuario", "ATENCION")
      });
  };

  return (
    <Layout>
      {!username ? (
        <BuscarUsuario
          erroruser={erroruser}
          userRef={userRef}
          buscarUserName={buscarUserName}
        />
      ) : (
        <EditarUsuario
          username={username}
          editUsuario={editUsuario}
          nombreRef={nombreRef}
          apellidoRef={apellidoRef}
          usuarioRef={usuarioRef}
          contrasenaRef={contrasenaRef}
          codigoRef={codigoRef}
          perfilRef={perfilRef}
        />
      )}
    </Layout>
  );
};

export default Editar;
