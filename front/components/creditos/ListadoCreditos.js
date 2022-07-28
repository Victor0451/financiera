import React, { useMemo } from "react";
import toastr from "toastr";
import DataTable from "react-data-table-component";
import FilterComponent from "../Layouts/FilterComponent";
import ModalVista from "./ModalVista"
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
import { FaDollarSign } from "react-icons/fa";
import { DeleteIcon } from '@chakra-ui/icons'
import ModalRegistro from "./ModalRegistro";


const ListadoCreditos = ({
    listado,
    verCredito,
    eliminarCredito,
    push,
    flag,
    cliente,
    idClienteRef,
    dniRef,
    prestamoRef,
    vendedorRef,
    cuotasRef,
    anticipoRef,
    capDevRef,
    cuoPrestRef,
    buscarCliente,
    errores,
    cuoprest,
    capadev,
    calculoPrestamo,
    calcTotalFinal,
    totalFinal,
    registrarCredito,
    info,
    creditosCliente,
    empleados,
    planCuotas
}) => {


    const columns = [

        {
            name: "N° Cliente",
            selector: row => `${row.idcliente}`,
            sortable: true,
            grow: 0.1
        },

        {
            name: "Credito",
            selector: row => `${row.prestamo}`,
            sortable: true,
            grow: 0.1
        },
        {
            name: "Anticipo",
            selector: row => `${row.anticipo}`,
            sortable: true,
            grow: 0.1
        },
        {
            name: "Monto Final",
            selector: row => `${row.monto_final}`,
            sortable: true,
            grow: 0.1
        },
        {
            name: "Cuota",
            selector: row => `${row.monto_cuota}`,
            sortable: true,
            grow: 0.1
        },

        {
            name: "Plan de Cuotas",
            selector: row => `${row.cant_cuota}`,
            sortable: true,
            grow: 0.1
        },
        {
            name: "Fecha",
            selector: row => `${moment(row.fecha).format('DD/MM/YYYY')}`,
            sortable: true,
            grow: 0.3
        },
        {
            name: "acciones",
            button: true,
            grow: 0.1,
            cell: row =>
            (
                <>
                    {flag === true ?
                        (
                            <Button
                                colorScheme="green"
                                size='xs'
                                mr={1}
                                onClick={() => push('/cobranza/cobranza', row.idcliente, row.idcredito)}
                            >
                                <FaDollarSign />
                            </Button>
                        )
                        : (
                            <>


                                <ModalVista
                                    row={row}
                                    verCredito={verCredito}
                                    cliente={cliente}
                                />

                                <Button
                                    colorScheme="red"
                                    size='xs'
                                    mr={1}
                                    onClick={() => {
                                        () => eliminarCredito(row)
                                    }}
                                >
                                    <DeleteIcon />
                                </Button>


                                <Button
                                    colorScheme="green"
                                    size='xs'
                                    mr={1}
                                    onClick={() => push('/cobranza/cobranza', row.idcliente, row.idcredito)}
                                >
                                    <FaDollarSign />
                                </Button>
                            </>
                        )
                    }

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

            <>


                <FilterComponent
                    onFilter={e => setFilterText(e.target.value)}
                    onClear={handleClear}
                    filterText={filterText}
                />

            </>
        );
    }, [filterText, resetPaginationToggle]);


    return (
        <>

            {flag === true ? (

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

            ) : (

                <Box
                    mt={5}
                    p={4}
                    border="1px"
                    borderRadius={10}

                >

                    <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                        <Heading fontSize={'3xl'}>Listado de Creditos</Heading>
                        <Text fontSize={'xl'}>
                            Gestion de creditos y cobro de cuotas. Para registrar un nuevo credito, haz click aqui {" "}
                            <ModalRegistro
                                cliente={cliente}
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
                                empleados={empleados}
                                planCuotas={planCuotas}
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
            )}

        </>

    )
}

export default ListadoCreditos
