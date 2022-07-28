import React, { useState, useEffect } from "react";
import NuevaNoticia from "../../components/noticias/NuevaNoticia";
import Layout from "../../components/Layouts/Layout";
import moment from "moment";
import axios from "axios";
import jsCookie from "js-cookie";
import toastr from "toastr";
import Router from "next/router";
import { ip } from "../../config/config";

// Validaciones
import useValidacion from "../../hooks/useValidacion";
import validarNoticia from "../../validacion/validarNoticia";

const STATE_INICIAL = {
  noticia: "",
};

const Nueva = () => {
  let token = jsCookie.get("token");

  useEffect(() => {
    if (!token) {
      Router.push("/redirect");
    }
  }, []);

  const operadorRef = React.createRef();
  const perfilRef = React.createRef();

  const [error, guardarError] = useState(false);

  const { valores, errores, handleChange, handleSubmit, handleBlur } =
    useValidacion(STATE_INICIAL, validarNoticia, nuevanoticia);

  const { noticia } = valores;

  async function nuevanoticia() {
    try {
      const noti = {
        operador: operadorRef.current.value,
        fecha: moment().format("YYYY-MM-DD HH:mm:ss"),
        noticia,
        perfil: perfilRef.current.value,
      };

      if (noti.perfil === "no") {
        guardarError("Debes elegir el perfil de quien vera la noticia");
      } else {
        await axios
          .post(`${ip}api/noticias/nuevanoticia`, noti)
          .then((res) => {
            if (res.status === 200) {
              toastr.success("La Noticia se registro con exito", "ATENCION");
            }
          });
      }
    } catch (error) {
      console.log(error.response.data, error.response.status, "LOGIN_FAIL");
      guardarError(error.response.data.msg);
      toastr.error(`Ocurrio un error al registrar la noticia ${error.response.data.msg}`, "ATENCION")
    }
  }

  let today = moment().format("DD/MM/YYYY HH:mm:ss");
  let usuario = jsCookie.get("usuario");

  return (
    <Layout>
      {!token ? null : (
        <div>
          <NuevaNoticia
            errores={errores}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleBlur={handleBlur}
            error={error}
            noticia={noticia}
            operadorRef={operadorRef}
            today={today}
            usuario={usuario}
            perfilRef={perfilRef}
            error={error}
          />
        </div>
      )}
    </Layout>
  );
};

export default Nueva;
