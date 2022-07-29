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
    Heading

} from '@chakra-ui/react'

import { ViewIcon } from '@chakra-ui/icons'
import moment from 'moment'


const ModalVista = ({
    row,
    verCredito,
    cliente
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
                size='xs'
                mr={1}
                onClick={() => {
                    setOverlay(<OverlayOne />)
                    onOpen()
                    verCredito(row)

                }}
            >
                <ViewIcon />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="3xl" >
                {overlay}
                <ModalContent color={useColorModeValue('black', 'white')}>
                    <ModalHeader>Detalles del Credito N°: {row.idcredito} - {cliente.apellido}, {cliente.nombre}</ModalHeader>
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

                                <Heading w={"6xl"} fontSize={'3xl'}>Datos del Credito</Heading>

                                <FormControl isRequired w="xs" mt="10" >
                                    <FormLabel >Credito</FormLabel>
                                    <Input type='text' value={row.prestamo} />
                                </FormControl>

                                <FormControl isRequired w="xs" mt="10" >
                                    <FormLabel >Cuota</FormLabel>
                                    <Input type='text' value={row.monto_cuota} />
                                </FormControl>

                                <FormControl w="xs" mt="10" >
                                    <FormLabel >Plan de Cuotas</FormLabel>
                                    <Input type='number' value={row.cant_cuotas} />
                                </FormControl>

                                <FormControl w="xs" mt="10" >
                                    <FormLabel >Anticipo</FormLabel>
                                    <Input type='text' value={row.anticipo} />
                                </FormControl>

                                <FormControl w="xs" mt="10" >
                                    <FormLabel >Monto Final</FormLabel>
                                    <Input type='text' value={row.monto_final} />
                                </FormControl>


                                <FormControl w="xs" mt="10" >
                                    <FormLabel >Vendedor</FormLabel>
                                    <Input type='text' value={row.vendedor} />
                                </FormControl>
                            </Box>

                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Cerrar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalVista