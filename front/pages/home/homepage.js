import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layouts/Layout';
import jsCookie from 'js-cookie'
import Router from 'next/router';
import Novedades from '../../components/Layouts/Novedades';
import Botones from '../../components/Layouts/Botones';
import axios from 'axios';
import { ip } from '../../config/config'
import HomeScreen from '../../components/home/HomeScreen';

const Homepage = () => {

    const [user, guardarUsuario] = useState(null);
    const [noticia, guardarNoticia] = useState(null);

    let token = jsCookie.get("token");

    useEffect(() => {
        if (!token) {
            Router.push("/redirect");
        } else {
            let usuario = jsCookie.get("usuario");

            if (usuario) {
                let userData = JSON.parse(usuario);
                guardarUsuario(userData);

                mostarNoticias(userData.perfil)

            }

        }
    }, []);



    const mostarNoticias = async (perfil) => {
        await axios
            .get(`${ip}api/noticias/noticias/${perfil}`)
            .then((res) => {
                guardarNoticia(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <Layout>

            <HomeScreen />

            {/* // <Novedades noticia={noticia} />

            // <Botones /> */}

        </Layout>
    )
}

export default Homepage
