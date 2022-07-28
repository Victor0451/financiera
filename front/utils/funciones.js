import moment from "moment"
import axios from "axios"
import { ip } from '../config/config'
import toastr from "toastr"
import Router from "next/router"

export const registrarHistoria = async (id, accion, user) => {

    const historial = {
        operador: user,
        fecha: moment().format('YYYY-MM-DD HH:mm:ss'),
        accion: accion,
        idcliente: id
    }

    await axios.post(`${ip}api/historialcliente/reghistorial`, historial)
        .then(res => {

            if (res.status === 200) {
                toastr.info("Esta accion se registor en el historial", "ATENCION")
            }
        })
        .catch(error => {
            console.log(error)
            toastr.error("Ocurrio un error al registrar la accion en el historial", "ATENCION")
        })

}

export const push = (url, p1, p2) => {

    Router.push({
        pathname: url,
        query: {
            idcliente: p1,
            idcredito: p2,
        },
    });


};