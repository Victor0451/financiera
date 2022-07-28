import React, { useMemo } from "react";
import toastr from "toastr";
import DataTable from "react-data-table-component";
import FilterComponent from "../Layouts/FilterComponent";
import {
    Box,
    Container,
    Heading,
    Text,
    Stack,
    Alert,
    AlertIcon,
    AlertDescription,
    AlertTitle,
    Button,

} from '@chakra-ui/react';
import moment from "moment";
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import ModalVista from "./ModalVista";
import ModalRegistro from "./ModalRegistro";


const ListadoClientes = ({
    listado,
    verCliente,
    eliminarCliente,
    conyugue,
    razonSoc,
    creditos,
    apellidoRef,
    nombreRef,
    dniRef,
    direccionRef,
    barrioRef,
    telefonoRef,
    fechaNacRef,
    codigoPostalRef,
    zonaRef,
    apellidoConRef,
    nombreConRef,
    dniConRef,
    descripcionRSRef,
    direccionRSRef,
    barrioRSRef,
    telefonoRSRef,
    localidadRef,
    zonas,
    registroCliente,
    errores,
    push
}) => {

    const columns = [

        {
            name: "N° Cliente",
            selector: row => `${row.idcliente}`,
            sortable: true,
            grow: 0.4
        },

        {
            name: "Apellido",
            selector: row => `${row.apellido}`,
            sortable: true,
            grow: 0.5
        },

        {
            name: "Nombre",
            selector: row => `${row.nombre}`,
            sortable: true,
            grow: 0.5
        },

        {
            name: "DNI",
            selector: row => `${row.dni}`,
            sortable: true,
            grow: 0.4
        },

        {
            name: "Telefono",
            selector: row => `${row.telefono}`,
            sortable: true,

        },
        {
            name: "acciones",
            button: true,
            cell: row =>
            (
                <>

                    <ModalVista
                        row={row}
                        verCliente={verCliente}
                        conyugue={conyugue}
                        razonSoc={razonSoc}
                        creditos={creditos}
                        push={push}
                    />

                    <Button
                        colorScheme="yellow"
                        size='xs'
                        mr={1}
                        onClick={() => {
                            toastr.warning("Modulo en proceso de programacion", "ATENCION")
                        }}
                    >
                        <EditIcon />
                    </Button>

                    <Button
                        colorScheme="red"
                        size='xs'
                        mr={1}
                        onClick={() => {
                            () => eliminarCliente(row)
                        }}
                    >
                        <DeleteIcon />
                    </Button>


                </>

            )
        }
    ];

    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
        false
    );

    const filteredItems = listado.filter(
        item =>
            JSON.stringify(item)
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) !== -1
    );

    const subHeaderComponent = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText("");
            }
        };

        return (
            <FilterComponent
                onFilter={e => setFilterText(e.target.value)}
                onClear={handleClear}
                filterText={filterText}
            />
        );
    }, [filterText, resetPaginationToggle]);

    return (
        <Box
            mt={5}
            p={4}
            border="1px"
            borderRadius={10}
        >
            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading fontSize={'3xl'}>Listado de Clientes</Heading>
                <Text fontSize={'xl'}>
                    Gestion de clientes. Para registrar un nuevo cliente, haz click aqui {" "}
                    <ModalRegistro
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
                   
                    />

                </Text>
            </Stack>


            <Box maxW={'100%'} mt={10} justifyContent={"center"} border="1px">

                <DataTable
                    // title="Listado de Clientes"
                    columns={columns}
                    data={filteredItems}
                    defaultSortField="name"
                    striped
                    pagination
                    subHeader
                    subHeaderComponent={subHeaderComponent}

                />
            </Box>
        </Box>

    );
}

export default ListadoClientes


