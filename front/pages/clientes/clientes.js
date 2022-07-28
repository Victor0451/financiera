import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layouts/Layout';
import jsCookie from 'js-cookie'
import axios from 'axios';
import toastr from 'toastr';
import { ip } from '../../config/config'
import ListadoClientes from '../../components/clientes/ListadoClientes';
import Spinner from '../../components/Layouts/Spinner'
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import { registrarHistoria, push } from '../../utils/funciones';

const Clientes = () => {

    let apellidoRef = React.createRef()
    let nombreRef = React.createRef()
    let dniRef = React.createRef()
    let direccionRef = React.createRef()
    let barrioRef = React.createRef()
    let telefonoRef = React.createRef()
    let codigoPostalRef = React.createRef()
    let fechaNacRef = React.createRef()
    let zonaRef = React.createRef()
    let apellidoConRef = React.createRef()
    let nombreConRef = React.createRef()
    let dniConRef = React.createRef()
    let descripcionRSRef = React.createRef()
    let direccionRSRef = React.createRef()
    let barrioRSRef = React.createRef()
    let telefonoRSRef = React.createRef()
    let localidadRef = React.createRef()


    const [user, guardarUsuario] = useState(null);
    const [row, guardarRow] = useState([]);
    const [zonas, guardarZonas] = useState([]);
    const [listado, guardarListado] = useState([]);
    const [conyugue, guardarConyugue] = useState([]);
    const [razonSoc, guardarRazonSoc] = useState([]);
    const [creditos, guardarCreditos] = useState([]);
    const [errores, guardarErrores] = useState(null)

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

            traerClientes()
            traerZonas()
        }
    }, [token]);


    const traerClientes = async () => {
        await axios.get(`${ip}api/clientes/listadoclientes`)
            .then(res => {
                if (res.status === 200) {
                    toastr.success("Se genero el listado de clientes", "ATENCION")
                    guardarListado(res.data)
                }
            }).catch(error => {
                console.log(error)
                toastr.error("Ocurrio un error al generar el listado", "ATENCION")
            })

    }

    const verCliente = async (row) => {

        await axios.get(`${ip}api/clientes/razonsocial/${row.idcliente}`)
            .then(res => {
                guardarRazonSoc(res.data)

                axios.get(`${ip}api/clientes/adherentes/${row.idcliente}`)
                    .then(res1 => {
                        guardarConyugue(res1.data)
                    })
                    .catch(error => {
                        console.log(error)
                        toastr.error("Ocurrio un error al traer al conyugue", "Atencion")
                    })

                traerCreditosActivos(row.idcliente)

            })
            .catch(error => {
                console.log(error)
                toastr.error("Ocurrio un error al traer la informacion", "Atencion")
            })

    }


    const traerZonas = async () => {
        await axios.get(`${ip}api/zonas/listadozonas`)
            .then(res => {
                guardarZonas(res.data)
            })
            .catch(error => {
                console.log(error)
                toastr.error("Ocurrio un error al generar las zonsas", "ATENCION")
            })
    }

    const registroCliente = async () => {

        guardarErrores(null)

        const reg = {
            apellido: apellidoRef.current.value,
            nombre: nombreRef.current.value,
            dni: dniRef.current.value,
            telefono: telefonoRef.current.value,
            direccion: direccionRef.current.value,
            cod_postal: codigoPostalRef.current.value,
            barrio: barrioRef.current.value,
            localidad: localidadRef.current.value,
            fecha_nacimiento: fechaNacRef.current.value,
            idzona: zonaRef.current.value,
            operador: user.usuario,
            fecha_carga: moment().format('YYYY-MM-DD')
        };

        const regCon = {
            idcliente: "",
            apellido: apellidoConRef.current.value,
            nombre: nombreConRef.current.value,
            dni: dniConRef.current.value
        };

        const regRS = {
            idcliente: "",
            razon_social: descripcionRSRef.current.value,
            direccion_legal: direccionRSRef.current.value,
            barrio_legal: barrioRSRef.current.value,
            tel_legal: telefonoRSRef.current.value
        };


        if (reg.apellido === "") {
            guardarErrores("Debes ingresar el apellido")
        } else if (reg.nombre === "") {
            guardarErrores("Debes ingresar el nombre")
        } else if (reg.dni === "") {
            guardarErrores("Debes ingresar el DNI")
        } else if (reg.direccion === "") {
            guardarErrores("Debes ingresar la direccion")
        } else if (reg.barrio === "") {
            guardarErrores("Debes ingresar el barrio")
        } else if (reg.localidad === "") {
            guardarErrores("Debes ingresar la localidad")
        } else if (reg.telefono === "") {
            guardarErrores("Debes ingresar el telefono")
        } else if (reg.idzona === "no") {
            guardarErrores("Debes ingresar la zona")
        } else {

            await axios.get(`${ip}api/clientes/existedni/${reg.dni}`)
                .then(res => {
                    if (res.data) {
                        toastr.warning(`El cliente ya esta registrado: ${res.data.apellido}, ${res.data.nombre}, DNI ${res.data.dni}`, "ATENCION")
                    } else {

                        axios.post(`${ip}api/clientes/nuevocliente`, reg)
                            .then(res => {
                                if (res.status === 200) {
                                    toastr.success("Se registro el cliente con exito", "ATENCION")

                                    traerClientes()

                                    let accion = `Se registro el cliente con el numero: ${res.data.idcliente} - ${res.data.apellido}, ${res.data.nombre}, DNI: ${res.data.dni}`

                                    registrarHistoria(res.data.idcliente, accion, user.usuario)

                                    if (regCon.apellido !== "") {
                                        regCon.idcliente = res.data.idcliente

                                        axios.post(`${ip}api/clientes/nuevoadherente`, regCon)
                                            .then(res => {
                                                if (res.status === 200) {
                                                    toastr.info("Se registro el conyugue al cliente", "ATENCION")
                                                }
                                            })
                                            .catch(error => {
                                                console.log(error)
                                                toastr.error("Ocurrio un error al registrar el conyugue al cliente", "ATENCION")
                                            })
                                    } else {
                                        toastr.info("Al cliente no se conyugue", "ATENCION")
                                    }

                                    if (regRS.razon_social !== "") {
                                        regRS.idcliente = res.data.idcliente

                                        axios.post(`${ip}api/clientes/nuevarazonsocial`, regRS)
                                            .then(res => {
                                                if (res.status === 200) {
                                                    toastr.info("Se registro la razon social al cliente", "ATENCION")
                                                }
                                            })
                                            .catch(error => {
                                                console.log(error)
                                                toastr.error("Ocurrio un error al registrar la razon social al cliente", "ATENCION")
                                            })

                                    } else {
                                        toastr.info("Al cliente no se le registro Razon Social", "ATENCION")
                                    }

                                }

                            })
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    const eliminarCliente = async (row) => {

        await confirmAlert({
            title: 'ATENCION',
            message: '¿Esta seguro que quieres eliminar al cliente?',
            buttons: [
                {
                    label: 'Si',
                    onClick: () => {
                        axios.delete(`${ip}api/clientes/eliminarcliente/${row.idcliente}`)
                            .then(res => {
                                if (res.status === 200) {
                                    toastr.success("El cliente se elimino con exito", "ATENCION")
                                    traerClientes()

                                    let accion = `Se elimino el cliente ${row.idcliente}: ${row.apellido}, ${row.nombre} - DNI: ${row.dni}`

                                    registrarHistoria(row.idcliente, accion, user.usuario)

                                }
                            })
                            .catch(error => {
                                console.log(error)
                                toastr.error("Ocurrio un error al eliminar al cliente", "ATENCION")
                            })
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        toastr.info("Se cancelo la accion, el cliente no fue eliminado", "ATENCION")
                    }
                }
            ]
        });

    }

    const traerCreditosActivos = async (id) => {

        await axios.get(`${ip}api/creditos/creditoscliente/${id}`)
            .then(res => {
                if (res.data) {
                    guardarCreditos(res.data)
                    toastr.info("El cliente posee creditos activos", "ATENCION")
                } else if (!res.data) {
                    toastr.info("El cliente no posee creditos activos", "ATENCION")
                }

            })
            .catch(error => {
                console.log(error)
                toastr.error("Ocurrio un error al buscar los creditos del cliente", "ATENCION")
            })

    }


    return (
        <Layout>

            {listado.length === 0 ? <Spinner />
                : (
                    <>
                        <ListadoClientes
                            listado={listado}
                            verCliente={verCliente}
                            eliminarCliente={eliminarCliente}
                            conyugue={conyugue}
                            razonSoc={razonSoc}
                            creditos={creditos}
                            apellidoRef={apellidoRef}
                            nombreRef={nombreRef}
                            dniRef={dniRef}
                            direccionRef={direccionRef}
                            barrioRef={barrioRef}
                            telefonoRef={telefonoRef}
                            fechaNacRef={fechaNacRef}
                            codigoPostalRef={codigoPostalRef}
                            zonaRef={zonaRef}
                            apellidoConRef={apellidoConRef}
                            nombreConRef={nombreConRef}
                            dniConRef={dniConRef}
                            descripcionRSRef={descripcionRSRef}
                            direccionRSRef={direccionRSRef}
                            barrioRSRef={barrioRSRef}
                            telefonoRSRef={telefonoRSRef}
                            localidadRef={localidadRef}
                            zonas={zonas}
                            registroCliente={registroCliente}
                            errores={errores}
                            push={push}
                        />


                    </>
                )
            }




        </Layout>
    )
}

export default Clientes
