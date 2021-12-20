import { useEffect, useState } from 'react'
import { Button, Grid, IconButton, InputAdornment, TextField } from '@mui/material'
// import axiosClient from '../config/AxiosClient'
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import useStyles from '../assets/css/js/styles'

import { correoExisteAction, registrarUsuarioAction } from '../redux/actions/AuthAction'

//Icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useNavigate } from 'react-router-dom';

export default function Register() {

    // Dispatch Instance
    const dispatch = useDispatch();

    // Redux State Extraction
    const { correoExiste } = useSelector((state) => state.auth);

    // Snackbar Instance
    const { enqueueSnackbar } = useSnackbar();

    //Router
    const navigate = useNavigate();

    //Styles
    const classes = useStyles();

    const [data, setData] = useState({
        primerNombre: '',
        segundoNombre: '',
        primerApellido: '',
        segundoApellido: '',
        correo: '',
        contraseña: '',
        repetirContraseña: '',
        fechaDeNacimiento: '',
        identificacion: '',
        direccion: '',
        telefono: ''
    })
    const [visibility, setVisibility] = useState(false)
    const [error, setError] = useState(false)

    const handleChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const [correoValido, setCorreoValido] = useState(false)
    useEffect(() => {
        var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z])+\.)+([a-zA-Z]{2,4})+$/;
        if (expr.test(data.correo)) {
            setCorreoValido(false)
        } else {
            setCorreoValido(true)
        }
    }, [data.correo]);

    const crearCuenta = () => {
        let validate = true
        Object.keys(data).map(i => {
            if (data[i] === "" && i !== "segundoNombre") {
                validate = false
            }
        })
        if (!correoValido) {
            if (validate) {
                if (data.contraseña === data.repetirContraseña) {
                    setError(false)
                    dispatch(registrarUsuarioAction({
                        id: "",
                        identification: data.identificacion,
                        name: data.primerNombre + ' ' + data.segundoNombre + ' ' + data.primerApellido + ' ' + data.segundoApellido,
                        birthtDay: new Date(data.fechaDeNacimiento),
                        monthBirthtDay: data.fechaDeNacimiento.substring(5, 1),
                        address: data.direccion,
                        cellPhone: data.telefono,
                        email: data.correo,
                        password: data.contraseña,
                        zone: "",
                        type: "CLIENTE"
                    }, enqueueSnackbar, navigate))
                    setData({
                        primerNombre: '',
                        segundoNombre: '',
                        primerApellido: '',
                        segundoApellido: '',
                        correo: '',
                        contraseña: '',
                        repetirContraseña: '',
                        fechaDeNacimiento: '',
                        identificacion: '',
                        direccion: '',
                        telefono: ''
                    })
                } else {
                    enqueueSnackbar("Las contraseñas deben ser iguales", { variant: 'warning' });
                }
            } else {
                enqueueSnackbar("Digitar todos los campos", { variant: 'warning' });
                setError(true)
            }
        } else {
            enqueueSnackbar("Correo no valido", { variant: 'warning' });
        }
    }

    return (
        <Grid container justifyContent="center" alignItems="center" className={classes.login}>
            <Grid item xl={4} lg={5} md={6} sm={9} xs={12} style={{
                backgroundColor: '#fff',
                padding: '30px',
                borderRadius: '20px',
                border: '2px solid #2196f3'
            }}>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item md={12} style={{ textAlign: 'center' }}>
                        <h1 style={{ color: '#2196f3' }}>
                            Creación de Cuenta
                        </h1>
                    </Grid>
                    <Grid
                        item
                        md={12}
                        sm={12}
                        xs={12}
                    >
                        <TextField
                            type="text"
                            variant="outlined"
                            name="correo"
                            fullWidth
                            label="Correo Electronico"
                            onChange={handleChange}
                            error={(error && data.correo === "") || (correoValido && data.correo !== "") || correoExiste}
                            value={data.correo}
                            onBlur={() => {
                                if (data.correo !== "") {
                                    dispatch(correoExisteAction(data.correo, enqueueSnackbar))
                                }
                            }}
                        />
                    </Grid>
                    <Grid
                        item
                        md={6}
                        sm={6}
                        xs={12}
                    >
                        <TextField
                            type="text"
                            variant="outlined"
                            name="identificacion"
                            fullWidth
                            label="Identificación"
                            inputProps={{ maxLength: 10 }}
                            onChange={handleChange}
                            value={data.identificacion}
                            error={(error && data.identificacion === "")}
                        />
                    </Grid>
                    <Grid
                        item
                        md={6}
                        sm={6}
                        xs={12}
                    >
                        <TextField
                            type="date"
                            variant="outlined"
                            name="fechaDeNacimiento"
                            fullWidth
                            label="Fecha de Nacimiento"
                            InputLabelProps={{
                                shrink: true
                            }}
                            onChange={handleChange}
                            error={error && data.fechaDeNacimiento === ""}
                            value={data.fechaDeNacimiento}
                        />
                    </Grid>

                    <Grid
                        item
                        md={6}
                        sm={6}
                        xs={12}
                    >
                        <TextField
                            type="text"
                            variant="outlined"
                            name="primerNombre"
                            fullWidth
                            label="Primer Nombre"
                            onChange={handleChange}
                            value={data.primerNombre}
                            error={(error && data.primerNombre === "")}
                        />
                    </Grid>
                    <Grid
                        item
                        md={6}
                        sm={6}
                        xs={12}
                    >
                        <TextField
                            type="text"
                            variant="outlined"
                            name="segundoNombre"
                            fullWidth
                            label="Segundo Nombre"
                            onChange={handleChange}
                            value={data.segundoNombre}
                        // error={(error && data.segundoNombre === "")}
                        />
                    </Grid>
                    <Grid
                        item
                        md={6}
                        sm={6}
                        xs={12}
                    >
                        <TextField
                            type="text"
                            variant="outlined"
                            name="primerApellido"
                            fullWidth
                            label="Primer Apellido"
                            onChange={handleChange}
                            value={data.primerApellido}
                            error={(error && data.primerApellido === "")}
                        />
                    </Grid>
                    <Grid
                        item
                        md={6}
                        sm={6}
                        xs={12}
                    >
                        <TextField
                            type="text"
                            variant="outlined"
                            name="segundoApellido"
                            fullWidth
                            label="Segundo Apellido"
                            onChange={handleChange}
                            value={data.segundoApellido}
                            error={(error && data.segundoApellido === "")}
                        />
                    </Grid>
                    <Grid
                        item
                        md={6}
                        sm={6}
                        xs={12}
                    >
                        <TextField
                            type={visibility ? "text" : "password"}
                            variant="outlined"
                            name="contraseña"
                            fullWidth
                            label="Contraseña"
                            value={data.contraseña}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    {visibility ?
                                        <IconButton onClick={() => setVisibility(false)}>
                                            <VisibilityOffIcon />
                                        </IconButton>
                                        :
                                        <IconButton onClick={() => setVisibility(true)}>
                                            <VisibilityIcon />
                                        </IconButton>
                                    }

                                </InputAdornment>,
                            }}
                            error={error && data.contraseña === ""}
                        />
                    </Grid>
                    <Grid
                        item
                        md={6}
                        sm={6}
                        xs={12}
                    >
                        <TextField
                            type={visibility ? "text" : "password"}
                            variant="outlined"
                            name="repetirContraseña"
                            fullWidth
                            label="Repetir Contraseña"
                            onChange={handleChange}
                            value={data.repetirContraseña}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    {visibility ?
                                        <IconButton onClick={() => setVisibility(false)}>
                                            <VisibilityOffIcon />
                                        </IconButton>
                                        :
                                        <IconButton onClick={() => setVisibility(true)}>
                                            <VisibilityIcon />
                                        </IconButton>
                                    }

                                </InputAdornment>,
                            }}
                            error={error && data.contraseña === ""}
                        />
                    </Grid>
                    <Grid
                        item
                        md={6}
                        sm={6}
                        xs={12}
                    >
                        <TextField
                            type="text"
                            variant="outlined"
                            name="direccion"
                            fullWidth
                            label="Dirección"
                            onChange={handleChange}
                            value={data.direccion}
                            error={(error && data.direccion === "")}
                        />
                    </Grid>
                    <Grid
                        item
                        md={6}
                        sm={6}
                        xs={12}
                    >
                        <TextField
                            type="text"
                            variant="outlined"
                            name="telefono"
                            fullWidth
                            label="Telefono"
                            onChange={handleChange}
                            inputProps={{ maxLength: 10 }}
                            value={data.telefono}
                            error={(error && data.telefono === "")}
                        />
                    </Grid>
                    <Grid container spacing={2} style={{ marginBlock: '10px' }}>
                        <Grid
                            item
                            md={6}
                            sm={6}
                            xs={12}
                            style={{ textAlign: 'center', marginTop: '5px' }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={crearCuenta}
                            >
                                Crear Cuenta
                            </Button>
                        </Grid>
                        <Grid
                            item
                            md={6}
                            sm={6}
                            xs={12}
                            style={{ textAlign: 'center', marginTop: '5px' }}
                        >
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => navigate("/")}
                            >
                                Volver
                            </Button>
                        </Grid>
                    </Grid>

                </Grid>

            </Grid>
        </Grid>
    )
}
