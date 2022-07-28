import React from 'react'
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

} from '@chakra-ui/react';

import Tarjetas from './Tarjetas';

const HomeScreen = ({
    listado
}) => {
    return (
        <Box
            p={4}

        >
            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading fontSize={'3xl'}>Sistema de Gestion Financiera</Heading>
                <Text fontSize={'xl'}>
                    Por medio de este sistema vas a poder gestionar clientes, prestamos y cobro de cuotas.
                </Text>
            </Stack>


            <Container maxW={'100%'} mt={10} className="row" justifyContent={"center"} >

                <Box >
                    <Tarjetas
                        imagen={'/img/categoria.jpg'}
                        titulo={"Categorias"}
                        detalle={"Modulo de gestion de categorias"}
                        url={"/categorias/listado"}
                    />
                </Box>

                <Box ml="2">
                    <Tarjetas
                        imagen={'/img/proveedor.jpg'}
                        titulo={"Proveedores"}
                        detalle={"Modulo de gestion de proveedores"}
                        url={"/proveedores/listado"}
                    />
                </Box>

                <Box>
                    <Tarjetas
                        imagen={'/img/stock.jpg'}
                        titulo={"Productos"}
                        detalle={"Modulo de gestion del stock de productos"}
                        url={"/stock/listado"}
                    />
                </Box>

                <Box ml="2">
                    <Tarjetas
                        imagen={'/img/clientes.png'}
                        titulo={"Clientes"}
                        detalle={"Modulo de gestion de clientes"}
                        url={"/clientes/listado"}
                    />
                </Box>

                <Box ml="2">
                    <Tarjetas
                        imagen={'/img/venta.jpg'}
                        titulo={"Venta y Facturacion"}
                        detalle={"Modulo de venta y facturacion"}
                        url={"/facturacion/venta"}
                    />
                </Box>
            </Container>
        </Box>
    )
}

export default HomeScreen