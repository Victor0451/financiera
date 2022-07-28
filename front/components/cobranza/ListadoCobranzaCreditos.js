import React, { useMemo } from "react";
import toastr from "toastr";
import DataTable from "react-data-table-component";
import FilterComponent from "../Layouts/FilterComponent";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Container,
    Box,
    FormControl,
    FormLabel,
    Input,
    useColorModeValue,
    Textarea,
    Heading,
    Select,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Stack,
    Text
} from '@chakra-ui/react'
import moment from "moment";
import ModalPago from "./ModalPago";

const ListadoCobranzaCreditos = ({
    credito,
    listado,
    cobranza,
    totalCobranza,
    verCliente,
    eliminarCliente,
    preCargarCobranza,
    nupagos,
    montoRef,
    cuotaRef,
    metodoCobranzaRef,
    descripcionRef,
    limpiarPrePagos,
    eliminarPagoPrecargado,
    totalPagosPrecargados,
    registrarPagosCredito,
}) => {

    const columns = [

        {
            name: "Cuota",
            selector: row => `${row.cuota}`,
            sortable: true,
            grow: 0.4
        },
        {
            name: "Monto",
            selector: row => `${row.monto}`,
            sortable: true,
            grow: 0.4
        },

        {
            name: "Fecha de Pago",
            selector: row => `${moment(row.fecha).format('DD/MM/YYYY')}`,
            sortable: true,
            grow: 0.5
        },

        {
            name: "Metodo de Pago",
            selector: row => `${row.metodo_pago}`,
            sortable: true,
            grow: 0.8
        },

        {
            name: "Descripcion",
            selector: row => `${row.descripcion}`,
            sortable: true,
            grow: 0.4
        },
        // {
        //     name: "acciones",
        //     button: true,
        //     cell: row =>
        //     (
        //         <>
        //             <button
        //                 onClick={() => verCliente(row)}
        //                 className="btn btn-sm btn-info me-1"
        //                 data-bs-toggle="modal"
        //                 data-bs-target="#verCliente"
        //             >
        //                 <i className="fa fa-eye" aria-hidden="true"></i>
        //             </button>
        //             <button
        //                 onClick={() => toastr.warning("Modulo en proceso de programacion", "ATENCION")}
        //                 className="btn btn-sm btn-warning me-1"
        //             >
        //                 <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
        //             </button>
        //             <button
        //                 className="btn btn-sm btn-danger me-1"
        //                 onClick={() => eliminarCliente(row)}>
        //                 <i className="fa fa-trash-o" aria-hidden="true"></i>
        //             </button>
        //         </>

        //     )
        // }
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
                    Gestion de pagos de cuotas, para registrar un pago haz click aqui {" "}
                    <ModalPago
                        cobranza={cobranza}
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
                        credito={credito}
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

export default ListadoCobranzaCreditos


