import React, { useState } from "react";
import Layout from "../components/Layouts/Layout";
import LoginUsuario from "../components/auth/LoginUsuario";
import axios from "axios";
import Router from "next/router";
import jsCookie from "js-cookie";
import { ip } from "../config/config";


// Validaciones
import useValidacion from "../hooks/useValidacion";
import validarIniciarSession from "../validacion/validarIniciarSession";

const STATE_INICIAL = {
  usuario: "",
  contrasena: "",
};

const Index = () => {

  const [error, guardarError] = useState(false);

  const { valores, errores, handleChange, handleSubmit, handleBlur } =
    useValidacion(STATE_INICIAL, validarIniciarSession, iniciarSession);

  const { usuario, contrasena } = valores;

  async function iniciarSession() {
    try {
      //headers
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      //Req body

      const body = JSON.stringify({ usuario, contrasena });

      await axios.post(`${ip}api/auth/auth/authenticate`, body, config).then((res) => {
        const usuario = res.data.user;

        jsCookie.set("token", res.data.token);
        jsCookie.set("usuario", JSON.stringify(usuario));

        Router.push("/home/homepage");

      });
    } catch (error) {
      console.log(error.response.data, error.response.status, "LOGIN_FAIL");
      guardarError(error.response.data.msg);
    }
  }

  let token = jsCookie.get("token");

  if (token) {
    Router.push("/home/homepage");
  }

  return (
    <Layout>
      <LoginUsuario
        usuario={usuario}
        contrasena={contrasena}
        errores={errores}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleBlur={handleBlur}
        error={error}
      />
    </Layout>
  )
}

export default Index
