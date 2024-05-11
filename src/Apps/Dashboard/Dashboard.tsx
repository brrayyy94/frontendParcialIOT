import { Card, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthService } from '../../api/users';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/garagedoor.png';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import PositionedMenu from './ButtonNoti';

const Dashboard = () => {
    const { id } = useParams();
    const [userNodos, setUserNodos] = useState();
    const navigate = useNavigate();
    const [selectedIcon, setSelectedIcon] = useState(false);
    useEffect(() => {
        const getAllUserNodos = async () => {
            const response = await axios.get(`${AuthService.baseUrl}${AuthService.endpoints.getNodos}${id}`);
            if (!response.data || !response.data.nodos) {
                throw new Error('No se encontró el usuario');
            }
            setUserNodos(response.data.nodos);
        }

        if (id) {
            getAllUserNodos();
        }

    }, [id]);

    // const [value, setValue] = useState('');
    // const [error, setError] = useState('');
    // const [detailError, setDetailError] = useState(false);
    // const [valueError, setValueError] = useState(false);

    const [userNodos2, setUserNodos2] = useState([]);

    const [prevSize, setPrevSize] = useState(0);

    useEffect(() => {
        const getAllUserNodos2 = async () => {
            try {
                const response = await axios.get(`${AuthService.baseUrl}${AuthService.endpoints.getEstadoPuerta}/${id}`);
                if (!response.data) {
                    throw new Error('No se encontraron notificaciones');
                }
                console.log(response.data);
                setUserNodos2(response.data);
            } catch (error) {
                const res1 = (error as AxiosError).response?.status;
                if (res1 === 404) {
                    console.log('No hay notificaciones del dia de hoy');
                }
            }
        }
        getAllUserNodos2();
    }, [id]);

    useEffect(() => {
        // Enviar notificación si el tamaño del array ha aumentado
        if (userNodos2 && userNodos2.length > prevSize) {
            console.log('Se ha añadido una nueva notificación!');
            toast.warning('Nuevo estado de la puerta!');
            // Aquí puedes agregar tu lógica para enviar la notificación, por ejemplo, utilizando alguna librería de notificaciones como react-toastify
        }
        // Actualizar el tamaño previo del array
        setPrevSize(userNodos2 ? userNodos2.length : 0);
    }, [userNodos2, prevSize]);

    return (
        <Box className="flex flex-col">
            <Box className="flex flex-col justify-end">
                {/* Notifications */}
                <PositionedMenu
                        userNodos={userNodos2} />
            </Box>
            <Container disableGutters className="bg-orange-200 flex flex-col justify-center rounded-lg items-center max-w-3x1 pl-5 pr-5 ">
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-around"
                    alignItems="center"
                    className='bg-white w-full rounded-lg mt-10 '>
                    <Grid item>
                        <Typography variant="h3" className='font-bold'>Nodos</Typography>
                    </Grid>
                </Box>
                <Grid container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    margin={5}>
                    {userNodos && userNodos.map((nodo) => (
                        <Grid item key={nodo.idnodo}
                            className='flex flex-row'>
                            <Card className="mt-4 mr-4 max-h-min max-w-xl sm:max-w-80 p-4 rounded-xl">
                                <CardMedia className="rounded-xl"
                                    component="img"
                                    style={{ height: 180 }}
                                    image={logo}
                                />
                                <Grid container justifyContent="space-between" alignItems={'flex-end'}>
                                    <Grid item className="flex flex-col mt-3">
                                        <Button
                                            variant="outlined"
                                            onClick={() => navigate(`${nodo.idnodo}`)}
                                            sx={{ alignSelf: 'left', fontWeight: 600 }}
                                            className='mb-1'
                                        >
                                            Nodo {nodo.idnodo}
                                        </Button>
                                    </Grid>
                                    <Grid item className="align-bottom">
                                        <IconButton
                                            onClick={() => setSelectedIcon(nodo.idnodo)}
                                        >
                                            {selectedIcon === nodo.idnodo ? <FavoriteIcon color="error" /> : <FavoriteBorder />}
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Container className="bg-orange-200 flex flex-col justify-center rounded-lg items-center max-w-3x1 pl-5 pr-5 mt-10">
                <Typography variant="h3" className='mt-5 font-bold'>Garage Door</Typography>
                <Typography variant="body1" className='mt-5 mb-5'>Contexto:
                    Trabajaremos en esta evaluación con el contexto trabajado en los exámenes anteriores, de tal
                    manera que ya tenemos unos sensores conectados a una plataforma hardware y con los datos
                    entregados por dichos sensores hemos generado un JSON con la información y hemos enviado
                    esos datos al servidor, los hemos procesado, los hemos almacenado y hemos implementado
                    estados y actuaciones. En el servidor debemos tener en este momento datos de dos nodos
                    distintos.
                    Desarrollaremos una aplicación web para interactuar con los usuarios. El objetivo es resolver los
                    siguientes requerimientos.
                    Requerimientos
                    1. Desarrollar en el servidor las operaciones REST que se requieran para satisfacer las
                    necesidades de la aplicación web a desarrollar.
                    2. Desarrollar una aplicación web que cumpla (mínimo) con los siguientes requerimientos:
                    a. Se tendrán dos tipos de usuario: el usuario administrador y el usuario cliente.
                    b. Cada usuario cliente deberá tener asociado un nodo.
                    c. Deberá tener una página de inicio con la información general del sistema y
                    además se muestre un formulario para el ingreso de los usuarios (Página de
                    login)
                    d. Cuando ingrese el usuario administrador se le dará la opción de seleccionar uno
                    de los nodos.
                    e. Cuando se seleccione un nodo deberá mostrársele todos los datos y
                    alertas/estados asociados a ese nodo en forma de tabla y de manera gráfica.
                    f. Cuando ingrese el usuario cliente se le mostrarán los últimos datos y alertas de
                    su nodo.
                    g. La aplicación web hará uso de las operaciones REST desarrolladas en el punto
                    anterior.
                    Requerimientos logísticos:
                    a. Debe entregar un documento presentación en donde explique con detalle las
                    operaciones REST desarrolladas y su relación con la aplicación.
                    b. Deberá sustentar todo el desarrollo ante el profesor.</Typography>
            </Container>
        </Box>
    );
}
export default Dashboard;