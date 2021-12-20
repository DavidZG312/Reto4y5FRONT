import { useEffect, useState } from 'react'
import { Button, Grid, IconButton, InputAdornment, TextField } from '@mui/material'
// import axiosClient from '../config/AxiosClient'
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import useStyles from '../assets/css/js/styles'

import { loginAction } from '../redux/actions/AuthAction'

//Icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useNavigate } from 'react-router-dom';

export default function Login() {

    // Dispatch Instance
    const dispatch = useDispatch();

    // Redux State Extraction
    const { user } = useSelector((state) => state.auth);

    // Snackbar Instance
    const { enqueueSnackbar } = useSnackbar();

    //Router
    const navigate = useNavigate();

    //Styles
    const classes = useStyles();

    const [data, setData] = useState({
        correo: '',
        contraseña: ''
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

    const iniciarSesion = () => {
        if (!correoValido) {
            if (data.correo !== "" && data.contraseña !== "") {
                setError(false)
                dispatch(loginAction(data.correo, data.contraseña, enqueueSnackbar))
            } else {
                enqueueSnackbar("Digitar todos los campos", { variant: 'warning' });
                setError(true)
            }
        } else {
            enqueueSnackbar("Correo no valido", { variant: 'warning' });
        }

    }

    useEffect(() => {
        if (user.id && user.id !== '' && user.id !== null) {
            if (data.correo !== '' && data.contraseña) {
                enqueueSnackbar('Bienvenido a La Sarten por el Mango: ' + user.name, { variant: 'success' });
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            }
        } else {
            if (data.correo !== '' && data.contraseña) {
                enqueueSnackbar("El Correo o Contraseña son incorrectos", {
                    variant: 'error'
                });
                // setSpinner(false)
                // setFirst(false);
            }
        }
    }, [user]);

    return (
        <Grid container justifyContent="center" alignItems="center" className={classes.login}>
            <Grid item xl={4} lg={5} md={6} sm={10} xs={12} style={{
                backgroundColor: '#fff',
                padding: '30px',
                borderRadius: '20px',
                border: '2px solid #2196f3'
            }}>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <h1 style={{ color: '#2196f3' }}>
                        Iniciar Sesión
                    </h1>
                    <Grid
                        item
                        xs={12}
                    >
                        <TextField
                            type="text"
                            variant="outlined"
                            name="correo"
                            fullWidth
                            label="Correo Electronico"
                            onChange={handleChange}
                            value={data.correo}
                            error={(error && data.correo === "") || (correoValido && data.correo !== "")}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    iniciarSesion()
                                }
                            }}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                    >
                        <TextField
                            type={visibility ? "text" : "password"}
                            variant="outlined"
                            name="contraseña"
                            fullWidth
                            label="Contraseña"
                            onChange={handleChange}
                            value={data.contraseña}
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
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    iniciarSesion()
                                }
                            }}
                        />
                    </Grid>
                    <Grid container spacing={2} style={{ marginTop: '10px' }}>
                        <Grid
                            item
                            xs={6}
                            style={{ textAlign: 'center' }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={iniciarSesion}
                            >
                                Iniciar Sesión
                            </Button>
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            style={{ textAlign: 'center' }}
                        >
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => navigate("/register")}
                            >
                                Registrarme
                            </Button>
                        </Grid>
                    </Grid>

                </Grid>

            </Grid>
        </Grid>
    )
}
