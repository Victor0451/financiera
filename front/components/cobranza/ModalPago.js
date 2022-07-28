import React from 'react'
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
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'

import { DeleteIcon } from '@chakra-ui/icons'
import moment from 'moment'


const ModalPago = ({
    credito,
    cobranza,
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
    totalCobranza,
    errores
}) => {

    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = React.useState(<OverlayOne />)


    return (
        <>
            <Button
                colorScheme="blue"
                size='sm'
                onClick={() => {
                    setOverlay(<OverlayOne />)
                    onOpen()

                }}
            >
                Registrar Pago
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="3xl" >
                {overlay}
                <ModalContent color={useColorModeValue('black', 'white')}>
                    <ModalHeader>Registrar Credito</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Container maxW={'6xl'} border='1px' borderColor='gray.500' borderRadius="xl" p={5} >

                            {credito ? (
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
                                    <Heading w={"6xl"} fontSize={'3xl'}>Datos del Credito</Heading>
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

                                </Box>
                            ) : null}

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
                                <Heading w={"6xl"} fontSize={'3xl'}>Registro del Pago</Heading>
                                <FormControl isRequired w="xs" mt="10" >
                                    <FormLabel >Fecha</FormLabel>
                                    <Input type='text' value={moment().format('DD/MM/YYYY')} />
                                </FormControl>

                                <FormControl isRequired w="xs" mt="10" >
                                    <FormLabel >Monto</FormLabel>
                                    <Input
                                        type='number'
                                        ref={montoRef}
                                    />
                                </FormControl>

                                <FormControl isRequired w="xs" mt="10" >
                                    <FormLabel >Cuota</FormLabel>
                                    <Input
                                        type='number'
                                        ref={cuotaRef}
                                    />
                                </FormControl>

                                <FormControl isRequired w="xs" mt="10" >
                                    <FormLabel >Metodo de Pago</FormLabel>
                                    <Select
                                        ref={metodoCobranzaRef}
                                    >
                                        <option selected value="no"> Elige una opcion... </option>
                                        <option value="Efectivo"> Efectivo </option>
                                        <option value="Debito"> Debito </option>
                                        <option value="Credito"> Credito </option>
                                    </Select>
                                </FormControl>

                                <FormControl w="6xl" mt="10" >
                                    <FormLabel >Descripcion</FormLabel>
                                    <Textarea
                                        rows={3}
                                        ref={descripcionRef}
                                    />
                                </FormControl>
                            </Box>

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
                                <Heading w={"6xl"} fontSize={'3xl'}>Pagos Realizados</Heading>
                                <FormControl w="60%" mt="5" >
                                    <FormLabel >Pagos Precargados</FormLabel>

                                    <TableContainer
                                        mt={5}
                                        backgroundColor="white"
                                        border={"1px"}
                                        color="black"
                                        borderRadius={10}
                                        p="4"
                                    >
                                        <Table size='sm'>
                                            <Thead>
                                                <Tr>
                                                    <Th>#</Th>
                                                    <Th isNumeric>Cuota</Th>
                                                    <Th isNumeric>Importe</Th>
                                                    <Th>Eliminar</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>

                                                {
                                                    nupagos.map((n, index) => (
                                                        <Tr key={index}>
                                                            <Th scope="row">{index + 1}</Th>
                                                            <Td>{n.cuota}</Td>
                                                            <Td>{n.monto}</Td>
                                                            <Td>
                                                                <Button
                                                                    colorScheme={"red"}
                                                                    size={"sm"}
                                                                    onClick={eliminarPagoPrecargado} >
                                                                    <DeleteIcon />
                                                                </Button>
                                                            </Td>
                                                        </Tr>
                                                    )
                                                    )
                                                }


                                            </Tbody>
                                            <Tfoot>
                                                <Tr>
                                                    <Th></Th>
                                                    <Th isNumeric>Total</Th>
                                                    <Th isNumeric>{totalPagosPrecargados(nupagos)}</Th>
                                                    <Th></Th>

                                                </Tr>
                                            </Tfoot>
                                        </Table>
                                    </TableContainer>
                                </FormControl>

                                <FormControl w="35%" mt="10"  >
                                    <Button
                                        colorScheme={"blue"}
                                        onClick={preCargarCobranza}
                                        size="sm"
                                    >

                                        Precargar Pago
                                    </Button>
                                    <Button
                                        colorScheme={"red"}
                                        onClick={limpiarPrePagos}
                                        size="sm"
                                        mt={2}
                                    >
                                        Limpiar Pagos
                                    </Button>
                                </FormControl>

                            </Box>






                            {errores ? (
                                <Alert
                                    mt={5}
                                    status='error'>
                                    <AlertIcon />
                                    {errores}
                                </Alert>
                            )
                                : null}


                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme={"blue"} mr="2" onClick={registrarPagosCredito} >Registrar</Button>
                        <Button colorScheme={"red"} onClick={onClose}>Cerrar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalPago