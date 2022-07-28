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
                Registrar Cliente
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
                                mt={5}
                            >
                                <Heading w={"6xl"} fontSize={'3xl'}>Datos del Cliente</Heading>

                                <FormControl isRequired w="xs" mt="10" >
                                    <FormLabel >Apellido</FormLabel>
                                    <Input
                                        type='text'
                                        ref={apellidoRef}
                                    />
                                </FormControl>

                                <FormControl isRequired w="xs" mt="10" >
                                    <FormLabel >Nombre</FormLabel>
                                    <Input
                                        type='text'
                                        ref={nombreRef}
                                    />
                                </FormControl>


                                <FormControl isRequired w="xs" mt="10" >
                                    <FormLabel >DNI</FormLabel>
                                    <Input
                                        type='number'
                                        ref={dniRef}
                                    />
                                </FormControl>

                                <FormControl isRequired w="xs" mt="10" >
                                    <FormLabel >Fecha de Nacimiento</FormLabel>
                                    <Input
                                        type='date'
                                        ref={fechaNacRef}
                                    />
                                </FormControl>

                                <FormControl w="xs" mt="10" >
                                    <FormLabel >Telefono</FormLabel>
                                    <Input
                                        type='number'
                                        ref={telefonoRef}
                                    />
                                </FormControl>

                                <FormControl w="6xl" mt="10" >
                                    <FormLabel >Direccion</FormLabel>
                                    <Input
                                        type='text'
                                        ref={direccionRef}
                                    />
                                </FormControl>

                                <FormControl w="6xl" mt="10" >
                                    <FormLabel >Barrio</FormLabel>
                                    <Input
                                        type='text'
                                        ref={barrioRef}
                                    />
                                </FormControl>

                                <FormControl w="6xl" mt="10" >
                                    <FormLabel >Localidad</FormLabel>
                                    <Input
                                        type='text'
                                        ref={localidadRef}
                                    />
                                </FormControl>

                                <FormControl w="xs" mt="10" >
                                    <FormLabel >Cod. Postal</FormLabel>
                                    <Input
                                        type='number'
                                        ref={codigoPostalRef}
                                        defaultValue={0}
                                    />
                                </FormControl>

                                <FormControl isRequired w="xs" mt="10" >
                                    <FormLabel >Vendedor</FormLabel>
                                    <Select
                                        ref={zonaRef}
                                    >
                                        <option selected value="no"> Elige la zona..</option>
                                        {zonas
                                            ? zonas.map((z, index) => (
                                                <option key={index} value={z.idzona}>
                                                    {z.descripcion}
                                                </option>
                                            ))
                                            : null}
                                    </Select>
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
                                <Heading w={"6xl"} fontSize={'3xl'}>Datos del conyugue</Heading>

                                <FormControl isRequired w="xs" mt="10" >
                                    <FormLabel >Apellido</FormLabel>
                                    <Input
                                        type='text'
                                        ref={apellidoConRef}
                                    />
                                </FormControl>

                                <FormControl isRequired w="xs" mt="10" >
                                    <FormLabel >Nombre</FormLabel>
                                    <Input
                                        type='text'
                                        ref={nombreConRef}
                                    />
                                </FormControl>

                                <FormControl isRequired w="xs" mt="10" >
                                    <FormLabel >DNI</FormLabel>
                                    <Input
                                        type='number'
                                        ref={dniConRef}
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
                                <Heading w={"6xl"} fontSize={'3xl'}>Razon Social</Heading>

                                <FormControl isRequired w="6xl" mt="10" >
                                    <FormLabel >Descripcion</FormLabel>
                                    <Input
                                        type='text'
                                        ref={descripcionRSRef}
                                    />
                                </FormControl>

                                <FormControl isRequired w="6xl" mt="10" >
                                    <FormLabel >Direccion</FormLabel>
                                    <Input
                                        type='text'
                                        ref={direccionRSRef}
                                    />
                                </FormControl>

                                <FormControl isRequired w="6xl" mt="10" >
                                    <FormLabel >Barrio</FormLabel>
                                    <Input
                                        type='text'
                                        ref={barrioRSRef}
                                    />
                                </FormControl>

                                <FormControl isRequired w="xs" mt="10" >
                                    <FormLabel >Telefono</FormLabel>
                                    <Input
                                        type='number'
                                        ref={telefonoRSRef}
                                    />
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
                        <Button colorScheme={"blue"} mr="2" onClick={registroCliente}>Registrar</Button>
                        <Button colorScheme={"red"} onClick={onClose}>Cerrar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalRegistro