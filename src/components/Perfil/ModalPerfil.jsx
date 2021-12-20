import { useState } from 'react'
import { Grid, Button, Dialog, DialogContent, DialogTitle, TextField, IconButton, FormControl, InputLabel, Select, useMediaQuery, MenuItem } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux';

import useStyles from '../../assets/css/js/styles'
import { useTheme } from '@mui/material/styles';

import { useSnackbar } from 'notistack';

//Actions
import { editUserAction } from '../../redux/actions/UserAction'
import { usuarioAction } from '../../redux/actions/AuthAction'

// Material UI Icons
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

export default function Usuarios({ modal, handleCloseModal }) {

    //Styles
    const classes = useStyles();
    const theme = useTheme();

    // Dispatch Instance
    const dispatch = useDispatch();

    // Snackbar Instance
    const { enqueueSnackbar } = useSnackbar();

    // Redux State Extraction
    const { user } = useSelector((state) => state.auth);

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
    const [data, setData] = useState(user)

    const handleChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const editUsuario = () => {
        if (data.name !== "") {
            dispatch(editUserAction(data, enqueueSnackbar))
            sessionStorage.setItem('userData', JSON.stringify(data));
            dispatch(usuarioAction(data))
        } else {
            enqueueSnackbar(" ¡ No puedes guardar sin un nombre ! ", { variant: 'error' });
        }
    }

    const matches2 = useMediaQuery(theme.breakpoints.only('xs'));

    return (
        <>
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
                {!matches2 && (
                    <IconButton
                        style={{ position: "absolute", top: "2%", left: "90%" }}
                        onClick={() => handleCloseModal()}
                    >
                        <CloseIcon style={{ color: "gray", fontSize: 30 }}></CloseIcon>
                    </IconButton>
                )}
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
                                InputProps={{
                                    readOnly: true,
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
                                fullWidth
                                label="Identificación"
                                inputProps={{ maxLength: 10 }}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                InputProps={{
                                    readOnly: true,
                                }}
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
                                name="name"
                                label="Nombres"
                                value={data.name}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                // InputProps={{
                                //     readOnly: true,
                                // }}
                                onChange={handleChange}
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
                                InputProps={{
                                    onlyRead: true
                                }}
                                value={data.birthtDay !== "" ? data.birthtDay.split('T')[0] : ""}
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
                                InputProps={{
                                    readOnly: true,
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
                                fullWidth
                                label="Telefono"
                                inputProps={{ maxLength: 10 }}
                                value={data.cellPhone}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                InputProps={{
                                    readOnly: true,
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
                                fullWidth
                                name="zone"
                                label="Zona"
                                inputProps={{ maxLength: 10 }}
                                value={data.zone}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                onChange={handleChange}
                                InputProps={{
                                    readOnly: true,
                                }}
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
                                disabled
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
                    <Grid container justify="center" alignItems="center" style={{marginTop:'20px'}} spacing={2}>
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
                                fullWidth
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
                                fullWidth
                                startIcon={<CloseIcon />}
                                onClick={() => handleCloseModal()}
                            >
                                Cancelar
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
}
