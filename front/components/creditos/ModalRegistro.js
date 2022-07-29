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
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'

import { ViewIcon } from '@chakra-ui/icons'
import moment from 'moment'


const ModalRegistro = ({
    row,
    verCredito,
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
    flag,
    calcTotalFinal,
    totalFinal,
    registrarCredito,
    info,
    creditosCliente,
    empleados,
    planCuotas
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
                Registrar Credito
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="3xl" >
                {overlay}
                <ModalContent color={useColorModeValue('black', 'white')}>
                    <ModalHeader>Registrar Credito</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Container maxW={'6xl'} border='1px' borderColor='gray.500' borderRadius="xl" p={5} >


                            <Box
                                className='row'
                                alignItems="center"
                                justifyContent="space-between"
                                border='1px'
                                borderColor='gray.500'
                                borderRadius="xl"
                                p={5}
                            >
                                <Heading w={"6xl"} fontSize={'3xl'}>Buscar Cliente</Heading>

                                <FormControl isRequired w="xs" mt="10" >
                                    <FormLabel >N° Cliente</FormLabel>
                                    <Input type='text' ref={idClienteRef} />
                                </FormControl>

                                <FormControl isRequired w="xs" mt="10" >
                                    <FormLabel >DNI Cliente</FormLabel>
                                    <Input type='text' ref={dniRef} />
                                </FormControl>

                                <FormControl w="xs" mt="10" >
                                    <FormLabel ></FormLabel>
                                    <Button colorScheme={"blue"} onClick={() => {

                                        buscarCliente()


                                    }}>
                                        Buscar
                                    </Button>
                                </FormControl>

                            </Box>


                            {cliente.length !== 0 ? (

                                <>
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
                                        <Heading w={"6xl"} fontSize={'3xl'}>Datos del Cliente</Heading>

                                        <FormControl isRequired w="xs" mt="10" >
                                            <FormLabel >Nombre</FormLabel>
                                            <Input type='text' value={cliente.nombre} />
                                        </FormControl>

                                        <FormControl isRequired w="xs" mt="10" >
                                            <FormLabel >Apellido</FormLabel>
                                            <Input type='text' value={cliente.apellido} />
                                        </FormControl>

                                        <FormControl w="xs" mt="10" >
                                            <FormLabel >Telefono</FormLabel>
                                            <Input type='number' value={cliente.telefono} />
                                        </FormControl>

                                        <FormControl w="6xl" mt="10" >
                                            <FormLabel >Direccion</FormLabel>
                                            <Input type='text' value={cliente.direccion} />
                                        </FormControl>

                                        <FormControl w="6xl" mt="10" >
                                            <FormLabel >Barrio</FormLabel>
                                            <Input type='text' value={cliente.barrio} />
                                        </FormControl>

                                    </Box>

                                    <Box
                                        mt={5}
                                        className='row'
                                        alignItems="center"
                                        justifyContent="space-between"
                                        border='1px'
                                        borderColor='gray.500'
                                        borderRadius="xl"
                                        p={5}
                                    >

                                        <Heading w={"6xl"} fontSize={'3xl'}>Confeccion del Credito</Heading>

                                        <FormControl isRequired w="xs" mt="10" >
                                            <FormLabel >Vendedor</FormLabel>
                                            <Select
                                                ref={vendedorRef}
                                            >
                                                <option selected value="no"> Elige el vendedor..</option>
                                                {empleados
                                                    ? empleados.map((c, index) => (
                                                        <option key={index} value={c.idempleado}>
                                                            {c.apellido}, {c.nombre}
                                                        </option>
                                                    ))
                                                    : null}
                                            </Select>
                                        </FormControl>

                                        <FormControl w="xs" mt="10" >
                                            <FormLabel >Prestamo</FormLabel>
                                            <Input type='number' ref={prestamoRef} />
                                        </FormControl>


                                        <FormControl isRequired w="xs" mt="10" >
                                            <FormLabel >Plan de Cuotas</FormLabel>
                                            <Select
                                                ref={cuotasRef}
                                            >
                                                <option selected value="no"> Elige el plan..</option>
                                                {planCuotas
                                                    ? planCuotas.map((c, index) => (
                                                        <option key={index} value={c.plan_cuotas}>
                                                            {c.plan_cuotas}
                                                        </option>
                                                    ))
                                                    : null}
                                            </Select>
                                        </FormControl>

                                        <FormControl isRequired w="xs" mt="10" >
                                            <FormLabel ></FormLabel>
                                            <Button colorScheme={"blue"} onClick={calculoPrestamo} >Calcular Prestamo</Button>
                                        </FormControl>



                                        <FormControl isRequired w="xs" mt="10" >
                                            <FormLabel >Capital a Devolver</FormLabel>
                                            <Input
                                                type='text'
                                                readOnly
                                                value={capadev}
                                                ref={capDevRef}
                                            />
                                        </FormControl>



                                        <FormControl w="xs" mt="10" >
                                            <FormLabel >Valor de la cuota</FormLabel>
                                            <Input
                                                type='text'
                                                readOnly
                                                value={cuoprest}
                                                ref={cuoPrestRef} />
                                        </FormControl>

                                        <FormControl w="xs" mt="10" >
                                            <FormLabel >Anticipo</FormLabel>
                                            <Input
                                                type='number'
                                                ref={anticipoRef}
                                                onChange={calcTotalFinal}
                                                defaultValue="0"
                                            />
                                        </FormControl>

                                        <FormControl w="xs" mt="10" >
                                            <FormLabel >
                                                Total Final
                                            </FormLabel>
                                            <Input
                                                type='number'
                                                value={totalFinal}
                                                ref={capDevRef}
                                                readOnly
                                            />
                                        </FormControl>


                                        <FormControl w="2xl" mt="10" >
                                            <Alert status='info'>
                                                <AlertIcon />
                                                Al ingresar un anticipo, este recalculara el monto final a devolver y el valor de las cuotas mensuales.
                                                Para volver a los valores iniciales, solo debes borrar el valor ingresado en anticipo.
                                            </Alert>
                                        </FormControl>


                                    </Box>
                                </>
                            ) : cliente.length === 0 ? null
                                : null
                            }


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
                        <Button colorScheme={"blue"} mr="2" onClick={registrarCredito}>Registrar</Button>
                        <Button colorScheme={"red"} onClick={onClose}>Cerrar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalRegistro