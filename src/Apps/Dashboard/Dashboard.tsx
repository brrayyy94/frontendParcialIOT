import { Card, Container, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthService } from '../../api/users';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/golden.jpg';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

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

    const handleClick = async (idnodo: number) => {
        try {
            const jsonData = {
                idnodo: idnodo,
                accionDispensador: 1
            };
            const response = await axios.post(`${AuthService.baseUrl}${AuthService.endpoints.dispensar}`, jsonData);
            console.log('Respuesta del servidor:', response.data);
            // Aquí puedes manejar la respuesta del servidor si es necesario
        } catch (error) {
            console.error('Error al enviar el JSON:', error);
            // Aquí puedes manejar los errores, como mostrar un mensaje al usuario
        }
    };

    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const [detailError, setDetailError] = useState(false);
    const [valueError, setValueError] = useState(false);

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${AuthService.baseUrl}${AuthService.endpoints.tienda}`, {
                mensaje: value,
                usuario_id: id,
                direccion: error
            });
            const data = response.data;
            console.log(data);
            toast.success('Pedido realizado con éxito');

        } catch (error) {
            console.error('Error:', error);
            const res1 = (error as AxiosError).response?.status;
            if (res1 === 500) {
                setValueError(true);
                setDetailError(true);
                console.log('User not found');
            }
        }
    };

    return (
        <Box className="flex flex-row">
            <Container disableGutters className="bg-blue-200 flex flex-col justify-center rounded-lg items-center max-w-3x1 pl-5 pr-5 ">
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-around"
                    alignItems="center"
                    className='bg-white w-full rounded-lg mt-10 '>
                    <Grid item>
                        <Typography variant="h3">Nodos</Typography>
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
                                        <Button
                                            variant="contained"
                                            sx={{ alignSelf: 'center', fontWeight: 600 }}
                                            onClick={() => handleClick(nodo.idnodo)}
                                        >
                                            Dispensar {nodo.idnodo}
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

                <Box
                    component="form"
                    display="flex"
                    flexDirection={{ xs: 'column', sm: 'row' }} // En pantallas extra pequeñas (xs), los elementos se apilan verticalmente. En pantallas pequeñas (sm) y mayores, se alinean horizontalmente.
                    justifyContent="space-around"
                    alignItems="center"
                    className='bg-white w-full rounded-lg mb-2'
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{
                        '& > :not(style)': { m: 1, width: { xs: '100%', sm: 'auto' } }, // En pantallas extra pequeñas (xs), los elementos ocupan el ancho completo. En pantallas pequeñas (sm) y mayores, el ancho es automático.
                    }}
                >
                    <Typography variant="h5" className="font-light">¡Realiza tu pedido!</Typography>
                    <TextField
                        margin="normal"
                        required
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        error={valueError}
                        name="mensaje"
                        label="mensaje"
                        type="mensaje"
                        id="mensaje"
                        autoComplete="current-password"
                    />
                    <TextField
                        margin="normal"
                        required
                        value={id}
                        error={valueError}
                        disabled
                        name="usuario id"
                        label="usuario id"
                        type="usuario id"
                        id="usuario id"
                        autoComplete="current-password"
                    />
                    <TextField
                        margin="normal"
                        required
                        value={error}
                        onChange={(e) => setError(e.target.value)}
                        error={detailError}
                        name="direccion"
                        label="direccion"
                        type="direccion"
                        id="direccion"
                        autoComplete="current-password"
                        
                    />
                    <Button
                        type='submit'
                        variant="contained"  // Puedes cambiar el estilo si deseas
                        sx={{ mt: 1, mb: 2 }}
                    >
                        Enviar
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}
export default Dashboard;