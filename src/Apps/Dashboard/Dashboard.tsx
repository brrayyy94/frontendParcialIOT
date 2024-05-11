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

                <Container className="bg-white flex flex-row justify-around items-center w-full rounded-lg mt-5 ">
                    <Typography variant="h6" className='mt-2 mb-2 font-bold flex flex-col'>Bienvenido a la sección de cliente</Typography>
                </Container>
                <Container className="bg-white flex flex-row justify-around items-center w-full rounded-lg mt-5 mb-5 ">
                    <Typography variant="subtitle1" className='mt-5 mb-5'>En este sitio web como usuario cliente podrás llevar control de tus nodos
                        y los sensores asociados a ellos por medio de tablas y una gráfica para los datos de distancia del sensor ultrasonido. En esta misma página puedes
                        visualizar los nodos que tengas creados, puedes acceder a la información de cada uno dando click en el botón "Nodo #". 
                        En caso de que no tengas datos en alguno de los sensores en el día, la página se quedará cargando y se envia una notificación "No se encontró el recurso solicitado".
                        También recibirás notificaciones del estado de tu puerta en el botón de la campana en la parte superior izquierda. 
                        Para visualizar las notificaciones del estado de tu puerta debes volver a cargar la pagina, estamos mejorando para que se actualice en tiempo real.
                        Por último, esperamos que disfrutes de la experiencia de usuario en nuestro sitio web."
                    </Typography>
                </Container>
            </Container>
        </Box>
    );
}
export default Dashboard;