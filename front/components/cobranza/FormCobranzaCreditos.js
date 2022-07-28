import React from 'react'
import ListadoCobranzaCreditos from './ListadoCobranzaCreditos'
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
    FormControl,
    FormLabel,
    Input

} from '@chakra-ui/react';

const FormCobranzaCreditos = ({
    cliente,
    credito,
    cobranza,
    cuoPag,
    totalCobranza,
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
    return (

        <Box
            mt={5}
            p={5}
            border="1px"
            borderRadius={10}
        >
            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading fontSize={'3xl'}>Cobranza de cuotas</Heading>
                <Text fontSize={'xl'}>
                    Gestion de clientes. Para registrar un nuevo cliente, haz click aqui {" "}

                </Text>
            </Stack>




            {
                cliente.length === 0 ?
                    (
                        <Alert
                            status='info'
                            mt={4}
                            mb={4}
                        >
                            <AlertIcon />
                            No hay datos del cliente
                        </Alert>

                    )

                    : (

                        <Box
                            className='row'
                            alignItems="center"
                            justifyContent="space-between"
                            border='1px'
                            borderColor='gray.500'
                            borderRadius="xl"
                            p={5}
                            mt={5}
                        >

                            <Heading w={"100%"} fontSize={'3xl'}>Datos del Cliente</Heading>

                            <FormControl isRequired w="xs" mt="10" >
                                <FormLabel >Apellido</FormLabel>
                                <Input
                                    type='text'
                                    defaultValue={cliente.apellido}
                                    readOnly
                                />
                            </FormControl>

                            <FormControl isRequired w="xs" mt="10" >
                                <FormLabel >Nombre</FormLabel>
                                <Input
                                    type='text'
                                    defaultValue={cliente.nombre}
                                    readOnly
                                />
                            </FormControl>


                            <FormControl isRequired w="xs" mt="10" >
                                <FormLabel >DNI</FormLabel>
                                <Input
                                    type='number'
                                    defaultValue={cliente.dni}
                                    readOnly
                                />
                            </FormControl>

                            <FormControl isRequired w="xs" mt="10" >
                                <FormLabel >Fecha de Nacimiento</FormLabel>
                                <Input
                                    type='text'
                                    defaultValue={cliente.fecha_nacimiento}
                                    readOnly
                                />
                            </FormControl>

                            <FormControl w="xs" mt="10" >
                                <FormLabel >Telefono</FormLabel>
                                <Input
                                    type='text'
                                    defaultValue={cliente.telefono}
                                    readOnly
                                />
                            </FormControl>

                            <FormControl w="3xl" mt="10" >
                                <FormLabel >Direccion</FormLabel>
                                <Input
                                    type='text'
                                    defaultValue={cliente.direccion}
                                    readOnly
                                />
                            </FormControl>

                            <FormControl w="3xl" mt="10" >
                                <FormLabel >Barrio</FormLabel>
                                <Input
                                    type='text'
                                    defaultValue={cliente.barrio}
                                    readOnly
                                />
                            </FormControl>

                            <FormControl w="3xl" mt="10" >
                                <FormLabel >Localidad</FormLabel>
                                <Input
                                    type='text'
                                    defaultValue={cliente.localidad}
                                    readOnly
                                />
                            </FormControl>

                        </Box>
                    )
            }

            {
                credito.estado === 0 ? (

                    <Alert
                        status='success'
                        mt={4}
                        mb={4}
                    >
                        <AlertIcon />
                        El credito ya fue cancelado por completo.
                    </Alert>
                ) :

                    (<Alert
                        status='info'
                        mt={4}
                        mb={4}
                    >
                        <AlertIcon />
                        Al credito le restan {credito.cant_cuota - credito.cuotas_pagadas} cuotas para cancelado.
                    </Alert>
                    )
            }


            {
                credito.idcredito ? (

                    <Box
                        className='row'
                        alignItems="center"
                        justifyContent="space-between"
                        border='1px'
                        borderColor='gray.500'
                        borderRadius="xl"
                        p={5}
                        mt={5}
                    >

                        <Heading w={"100%"} fontSize={'3xl'}>Datos del Credito</Heading>


                        <FormControl isRequired w="xs" mt="10" >
                            <FormLabel >Credito</FormLabel>
                            <Input type='text' value={credito.prestamo} />
                        </FormControl>

                        <FormControl isRequired w="xs" mt="10" >
                            <FormLabel >Plan de Cuota</FormLabel>
                            <Input type='text' value={credito.monto_cuota} />
                        </FormControl>

                        <FormControl isRequired w="xs" mt="10" >
                            <FormLabel >Cuota Abonadas</FormLabel>
                            <Input
                                type='text'
                                value={totalCobranza(cobranza)}
                            />
                        </FormControl>

                        <FormControl w="xs" mt="10" >
                            <FormLabel >Anticipo</FormLabel>
                            <Input type='text' value={credito.anticipo} />
                        </FormControl>

                        <FormControl w="xs" mt="10" >
                            <FormLabel >Monto Final</FormLabel>
                            <Input type='text' value={credito.monto_final} />
                        </FormControl>


                        <FormControl w="xs" mt="10" >
                            <FormLabel >Vendedor</FormLabel>
                            <Input type='text' value={credito.vendedor} />
                        </FormControl>


                    </Box>

                ) : (

                    <Alert
                        status='info'
                        mt={4}
                        mb={4}
                    >
                        <AlertIcon />
                        No hay datos del credito
                    </Alert>

                )

            }


            <Box maxW={'100%'} mt={10} justifyContent={"center"} border="1px">

                <ListadoCobranzaCreditos
                    cobranza={cobranza}
                    totalCobranza={totalCobranza}
                    credito={credito}
                    listado={cobranza}
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

            </Box>

        </Box>

    )
}

export default FormCobranzaCreditos
