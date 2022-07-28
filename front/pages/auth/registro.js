import React, { useState, useEffect } from "react";
import Layout from "../../components/Layouts/Layout";
import RegistrarUsuario from "../../components/auth/RegistrarUsuario";
import axios from "axios";
import Router from "next/router";
import jsCookie from "js-cookie";
import toastr from "toastr";
import { ip } from '../../config/config'

// Validaciones
import useValidacion from "../../hooks/useValidacion";
import validarRegistro from "../../validacion/validarRegistro";
import userContext from "../../context/UserContext";

const STATE_INICIAL = {
  usuario: "",
  contrasena: "",
  nombre: "",
  apellido: "",
};

const Registro = () => {
  let token = jsCookie.get("token");

  useEffect(() => {
    if (!token) {
      Router.push("/redirect");
    }
  }, []);

  const [error, guardarError] = useState(false);

  const {
    valores,
    errores,
    handleChange,
    handleSubmit,
    handleBlur,
  } = useValidacion(STATE_INICIAL, validarRegistro, crearRegistro);

  const { nombre, apellido, usuario, contrasena } = valores;

  async function crearRegistro() {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      //Req body

      const body = JSON.stringify({
        usuario,
        contrasena,
        nombre,
        apellido,
        perfil: 1,
        estado: 1,
      });

      await axios.post(
        `${ip}api/auth/operador/postoperador`,
        body,
        config
      );

      toastr.success("Usuario creado exitosamente", "ATENCION");
    } catch (error) {
      console.log(error.response.data, error.response.status, "REGISTER_FAIL");
      guardarError(error.response.data.msg);
    }
  }

  return (
    <Layout>
      <RegistrarUsuario
        nombre={nombre}
        apellido={apellido}
        usuario={usuario}
        contrasena={contrasena}
        errores={errores}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleBlur={handleBlur}
        error={error}
      />
    </Layout>
  );
};

export default Registro;