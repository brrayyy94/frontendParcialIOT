import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import { Button, Container, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { ManageNodosService } from '../../api/nodos';
import { toast } from 'react-toastify';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';
import { AxiosError } from 'axios';

const DashboardAdmin = () => {

    const [id, setId] = useState('');
    const [nodo, setNodo] = useState('');
    const [value1, setValue] = useState('');
    const [isInputDisabled, setInputDisabled] = useState(true);
    const [tipo, setTipo] = useState('');
    const [valueError, setValueError] = useState(false);
    const [detailError, setDetailError] = useState(false);

    const handleChange = (event: SelectChangeEvent) => {
        setTipo(event.target.value as string);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputDisabled(!event.target.checked);
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!id.trim() || !nodo.trim()) {
            toast.error('Error: Campos vacios');
            setValueError(true);
            setDetailError(true);
            return;
        }
        try {
            const response = await axios.post(`${ManageNodosService.baseUrl}${ManageNodosService.endpoints.postPeso}`, {
                usuario_id: id,
                idnodo: nodo,
                peso: 1
            });
            const response2 = await axios.post(`${ManageNodosService.baseUrl}${ManageNodosService.endpoints.postUltrasonido}`, {
                usuario_id: id,
                idnodo: nodo,
                distancia: 1
            });
            if (response.status === 200 && response2.status === 200) {
                toast.success('Nodo creado exitosamente');
                setValueError(false);
                setDetailError(false);
            }
        } catch (error) {
            console.error('Error:', error);
        }

    };
    const handleSubmit2 = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!nodo.trim()) {
            toast.error('Error: Campos vacios');
            setValueError(true);
            setDetailError(true);
            return;
        }
        try {
            const response = await axios.delete(`${ManageNodosService.baseUrl}${ManageNodosService.endpoints.deletePeso}`, {
                data: { idnodo: nodo }
            });
            const response2 = await axios.delete(`${ManageNodosService.baseUrl}${ManageNodosService.endpoints.deleteUltrasonido}`, {
                data: { idnodo: nodo }
            });
            if (response.status === 200 && response2.status === 200) {
                toast.success('Nodo eliminado');
                setValueError(false);
                setDetailError(false);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleSubmit3 = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!id.trim() || !nodo.trim() || !value1.trim() || !tipo.trim()) {
            toast.error('Error: Campos vacios');
            setValueError(true);
            setDetailError(true);
            return;
        }
        try {
            if (tipo === 'Peso') {
                const response = await axios.put(`${ManageNodosService.baseUrl}${ManageNodosService.endpoints.getPeso}`, {
                    peso: value1, 
                    idnodo: nodo
                });
                if (response.status === 200) {
                    toast.success('Nodo actualizado');
                    setValueError(false);
                    setDetailError(false);
                }
            } else if (tipo === 'distancia') {
                const response = await axios.put(`${ManageNodosService.baseUrl}${ManageNodosService.endpoints.getUltrasonido}`, {
                    distancia: value1,
                    idnodo: nodo,
                });
                if (response.status === 200) {
                    toast.success('Nodo actualizado');
                    setValueError(false);
                    setDetailError(false);
                }
            }
        } catch (error) {
            console.error('Error:', error);
            const res1 = (error as AxiosError).response?.status;
            if (res1 === 500) {
                setValueError(true);
                setDetailError(true);
                toast.warn('Nodo no encontrado');
            }
        }
    };
    return (
        <Container className='bg-blue-200 flex flex-col max-w-xl h-auto rounded-lg items-center mt-12'>


            <Box className='bg-white flex flex-col w-80 h-auto items-center mt-5 rounded-lg'>
                <Typography
                    component="h1"
                    variant="h4"
                    className='font-sans text-2xl'
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    MANEJO DE NODOS
                </Typography>
            </Box>
            <Box className=' bg-white flex flex-col w-80 h-auto items-center mb-5 mt-2 rounded-lg'>
                <Box className='mt-2' >
                    <FormControl variant="standard">
                        <TextField
                            label='Usuario ID'
                            variant='outlined'
                            id="usuario_id"
                            error={valueError}
                            value={id}
                            onChange={(e) => setId(e.target.value)} />
                    </FormControl>
                </Box>
                <Box className='mt-5'>
                    <FormControl variant="standard">
                        <TextField
                            label='Nodo'
                            variant='outlined'
                            value={nodo}
                            error={detailError}
                            onChange={(e) => setNodo(e.target.value)}
                            id="nodo" />
                    </FormControl>
                </Box>
                <Box className='mt-5'>
                    <FormControl variant="standard">
                        <TextField
                            label='Valor'
                            variant='outlined'
                            disabled={isInputDisabled}
                            title='valor predeterminado para la creación de nodos'
                            defaultValue={value1 || 1}
                            error={valueError}
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <FormControl fullWidth className='mt-5'>
                            <InputLabel id="tipo">Tipo de value</InputLabel>
                            <Select
                                labelId="tipo"
                                disabled={isInputDisabled}
                                id="tipo"
                                value={tipo}
                                error={valueError}
                                label="Tipo de nodo"
                                onChange={handleChange}
                            >
                                <MenuItem value={'Peso'}>Peso</MenuItem>
                                <MenuItem value={'distancia'}>Distancia</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControlLabel control={<Checkbox onChange={handleCheckboxChange} />} label="Actualizar valor" 
                        className='font-light' />
                    </FormControl>
                </Box>
            </Box>
            <Box className=' flex flex-row items-center justify-around space-x-4'>
                <Box className='flex mb-5'>
                    <form onSubmit={handleSubmit2}>
                        <Button variant='contained'
                            color='primary'
                            type="submit"
                            title='eliminar'
                            endIcon={<DeleteIcon />}
                            className='bg-red-700'>Eliminar</Button>
                    </form>
                </Box>
                <Box className='flex mb-5'>
                    <form onSubmit={handleSubmit3}>
                        <Button variant='contained'
                            color='primary'
                            type="submit"
                            title='actualizar'
                            endIcon={<SendIcon />}>Actualizar</Button>
                    </form>
                </Box>
                <Box className='flex mb-5'>
                    <form onSubmit={handleSubmit}>
                        <Button variant='contained'
                            color='primary'
                            type="submit"
                            title='crear'
                            endIcon={<SendIcon />}
                            className='bg-green-700'>Crear</Button>
                    </form>
                </Box>
            </Box>

        </Container>
    );
};
export default DashboardAdmin;