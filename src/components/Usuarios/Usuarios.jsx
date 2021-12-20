import { useEffect, useState } from 'react'
import { Grid, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, List, ListItem, ListItemText, Divider, TableRow, Paper, TableContainer, Table, TableHead, TableCell, TableBody, TablePagination, MenuItem, Menu, Typography, CardHeader, Card, Box, Tooltip, Fab, IconButton, FormControl, InputLabel, Select, FormControlLabel, useMediaQuery } from '@mui/material'

// import axiosClient from '../config/AxiosClient'

import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import useStyles from '../../assets/css/js/styles'
import { useTheme } from '@mui/material/styles';

//Actions
import { searchUserAllAction, editUserAction, deleteUserAction, searchUserAction } from '../../redux/actions/UserAction'

// Material UI Icons
import SearchIcon from "@mui/icons-material/Search";
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
import AppsIcon from '@mui/icons-material/Apps';


import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import useModal from '../../hooks/useModal';


export default function Usuarios() {

    //Styles
    const classes = useStyles();
    const theme = useTheme();

    // Dispatch Instance
    const dispatch = useDispatch();

    // Snackbar Instance
    const { enqueueSnackbar } = useSnackbar();

    //Hooks
    const [modal, openModal, closeModal] = useModal();
    const [modalDelete, openModalDelete, closeModalDelete] = useModal();

    // Redux State Extraction
    const { user } = useSelector((state) => state.auth);
    const { usersArray, initialStateUsers } = useSelector((state) => state.userR);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [searchData, setSearchData] = useState("");
    const [addState, setAddState] = useState(false);
    const [initialState, setInitialState] = useState({
        id: '',
        identification: "",
        name: "",
        birthtDay: "",
        monthBirthtDay: "",
        address: "",
        cellPhone: "",
        email: "",
        password: "",
        zone: "",
        type: ""
    })
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
            [e.target.name]: e.target.value.toUpperCase()
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
        dispatch(searchUserAllAction(enqueueSnackbar))
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

    useEffect(() => {
        if (usersArray.length !== 0) {
            const filterData = initialStateUsers.filter((i) => {
                return (
                    i.name.toString().toLowerCase().includes(searchData.toString()) ||
                    i.identification.toString().toLowerCase().includes(searchData.toString()) ||
                    i.id.toString().toLowerCase().includes(searchData.toString()) ||
                    i.monthBirthtDay.toString().toLowerCase().includes(searchData.toString()) ||
                    i.address.toString().toLowerCase().includes(searchData.toString()) ||
                    i.email.toString().toLowerCase().includes(searchData.toString())
                );
            });
            dispatch(searchUserAction(filterData))
        } else {
            dispatch(searchUserAction(initialStateUsers))
        }
    }, [searchData]);

    useEffect(() => {
        if (addState || editState) {
            handleOpenModal();
        }
    }, [addState, editState]);

    const handleOpenModal = () => {
        if (addState) {
            setAddState(true);
            setEditState(false);
            setData(initialState);
        }
        openModal();
    };

    const handleCloseModal = () => {
        setAddState(false);
        setEditState(false);
        setData(initialState);
        closeModal();
    };

    const handleClickMenu = (idButton) => {
        switch (idButton) {
            case "back":
                // setAddState(false);
                setBotonQuitarPermisos(false);
                setEditMode(false);
                setSearchState(false);
                if (searchData.length !== 0) {
                    // setSearchResult(initialState);
                    setSearchData("");
                }
                break;
            case "add":
                setAddState(true);
                break;
            case "delete":
                setBotonQuitarPermisos(true);
                break;
            case "edit":
                setEditMode(true);
                break;
            case "search":
                setSearchState(true);
                break;
            default:
                break;
        }
    };

    const handleEditUser = (item) => {
        if (editMode) {
            setData(item);
            //   setIdToEdit(item.id);
            setEditState(true);
        }
    };

    const editUsuario = () => {
        dispatch(editUserAction(data, enqueueSnackbar))
    }

    const handleClose = () => {
        setData(initialState);
        closeModalDelete()
    };

    const matches1 = useMediaQuery(theme.breakpoints.down('md'));
    const matches2 = useMediaQuery(theme.breakpoints.only('xs'));
    const matches3 = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            <Dialog
                open={modalDelete}
                onClose={() => handleClose()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={"sm"}
                fullWidth={true}
            >
                <DialogTitle className={classes.modalTittle}>
                    Eliminar Permisos
                </DialogTitle>
                <IconButton
                    style={{ position: "absolute", top: "2%", left: "90%" }}
                    onClick={() => handleClose()}
                >
                    <CloseIcon style={{ color: "gray", fontSize: 30 }}></CloseIcon>
                </IconButton>
                <DialogContent dividers>
                    <Grid container justify="center" alignItems="center">
                        <Grid item md={12} sm={12} xs={12} style={{ textAlign: 'center' }}>
                            <p>
                                ¿ Esta seguro que desea eliminar al usuario <b> {data.name} </b> ?
                            </p>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogContent dividers>
                    <Grid container justify="center" alignItems="center">
                        <Grid
                            item
                            md={6}
                            sm={12}
                            xs={12}
                            className="text-center mb-3"
                            style={{ textAlign: "center" }}
                        >
                            <Button
                                color="primary"
                                variant="contained"
                                startIcon={<CheckIcon />}
                                onClick={() => {
                                    dispatch(deleteUserAction(data.id, enqueueSnackbar))
                                    handleClose()
                                }}
                            >
                                Aceptar
                            </Button>
                        </Grid>
                        <Grid
                            item
                            md={6}
                            sm={12}
                            xs={12}
                            className="text-center mb-3"
                            style={{ textAlign: "center" }}
                        >
                            <Button
                                color="secondary"
                                variant="contained"
                                startIcon={<CloseIcon />}
                                onClick={() => handleClose()}
                            >
                                Cancelar
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>

            <Dialog
                open={modal}
                onClose={() => handleCloseModal()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={"sm"}
                fullWidth={true}
            >
                <DialogTitle className={classes.modalTittle}>
                    Editar Usuario
                </DialogTitle>
                <IconButton
                    style={{ position: "absolute", top: "2%", left: "90%" }}
                    onClick={() => handleCloseModal()}
                >
                    <CloseIcon style={{ color: "gray", fontSize: 30 }}></CloseIcon>
                </IconButton>
                <DialogContent dividers>
                    <Grid container justify="center" alignItems="center" spacing={2}>
                        <Grid
                            item
                            md={12}
                            sm={12}
                            xs={12}
                        >
                            <TextField
                                type="text"
                                variant="outlined"
                                fullWidth
                                label="Correo Electronico"
                                value={data.email}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                disabled
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
                                fullWidth
                                label="Identificación"
                                inputProps={{ maxLength: 10 }}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                disabled
                                value={data.identification}
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
                                fullWidth
                                label="Nombres"
                                value={data.name}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                disabled
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
                                fullWidth
                                label="Fecha de Nacimiento"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                disabled
                                value={data.birthtDay.split('T')[0]}
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
                                fullWidth
                                label="Dirección"
                                value={data.address}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                disabled
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
                                fullWidth
                                label="Telefono"
                                inputProps={{ maxLength: 10 }}
                                value={data.cellPhone}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                disabled
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
                                fullWidth
                                name="zone"
                                label="Zona"
                                inputProps={{ maxLength: 10 }}
                                value={data.zone}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid
                            item
                            md={12}
                            sm={12}
                            xs={12}
                        >
                            <FormControl
                                variant="outlined"
                                style={{ width: '100%' }}
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
                                    value={data.type}
                                    onChange={(e) => handleChange(e)}
                                    label="Tipo Usuario"
                                >
                                    <MenuItem value="CLIENTE">
                                        <em> CLIENTE </em>
                                    </MenuItem>
                                    <MenuItem value="ASE">
                                        <em> ASESOR </em>
                                    </MenuItem>
                                    <MenuItem value="ADMIN">
                                        <em> ADMINISTRADOR </em>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogContent dividers>
                    <Grid container justify="center" alignItems="center">
                        <Grid
                            item
                            md={6}
                            sm={12}
                            xs={12}
                            className="text-center mb-3"
                            style={{ textAlign: "center" }}
                        >
                            <Button
                                color="primary"
                                variant="contained"
                                startIcon={<CheckIcon />}
                                onClick={() => editUsuario()}
                            >
                                Guardar Cambios
                            </Button>
                        </Grid>
                        <Grid
                            item
                            md={6}
                            sm={12}
                            xs={12}
                            className="text-center mb-3"
                            style={{ textAlign: "center" }}
                        >
                            <Button
                                color="primary"
                                variant="outlined"
                                startIcon={<CloseIcon />}
                                onClick={() => handleCloseModal()}
                            >
                                Cancelar
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>


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
                                title="USUARIOS"
                            />
                        </Card>
                    </Box>
                    {!matches2 && (
                        <SpeedDial
                            style={{ marginTop: "30px" }}
                            direction="rigth"
                            ariaLabel="SpeedDial openIcon example"
                            hidden={hidden}
                            onClose={handleCloseDial}
                            onOpen={handleOpenDial}
                            icon={<AppsIcon />}
                            open={open}
                        >
                            {actions.map((action) => (
                                <SpeedDialAction
                                    key={action.mode}
                                    icon={action.icon}
                                    tooltipTitle={action.name}
                                    tooltipPlacement="bottom"
                                    onClick={handleCloseDial}
                                    onClick={() => handleClickMenu(action.mode)}
                                />
                            ))}
                        </SpeedDial>
                    )}

                    {searchState && (
                        <Grid container style={{ textAlign: "center", marginTop: "40px" }}>
                            <Grid item md={12} sm={12} xs={12} className="text-center mb-3">
                                <TextField
                                    style={{ width: "50%" }}
                                    required={false}
                                    type="text"
                                    name="searchData"
                                    // id="searchData"
                                    variant="outlined"
                                    // className={classes.width}
                                    label="Busqueda"
                                    // placeholder="Ingrese un termino para realizar la busqueda"
                                    value={searchData}
                                    onChange={(e) => setSearchData(e.target.value.toLowerCase())}
                                />
                            </Grid>
                        </Grid>
                    )}
                    <Grid item md={12} className="text-center" style={{ marginTop: '20px' }}>
                        <TableContainer
                            component={Paper}
                            style={{ borderRadius: "20px" }}
                            elevation={5}
                        >
                            <Table className={classes.table} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography
                                                // className={classes.typography}
                                                align="center"
                                                variant="body2"
                                            >
                                                IDENTIFICACIÓN
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                // className={classes.typography}
                                                align="center"
                                                variant="body2"
                                            >
                                                NOMBRES
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                // className={classes.typography}
                                                align="center"
                                                variant="body2"
                                            >
                                                CORREO
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                // className={classes.typography}
                                                align="center"
                                                variant="body2"
                                            >
                                                DIRECCION
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                // className={classes.typography}
                                                align="center"
                                                variant="body2"
                                            >
                                                TELEFONO
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                // className={classes.typography}
                                                align="center"
                                                variant="body2"
                                            >
                                                TIPO USUARIO
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {usersArray.slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    ).map(userList => (
                                        <TableRow key={userList.id} onClick={() => {
                                            if (editMode) {
                                                if (userList.id !== user.id) {
                                                    handleEditUser(userList)
                                                } else {
                                                    enqueueSnackbar(" ¡ No puedes editar tus propios datos ! ", { variant: 'error' });
                                                }
                                            }
                                        }}>
                                            <TableCell>
                                                <Typography
                                                    // className={classes.typography}
                                                    align="center"
                                                    variant="body2"
                                                >
                                                    {userList.identification}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    // className={classes.typography}
                                                    align="center"
                                                    variant="body2"
                                                >
                                                    {userList.name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    // className={classes.typography}
                                                    align="center"
                                                    variant="body2"
                                                >
                                                    {userList.email}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    // className={classes.typography}
                                                    align="center"
                                                    variant="body2"
                                                >
                                                    {userList.address}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    // className={classes.typography}
                                                    align="center"
                                                    variant="body2"
                                                >
                                                    {userList.cellPhone}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    // className={classes.typography}
                                                    align="center"
                                                    variant="body2"
                                                >
                                                    {userList.type === "ADMIN" ? "ADMINISTRADOR" : userList.type === "ASE" ? "ASESOR" : userList.type}
                                                </Typography>
                                            </TableCell>
                                            {botonQuitarPermisos && (
                                                <TableCell>
                                                    <Button
                                                        startIcon={<DeleteIcon />}
                                                        color="primary"
                                                        variant="contained"
                                                        onClick={() => {
                                                            openModalDelete()
                                                            setData(userList)
                                                        }}
                                                    >
                                                        Eliminar
                                                    </Button>
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    ))}

                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5]}
                            component="div"
                            count={usersArray.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
