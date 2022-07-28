import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layouts/Layout';
import jsCookie from 'js-cookie'
import axios from 'axios';
import toastr from 'toastr';
import { ip } from '../../config/config'
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import { useRouter } from 'next/router'
import FormCobranzaCreditos from '../../components/cobranza/FormCobranzaCreditos';
import { registrarHistoria } from '../../utils/funciones'

const Cobranza = () => {

    let montoRef = React.createRef()
    let cuotaRef = React.createRef()
    let metodoCobranzaRef = React.createRef()
    let descripcionRef = React.createRef()

    const [user, guardarUsuario] = useState(null)
    const [cliente, guardarCliente] = useState([])
    const [credito, guardarCredito] = useState([])
    const [cobranza, guardarCobranza] = useState([])
    const [cuoPag, guardarCuoPag] = useState(0)
    const [nupagos, guardarNuPagos] = useState([])


    let token = jsCookie.get("token");
    let router = useRouter();

    const idcliente = router.query.idcliente;
    const idcredito = router.query.idcredito;

    useEffect(() => {
        if (!token) {
            Router.push("/redirect");
        } else {
            let usuario = jsCookie.get("usuario");

            if (usuario) {
                let userData = JSON.parse(usuario);
                guardarUsuario(userData);
            }

            traeCliente(idcliente)

            traeCredito(idcredito)

            traeCobranza(idcredito)

        }
    }, [token]);


    const traeCliente = async (id) => {

        await axios.get(`${ip}api/clientes/existeidcliente/${id}`)
            .then(res => {
                if (res.data) {
                    guardarCliente(res.data)
                } else {
                    toastr.info("El cliente solicitado no esta registrado", "ATENCION")
                    guardarErrores("El cliente solicitado no esta registrado")
                }
            })
            .catch(error => {
                console.log(error)
                toastr.error("Ocurrio un error al traer el credito")
            })
    }

    const traeCredito = async (id) => {

        await axios.get(`${ip}api/creditos/existecredito/${id}`)
            .then(res => {
                if (res.data) {
                    guardarCredito(res.data)
                } else {
                    toastr.warning("El credito solicitado no esta registrado", "ATENCION")
                }
            })
            .catch(error => {
                console.log(error)
                toastr.error("Ocurrio un error al traer el credito")
            })
    }

    const traeCobranza = async (id) => {

        await axios.get(`${ip}api/cobranza/cobranzacredito/${id}`)
            .then(res => {
                if (res.data) {
                    guardarCobranza(res.data)
                    guardarCuoPag(res.data.length)
                } else {
                    toastr.warning("El credito solicitado no esta registrado", "ATENCION")
                }
            })
            .catch(error => {
                console.log(error)
                toastr.error("Ocurrio un error al traer la cobranza")
            })
    }

    const preCargarCobranza = () => {

        let cuo = nupagos.length + cobranza.length

        const precarga = {
            idcredito: credito.idcredito,
            idcliente: cliente.idcliente,
            fecha: moment().format('YYYY-MM-DD HH:mm:ss'),
            monto: montoRef.current.value,
            cuota: cuotaRef.current.value,
            metodo_pago: metodoCobranzaRef.current.value,
            descripcion: descripcionRef.current.value,
            idzona: cliente.idzona,
            estado: 1
        };

        console.log(precarga)


        if (precarga.monto === "") {
            toastr.warning("Debes ingresar el monto a cobrar", "ATENCION");
        } else if (precarga.cuota === "") {
            toastr.warning("Debes ingresar la cuota a cobrar", "ATENCION");
        } else if (cuo === credito.cant_cuota) {
            toastr.info("Con las cuotas precargadas, el cliente ya completo su plan de pagos acordado en el credito", "ATENCION")
        } else {

            let encontrado = false

            if (nupagos.length === 0) {
                toastr.success("Pago pre cargado exitosamente", "ATENCION");
                guardarNuPagos([...nupagos, precarga]);
            } else {

                for (let i = 0; i < nupagos.length; i++) {
                    if (nupagos[i].cuota === cuotaRef.current.value) {
                        encontrado = true;
                    }
                }
                if (encontrado === true) {
                    toastr.warning("La cuota ingresada ya exitse", "ATENCION");
                } else if (encontrado === false) {
                    toastr.success("Pago pre cargado exitosamente", "ATENCION");
                    guardarNuPagos([...nupagos, precarga]);

                }
            }


        }
    };

    const limpiarPrePagos = () => {

        if (nupagos.length === 0) {
            toastr.info("La precarga esta vacia", "ATENCION")
        } else {

            guardarNuPagos([])
            toastr.success("Precarga Borrada", "ATENCION")

        }
    }

    const totalPagosPrecargados = (arr) => {

        let total = 0;

        for (let i = 0; i < arr.length; i++) {
            total += parseFloat(arr[i].monto);
        }

        return total.toFixed(2);
    };

    const eliminarPagoPrecargado = (index) => {
        nupagos.splice(index, 1);

        guardarNuPagos([...nupagos]);
    };

    const putDatosCredito = async () => {

        let cuo = nupagos.length + cobranza.length

        const datos = {
            monto_pagado: totalCobranza(nupagos) + credito.monto_pagado,
            cuotas_pagadas: cuo,
            estado: 1
        }

        if (credito.cant_cuota === cuo) {
            datos.estado = 0
        }

        console.log(datos)
        await axios.put(`${ip}api/creditos/puttotales/${credito.idcredito}`, datos)
            .then(res => {
                if (res.status === 200) {
                    toastr.success("Se actualizaron los datos del credito", "ATENCION")
                }
            })
            .catch(error => {
                console.log(error)
                toastr.error("Ocurrio un error al actualizar los datos del credito", "ATENCION")
            })
    }

    const registrarPagosCredito = async () => {

        if (nupagos.length === 0) {
            toastr.info("No se precargo ningun pago, por ende no se registrara nada", "ATENCION")

        } else if (nupagos.length > 0) {

            await axios.post(`${ip}api/cobranza/regpagoscredito`, nupagos)
                .then(res => {

                    if (res.status === 200) {
                        toastr.success("Se acredito el pago correctamente", "ATENCION")

                        let accion = `Se acredito la cobranza del credito ${credito.idcredito}, del cliente ${cliente.idcliente}`

                        registrarHistoria(cliente.idcliente, accion, user.usuario)

                        putDatosCredito()


                        setTimeout(() => {
                            traeCobranza(credito.idcredito)

                            traeCredito(credito.idcredito)
                        }, 500);

                    }
                })
                .catch(error => {
                    console.log(error)
                    toastr.error("Ocurrio un error al acreditar el pago", "ATENCION")
                })
        }
    }

    const totalCobranza = (arr) => {
        let total = 0

        for (let i = 0; i < arr.length; i++) {
            total += parseFloat(arr[i].monto)
        }

        return parseFloat(total)
    }

    return (
        <Layout>

            <FormCobranzaCreditos
                cliente={cliente}
                credito={credito}
                cobranza={cobranza}
                cuoPag={cuoPag}
                totalCobranza={totalCobranza}
                preCargarCobranza={preCargarCobranza}
                nupagos={nupagos}
                montoRef={montoRef}
                cuotaRef={cuotaRef}
                metodoCobranzaRef={metodoCobranzaRef}
                descripcionRef={descripcionRef}
                limpiarPrePagos={limpiarPrePagos}
                eliminarPagoPrecargado={eliminarPagoPrecargado}
                totalPagosPrecargados={totalPagosPrecargados}
                registrarPagosCredito={registrarPagosCredito}

            />

        </Layout>
    )
}

export default Cobranza
