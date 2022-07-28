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
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,

} from '@chakra-ui/react'

import { ViewIcon } from '@chakra-ui/icons'
import moment from 'moment'
import ListadoCreditos from '../creditos/ListadoCreditos'


const ModalVista = ({
    row,
    verCliente,
    conyugue,
    razonSoc,
    creditos,
    push
}) => {

    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = React.useState(<OverlayOne />)



    console.log(row)

    return (


        <>
            <Button
                colorScheme="blue"
                size='xs'
                mr={1}
                onClick={() => {
                    setOverlay(<OverlayOne />)
                    onOpen()
                    verCliente(row)

                }}
            >
                <ViewIcon />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} size="3xl" >
                {overlay}
                <ModalContent color={useColorModeValue('black', 'white')}>
                    <ModalHeader>Detalles del Cliente N° {row.idcliente}:  {row.apellido}, {row.nombre}</ModalHeader>
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
                                    <FormLabel >Apellido</FormLabel>
                                    <Input
                                        type='text'
                                        defaultValue={row.apellido}
                                        readOnly
                                    />
                                </FormControl>

                                <FormControl isRequired w="xs" mt="10" >
                                    <FormLabel >Nombre</FormLabel>
                                    <Input
                                        type='text'
                                        defaultValue={row.nombre}
                                        readOnly
                                    />
                                </FormControl>


                                <FormControl isRequired w="xs" mt="10" >
                                    <FormLabel >DNI</FormLabel>
                                    <Input
                                        type='number'
                                        defaultValue={row.dni}
                                        readOnly
                                    />
                                </FormControl>

                                <FormControl isRequired w="xs" mt="10" >
                                    <FormLabel >Fecha de Nacimiento</FormLabel>
                                    <Input
                                        type='text'
                                        defaultValue={row.fecha_nacimiento}
                                        readOnly
                                    />
                                </FormControl>

                                <FormControl w="xs" mt="10" >
                                    <FormLabel >Telefono</FormLabel>
                                    <Input
                                        type='text'
                                        defaultValue={row.telefono}
                                        readOnly
                                    />
                                </FormControl>

                                <FormControl w="6xl" mt="10" >
                                    <FormLabel >Direccion</FormLabel>
                                    <Input
                                        type='text'
                                        defaultValue={row.direccion}
                                        readOnly
                                    />
                                </FormControl>

                                <FormControl w="6xl" mt="10" >
                                    <FormLabel >Barrio</FormLabel>
                                    <Input
                                        type='text'
                                        defaultValue={row.barrio}
                                        readOnly
                                    />
                                </FormControl>

                                <FormControl w="6xl" mt="10" >
                                    <FormLabel >Localidad</FormLabel>
                                    <Input
                                        type='text'
                                        defaultValue={row.localidad}
                                        readOnly
                                    />
                                </FormControl>

                                <FormControl w="xs" mt="10" >
                                    <FormLabel >Cod. Postal</FormLabel>
                                    <Input
                                        type='number'
                                        defaultValue={row.cod_postal}
                                        readOnly
                                    />
                                </FormControl>

                            </Box>


                            {!conyugue.idcliente ?
                                (
                                    <Alert
                                        status='info'
                                        mt={4}
                                        mb={4}
                                    >
                                        <AlertIcon />
                                        No hay datos del conyugue
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
                                    >


                                        <Heading w={"6xl"} fontSize={'3xl'}>Conyugue</Heading>

                                        <FormControl w="xs" mt="10" >
                                            <FormLabel >Apellido</FormLabel>
                                            <Input
                                                type='text'
                                                value={conyugue.apellido}

                                            />
                                        </FormControl>

                                        <FormControl w="xs" mt="10" >
                                            <FormLabel >Nombre</FormLabel>
                                            <Input
                                                type='text'
                                                value={conyugue.nombre}

                                            />
                                        </FormControl>

                                        <FormControl w="xs" mt="10" >
                                            <FormLabel >DNI</FormLabel>
                                            <Input
                                                type='number'
                                                value={conyugue.dni}

                                            />
                                        </FormControl>

                                    </Box>

                                )}

                            {!razonSoc.idcliente ?
                                (
                                    <Alert
                                        status='info'
                                        mt={4}
                                        mb={4}
                                    >
                                        <AlertIcon />
                                        No hay datos de la razon social
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
                                    >

                                        <Heading w={"6xl"} fontSize={'3xl'}>Razon Social</Heading>

                                        <FormControl w="6xl" mt="10" >
                                            <FormLabel >Descripcion</FormLabel>
                                            <Input
                                                type='text'
                                                value={razonSoc.razon_social}
                                                readOnly
                                            />
                                        </FormControl>

                                        <FormControl w="6xl" mt="10" >
                                            <FormLabel >Direccion</FormLabel>
                                            <Input
                                                type='text'
                                                value={razonSoc.direccion_legal}
                                                readOnly
                                            />
                                        </FormControl>

                                        <FormControl w="6xl" mt="10" >
                                            <FormLabel >Barrio</FormLabel>
                                            <Input
                                                type='text'
                                                value={razonSoc.barrio_legal}
                                                readOnly
                                            />
                                        </FormControl>

                                        <FormControl w="xs" mt="10" >
                                            <FormLabel >Telefono</FormLabel>
                                            <Input
                                                type='number'
                                                value={razonSoc.tel_legal}
                                                readOnly
                                            />
                                        </FormControl>

                                    </Box>

                                )}

                            {creditos.length === 0 ?
                                (

                                    <Alert
                                        status='info'
                                        mt={4}
                                        mb={4}
                                    >
                                        <AlertIcon />
                                        No posee creditos activos
                                    </Alert>
                                )
                                : (

                                    <Box
                                        mt={5}
                                        border='1px'
                                        borderColor='gray.500'
                                        borderRadius="xl"
                                        p={5}
                                    >

                                        <Heading w={"6xl"} fontSize={'3xl'}>Creditos Activos</Heading>

                                        <ListadoCreditos
                                            listado={creditos}
                                            push={push}
                                            flag={true}
                                        />

                                    </Box>

                                )}



                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Cerrar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>
    )
}

export default ModalVista