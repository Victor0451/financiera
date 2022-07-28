import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layouts/Layout';
import jsCookie from 'js-cookie'
import axios from 'axios';
import toastr from 'toastr';
import { ip, interest } from '../../config/config'
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import Router from "next/router";
import ListadoCreditos from '../../components/creditos/ListadoCreditos';
import { registrarHistoria, push } from '../../utils/funciones'

const Creditos = () => {

    let idClienteRef = React.createRef();
    let dniRef = React.createRef();
    let cuotasRef = React.createRef();
    let prestamoRef = React.createRef();
    let vendedorRef = React.createRef();
    let anticipoRef = React.createRef();
    let capDevRef = React.createRef()
    let cuoPrestRef = React.createRef()


    const [cuoprest, guardarCuoprest] = useState(null);
    const [capadev, guardarCapadev] = useState(null);
    const [flag, guardarFlag] = useState(false);
    const [user, guardarUsuario] = useState(null);
    const [row, guardarRow] = useState([]);
    const [listado, guardarListado] = useState([]);
    const [planCuotas, guardarPlanCuotas] = useState([]);
    const [empleados, guardarEmpleados] = useState([]);
    const [cliente, guardarCliente] = useState([]);
    const [creditosCliente, guardarCreditosCliente] = useState([]);
    const [info, guardarInfo] = useState(null);
    const [errores, guardarErrores] = useState(null);
    const [totalFinal, guardarTotalFinal] = useState(0);


    let token = jsCookie.get("token");

    useEffect(() => {
        if (!token) {
            Router.push("/redirect");
        } else {
            let usuario = jsCookie.get("usuario");

            if (usuario) {
                let userData = JSON.parse(usuario);
                guardarUsuario(userData);
            }

            traerCreditos()

            traerPlanCuotas()

            traerEmpleados()

        }
    }, []);

    const traerCreditos = async () => {
        await axios.get(`${ip}api/creditos/listadocreditos`)
            .then(res => {
                if (res.status === 200) {
                    toastr.success("Se genero el listado de creditos", "ATENCION")
                    guardarListado(res.data)
                }
            }).catch(error => {
                console.log(error)
                toastr.error("Ocurrio un error al generar el listado", "ATENCION")
            })

    }

    const traerPlanCuotas = async () => {
        await axios.get(`${ip}api/creditos/listadoplancuotas`)
            .then(res => {
                if (res.status === 200) {
                    guardarPlanCuotas(res.data)
                }
            }).catch(error => {
                console.log(error)
                toastr.error("Ocurrio un error al generar el listado", "ATENCION")
            })

    }

    const traerEmpleados = async () => {
        await axios.get(`${ip}api/creditos/listadoempleados`)
            .then(res => {
                if (res.status === 200) {
                    guardarEmpleados(res.data)
                }
            }).catch(error => {
                console.log(error)
                toastr.error("Ocurrio un error al generar el listado", "ATENCION")
            })

    }

    const buscarCreditosCliente = async (id) => {

        await axios.get(`${ip}api/creditos/creditoscliente/${id}`)
            .then(res => {
                if (res.data.length !== 0) {
                    toastr.info(`Cliente posee creditos activos sin cancelar, se debe analizar su situacion`, "ATENCION")
                    guardarInfo("Cliente posee creditos activos sin cancelar, se debe analizar su situacion")
                    guardarCreditosCliente(res.data)
                } else {
                    toastr.info("El cliente no posee creditos activos", "ATENCION")
                    guardarInfo("El cliente no posee creditos activos")
                }
            })
            .catch(error => {
                console.log(error)
                toastr.error("Ocurrio un error al buscar los creditos del cliente", "ATENCION")
            })

    }

    const buscarCliente = async () => {

        guardarErrores(null)

        if (idClienteRef.current.value === "" && dniRef.current.value === "") {
            toastr.warning("Debes ingresar el N° de cliente o el DNI para buscar al cliente", "ATENCION")
            guardarErrores("Debes ingresar el N° de cliente o el DNI para buscar al cliente")

        } else if (idClienteRef.current.value !== "" && dniRef.current.value !== "") {
            toastr.warning("No puedes buscar por N° de Cliente y DNI a la ves. Elige un dato y vuelve a intentarlo", "ATENCION")
            guardarErrores("No puedes buscar por N° de Cliente y DNI a la ves. Elige un dato y vuelve a intentarlo")

        } else if (idClienteRef.current.value !== "") {

            await axios.get(`${ip}api/clientes/existeidcliente/${idClienteRef.current.value}`)
                .then(res => {
                    if (res.data) {

                        toastr.success(`Cliente encontrado: ${res.data.apellido}, ${res.data.nombre}`, "ATENCION")
                        guardarCliente(res.data)
                        buscarCreditosCliente(res.data.idcliente)
                    } else {
                        toastr.info("El cliente solicitado no esta registrado", "ATENCION")
                        guardarCliente([])
                        guardarErrores("El cliente solicitado no esta registrado")
                    }
                })

        } else if (dniRef.current.value !== "") {

            await axios.get(`${ip}api/clientes/existedni/${dniRef.current.value}`)
                .then(res => {

                    if (res.data) {
                        toastr.success(`Cliente encontrado: ${res.data.apellido}, ${res.data.nombre}`, "ATENCION")

                        guardarCliente(res.data)
                        buscarCreditosCliente(res.data.idcliente)
                    } else {
                        toastr.info("El cliente solicitado no esta registrado", "ATENCION")
                        guardarCliente([])
                        guardarErrores("El cliente solicitado no esta registrado")
                    }
                })
        }

    }

    const calculoPrestamo = () => {
        //e.preventDefault();

        guardarFlag(false);

        let principal = parseInt(prestamoRef.current.value);

        let payments = parseInt(cuotasRef.current.value);
        let x = Math.pow(1 + interest, payments);
        let monthly = ((principal * x * interest) / (x - 1)).toFixed(0);

        guardarCuoprest(monthly);

        let capadev = monthly * payments;

        guardarCapadev(capadev);

        guardarFlag(true);

        guardarTotalFinal(capadev)
    };

    const verCredito = async (row) => {
        guardarRow(row)

        await axios.get(`${ip}api/clientes/existeidcliente/${row.idcliente}`)
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

    const calcTotalFinal = () => {

        guardarErrores(null)

        let anti = anticipoRef.current.value

        if (anti === "" || anti === 0) {

            guardarTotalFinal(capadev)

        } else if (anti > capadev) {

            guardarErrores("El anticipo no puede ser mayor que el capital a devolver")

            toastr.warning("El anticipo no puede ser mayor que el capital a devolver", "ATENCION")

            guardarTotalFinal(capadev)

        } else {


            let total = capadev - anti

            guardarTotalFinal(total)

            let nuCuoPrest = total / cuotasRef.current.value

            guardarCuoprest(nuCuoPrest.toFixed(2))

        }
    }

    const registrarCredito = async () => {

        guardarErrores(null)

        if (cliente.length === 0) {
            guardarErrores("Debes buscar al cliente para poder confeccionar el credito")
            toastr.warning("Debes buscar al cliente para poder confeccionar el credito", "ATENCION")
        } else {

            const credito = {
                idcliente: cliente.idcliente,
                prestamo: prestamoRef.current.value,
                monto_final: capDevRef.current.value,
                monto_cuota: cuoPrestRef.current.value,
                cant_cuota: cuotasRef.current.value,
                monto_pagado: 0,
                anticipo: anticipoRef.current.value,
                vendedor: vendedorRef.current.value,
                operador: user.usuario,
                fecha: moment().format('YYYY-MM-DD HH:mm:ss'),
                idzona: cliente.idzona,
                estado: 1
            }


            if (credito.vendedor === "no") {
                guardarErrores("Debes ingresar al vendedor del credito")
            } else if (credito.prestamo === "") {
                guardarErrores("Debes ingresar el monto del credito para poder confeccionarlo")
            } else if (credito.cant_cuota === "no") {
                guardarErrores("Debes ingresar el plan de cuotas del credito")
            } else if (!capadev) {
                guardarErrores("Debes calcular el credito para obtener el total final y la cuota del credito")
            } else {
                if (credito.anticipo === "") {
                    credito.anticipo = 0
                }

                if (credito.monto_final === "0") {
                    credito.monto_final = totalFinal
                }

                await axios.post(`${ip}api/creditos/nuevocredito`, credito)
                    .then(res => {
                        if (res.status === 200) {
                            toastr.success("Se registro el credito con exito", "ATENCION")

                            traerCreditos()

                            let accion = `Se registro el credito N° ${res.data.idcredito} al cliente ${res.data.idcliente}`

                            registrarHistoria(res.data.idcliente, accion, user.usuario)
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        toastr.error("Ocurrio un error al registrar el credito", "ATENCION")
                    })
            }
        }


    }

    const eliminarCredito = async () => {
        await confirmAlert({
            title: 'ATENCION',
            message: '¿Esta seguro que quieres eliminar el credito?',
            buttons: [
                {
                    label: 'Si',
                    onClick: () => {
                        axios.delete(`${ip}api/creditos/eliminarcredito/${row.idcredito}`)
                            .then(res => {
                                if (res.status === 200) {
                                    toastr.success("El credito se elimino con exito", "ATENCION")
                                    traerCreditos()

                                    let accion = `Se elimino el credito ${row.idcredito}, del cliente ${row.idcliente}`

                                    registrarHistoria(row.idcliente, accion, user.usuario)

                                }
                            })
                            .catch(error => {
                                console.log(error)
                                toastr.error("Ocurrio un error al eliminar al credito", "ATENCION")
                            })
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        toastr.info("Se cancelo la accion, el credito no fue eliminado", "ATENCION")
                    }
                }
            ]
        });
    }


    return (
        <Layout>

            <ListadoCreditos
                listado={listado}
                verCredito={verCredito}
                eliminarCredito={eliminarCredito}
                push={push}
                cliente={cliente}
                planCuotas={planCuotas}
                empleados={empleados}
                idClienteRef={idClienteRef}
                dniRef={dniRef}
                prestamoRef={prestamoRef}
                vendedorRef={vendedorRef}
                cuotasRef={cuotasRef}
                anticipoRef={anticipoRef}
                capDevRef={capDevRef}
                cuoPrestRef={cuoPrestRef}
                buscarCliente={buscarCliente}
                errores={errores}
                cuoprest={cuoprest}
                capadev={capadev}
                calculoPrestamo={calculoPrestamo}
                flag={flag}
                calcTotalFinal={calcTotalFinal}
                totalFinal={totalFinal}
                registrarCredito={registrarCredito}
                info={info}
                creditosCliente={creditosCliente}
            />

        </Layout>
    )
}

export default Creditos
