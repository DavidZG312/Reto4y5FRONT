import { useEffect, useState } from 'react'
import { Grid, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, List, ListItem, ListItemText, Divider, TableRow, Paper, TableContainer, Table, TableHead, TableCell, TableBody, TablePagination, MenuItem, Menu, Typography, CardHeader, Card, Box, Tooltip, Fab, IconButton, FormControl, InputLabel, Select, FormControlLabel, useMediaQuery, InputAdornment } from '@mui/material'

// import axiosClient from '../config/AxiosClient'

import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import useStyles from '../../assets/css/js/styles'
import { useTheme } from '@mui/material/styles';

//Actions
import { searchOrdenesAllAction, initialStateOrdenesAction, searchOrdenesAction } from '../../redux/actions/OrdenesAction'

// Material UI Icons
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import CheckIcon from "@mui/icons-material/Check";
import RemoveIcon from "@mui/icons-material/Remove";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import AppsIcon from '@mui/icons-material/Apps';

import useModal from '../../hooks/useModal';

import CardOrdenes from './components/Card'
import ModalDetalles from './components/ModalDetalles';
import ModalAgregar from './components/ModalAgregar';
import axiosClient from '../../config/AxiosClient';


export default function Ordenes() {

    //Styles
    const classes = useStyles();
    const theme = useTheme();

    // Dispatch Instance
    const dispatch = useDispatch();

    // Snackbar Instance
    const { enqueueSnackbar } = useSnackbar();

    //Hooks
    const [modal, openModal, closeModal] = useModal();
    const [modalAdd, openModalAdd, closeModalAdd] = useModal();

    // Redux State Extraction
    const { user } = useSelector((state) => state.auth);
    const { ordenesArray, initialStateOrdenes } = useSelector((state) => state.ordenes);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [searchData, setSearchData] = useState("");
    const [searchDataType, setSearchDataType] = useState("precio");
    const [searchDataUser, setSearchDataUser] = useState("");
    const [addState, setAddState] = useState(false);
    const initialState = {
        id: "",
        registerDay: new Date(),
        status: "Pendiente",
        salesMan: user,
        products: "",
        quantities: ""
    }
    const [data, setData] = useState(initialState)
    const [editState, setEditState] = useState(false);
    const [botonQuitarPermisos, setBotonQuitarPermisos] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [searchState, setSearchState] = useState(false);
    const [actions, setActions] = useState([
        { icon: <EditIcon />, name: <Typography>Editar</Typography>, mode: "edit" },
        {
            icon: <DeleteIcon />,
            name: <Typography>Eliminar</Typography>,
            mode: "delete",
        },
        {
            icon: <SearchIcon />,
            name: <Typography>Buscar</Typography>,
            mode: "search",
        },
    ]);

    const handleChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleOpenDial = () => setOpen(true);
    const handleCloseDial = () => setOpen(false);


    useEffect(() => {
        dispatch(searchOrdenesAllAction(enqueueSnackbar))
    }, [])

    const [usuarios, setUsuarios] = useState([])
    useEffect(() => {
        const query = async () => {
            try {
                const response = await axiosClient.get('/api/user/all');
                const filter = response.data.filter(item => item.type === "ASE" || item.type === "ADMIN")
                setUsuarios(filter)
            } catch (error) {

            }
        };
        query()
    }, [])

    useEffect(() => {
        if (!editMode && !botonQuitarPermisos && !searchState) {
            setActions([
                {
                    icon: <EditIcon />,
                    name: <Typography>Editar</Typography>,
                    mode: "edit",
                },
                {
                    icon: <DeleteIcon />,
                    name: <Typography>Eliminar</Typography>,
                    mode: "delete",
                },
                {
                    icon: <SearchIcon />,
                    name: <Typography>Buscar</Typography>,
                    mode: "search",
                },
            ]);
        }
        if (botonQuitarPermisos || editMode || searchState) {
            setActions([
                {
                    icon: <KeyboardReturnIcon />,
                    name: <Typography>Volver</Typography>,
                    mode: "back",
                },
            ]);
        }
    }, [editMode, botonQuitarPermisos, searchState]);

    const handleCloseModal = () => {
        setAddState(false);
        setEditState(false);
        setData(initialState);
        closeModal();
    };

    const handleCloseModalAdd = () => {
        setAddState(false);
        setEditState(false);
        setData(initialState);
        closeModalAdd();
    };

    const matches1 = useMediaQuery(theme.breakpoints.down('md'));
    const matches2 = useMediaQuery(theme.breakpoints.only('xs'));
    const matches3 = useMediaQuery(theme.breakpoints.down('sm'));



    return (
        <>
            {modal && (
                <ModalDetalles modal={modal} data={data} setData={setData} handleCloseModal={handleCloseModal} />
            )}
            {modalAdd && (
                <ModalAgregar modal={modalAdd} data={data} setData={setData} handleCloseModal={handleCloseModalAdd} />
            )}

            <Grid container justifyContent="center" alignItems="center" className={classes.login}>
                <Grid item md={10} style={{
                    backgroundColor: '#fff',
                    padding: '30px',
                    borderRadius: 30,
                    marginTop: '3rem'
                }}
                >
                    <Box mt={2}>
                        <Card className={classes.media} >
                            <CardHeader
                                elevation={5}
                                className={classes.textCard}
                                title="ORDENES"
                            />
                        </Card>
                    </Box>

                    <Grid container spacing={2}>
                        {user.type !== "CLIENTE" && (
                            <Grid item md={2} sm={6} xs={12} >
                                <Button variant="contained" fullWidth onClick={() => {
                                    setData(initialState)
                                    openModalAdd()
                                }}>
                                    AÑADIR
                                </Button>
                            </Grid>
                        )}

                        <Grid item md={2} sm={6} xs={12} >
                            <Button variant="contained" fullWidth onClick={() => {
                                setSearchState(!searchState)
                                if (searchState) {
                                    dispatch(initialStateOrdenesAction(initialStateOrdenes))
                                    setSearchData("")
                                }
                            }}>
                                {searchState ? "CANCELAR" : "BUSCAR"}
                            </Button>
                        </Grid>
                        {searchState && (
                            <>
                                <Grid
                                    item
                                    md={2}
                                    sm={4}
                                    xs={12}
                                >
                                    <FormControl
                                        variant="outlined"
                                        style={{ width: '100%' }}
                                        size="small"
                                    // className={classes.formControl}
                                    >
                                        <InputLabel id="demo-simple-select-outlined-label">
                                            Tipo Usuario
                                        </InputLabel>
                                        <Select
                                            style={{ width: '100%' }}
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            name="type"
                                            value={searchDataType}
                                            onChange={(e) => {
                                                setSearchData("")
                                                setSearchDataType(e.target.value)
                                                setSearchDataUser("")
                                            }}
                                            label="Tipo de Busqueda"
                                        >
                                            <MenuItem value="zona">
                                                <em> ZONA </em>
                                            </MenuItem>
                                            {user.type === "ADMIN" && (
                                                <MenuItem value="vendedor">
                                                    <em> VENDEDOR </em>
                                                </MenuItem>
                                            )}
                                            {user.type === "ADMIN" && (
                                                <MenuItem value="estadoyvendedor">
                                                    <em> ESTADO Y VENDEDOR </em>
                                                </MenuItem>
                                            )}
                                            {user.type === "ADMIN" && (
                                                <MenuItem value="fechayvendedor">
                                                    <em> FECHA Y VENDEDOR </em>
                                                </MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                {searchDataType === "estadoyvendedor" && (
                                    <Grid
                                        item
                                        md={2}
                                        sm={4}
                                        xs={12}
                                    >
                                        <FormControl
                                            variant="outlined"
                                            style={{ width: '100%' }}
                                            size="small"
                                        // className={classes.formControl}
                                        >
                                            <InputLabel id="demo-simple-select-outlined-label">
                                            Estado del Pedido
                                            </InputLabel>
                                            <Select
                                                style={{ width: '100%' }}
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                name="type"
                                                value={searchData}
                                                onChange={(e) => {
                                                    setSearchData(e.target.value)
                                                }}
                                                label="Estado del Pedido"
                                            >
                                                <MenuItem value="Pendiente">
                                                    <em> PENDIENTE </em>
                                                </MenuItem>
                                                <MenuItem value="Aprobada">
                                                    <em> APROBADA </em>
                                                </MenuItem>
                                                <MenuItem value="Rechazada">
                                                    <em> RECHAZADA </em>
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                )}
                                {(searchDataType === "vendedor" || searchDataType === "estadoyvendedor" || searchDataType === "fechayvendedor") && (
                                    <Grid
                                        item
                                        md={2}
                                        sm={4}
                                        xs={12}
                                    >
                                        <FormControl
                                            variant="outlined"
                                            style={{ width: '100%' }}
                                            size="small"
                                        // className={classes.formControl}
                                        >
                                            <InputLabel id="demo-simple-select-outlined-label">
                                                Tipo Usuario
                                            </InputLabel>
                                            <Select
                                                style={{ width: '100%' }}
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                name="type"
                                                value={searchDataUser}
                                                onChange={(e) => {
                                                    setSearchDataUser(e.target.value)
                                                }}
                                                label="Usuario"
                                            >
                                                {usuarios.map(usuario => (
                                                    <MenuItem value={usuario.id}>
                                                        <em> {usuario.name} </em>
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                )}
                                {(searchDataType === "vendedor" || searchDataType === "estadoyvendedor") && (
                                    <Grid
                                        item
                                        md={2}
                                        sm={4}
                                        xs={12}
                                    >
                                        <IconButton onClick={() => {
                                            if (searchData !== "" || searchDataUser !== "") {
                                                dispatch(searchOrdenesAction(searchDataType, searchData, enqueueSnackbar, searchDataUser))
                                            }
                                        }}>
                                            <SearchIcon />
                                        </IconButton>
                                    </Grid>
                                )}
                                {searchDataType !== "vendedor" && searchDataType !== "estadoyvendedor" && (
                                    <Grid item md={2} sm={4} xs={12} className="text-center mb-3">
                                        <TextField
                                            size="small"
                                            fullWidth
                                            required={false}
                                            type={searchDataType === "fechayvendedor" ? "date" : "text"}
                                            name="searchData"
                                            variant="outlined"
                                            label="Busqueda"
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                            value={searchData}
                                            onChange={(e) => {
                                                if (searchDataType === "precio") {
                                                    const { name, value } = e.target;
                                                    //VALIDACION SOLO NUMEROS
                                                    var expr = /^([0-9])+$/;
                                                    if (expr.test(value) || value === '') {
                                                        setSearchData(value)
                                                    }
                                                } else if (searchDataType === "fechayvendedor") {
                                                    setSearchData(e.target.value)
                                                } else {
                                                    setSearchData(e.target.value.toLowerCase())
                                                }
                                            }}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">
                                                    <IconButton onClick={() => {
                                                        if (searchData !== "" || searchDataUser !== "") {
                                                            dispatch(searchOrdenesAction(searchDataType, searchData, enqueueSnackbar, searchDataUser))
                                                        }
                                                    }}>
                                                        <SearchIcon />
                                                    </IconButton>
                                                </InputAdornment>,
                                            }}
                                        />
                                    </Grid>
                                )}
                            </>
                        )}
                    </Grid>


                    <Grid item md={12} style={{ marginTop: '40px' }}>
                        <Grid container className={classes.cardContent} spacing={2} justifyContent="center" alignContent="center">
                            {ordenesArray.map(orden => (
                                <Grid item md={4} sm={6} xs={12} key={orden.id}>
                                    <CardOrdenes orden={orden} openModal={openModal} setData={setData} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
