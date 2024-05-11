import { Card, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthService } from '../../api/users';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/garagedoor.png';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const DashboardAdmin = () => {

    const navigate = useNavigate();
    const [userNodos, setUserNodos] = useState();
    const [selectedIcon, setSelectedIcon] = useState(false);

    useEffect(() => {
        const getAllUserNodos = async () => {
            const response = await axios.get(`${AuthService.baseUrl}${AuthService.endpoints.getAllNodos}`);
            if (!response.data || !response.data.nodos) {
                throw new Error('No se encontraron nodos');
            }
            setUserNodos(response.data.nodos);
        }
        getAllUserNodos();
    }, []);

    // const [value, setValue] = useState('');
    // const [error, setError] = useState('');
    // const [detailError, setDetailError] = useState(false);
    // const [valueError, setValueError] = useState(false);

    return (
        <Box className="flex flex-col">
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
                                    <Grid item className="flex flex-row mt-3">
                                        <Button
                                            variant="outlined"
                                            onClick={() => navigate(`${nodo.idnodo}`)}
                                            sx={{ alignSelf: 'left', fontWeight: 600 }}
                                            className='mb-1'
                                        >
                                            Nodo {nodo.idnodo} - Id usuario {nodo.usuario_id}
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
                    <Typography variant="h6" className='mt-2 mb-2 font-bold flex flex-col'>Bienvenido a la sección de administrador</Typography>
                </Container>
                <Container className="bg-white flex flex-row justify-around items-center w-full rounded-lg mt-5 mb-5 ">
                    <Typography variant="subtitle1" className='mt-5 mb-5 flex flex-col'>En esta sección podrás visualizar los nodos
                        y los sensores de todos los usuarios por medio de tablas y una gráfica para los datos de distancia del sensor ultrasonido. En el dashboard que
                        se encuentra en esta misma página en la parte superior se mostrarán los nodos que existan en estos momentos y el id del usuario al que pertenecen.
                        Para acceder a la información de cada nodo, da click en el botón "Nodo # - ID USUARIO #".
                        En caso de que no existan datos en alguno de los sensores, la página se quedará cargando y se envía una notificación "No se encontró el recurso solicitado".
                        Por último, esperamos que disfrutes de la experiencia de usuario en nuestro sitio web."
                    </Typography>
                </Container>
            </Container>
        </Box>
    );
};
export default DashboardAdmin;