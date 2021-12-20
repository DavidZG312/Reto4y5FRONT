import { Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, Switch, TextField, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'

import useStyles from '../../../assets/css/js/styles'
import { useTheme } from '@mui/material/styles';

import { useSnackbar } from 'notistack';

import { useDispatch, useSelector } from 'react-redux';

import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

//Actions
import { addProductsAction, searchProductsAction } from '../../../redux/actions/ProductsAction'

export default function ModalDetalles({ modal, data, setData, handleCloseModal }) {

    //Styles
    const classes = useStyles();
    const theme = useTheme();

    const matches2 = useMediaQuery(theme.breakpoints.only('xs'));

    // Dispatch Instance
    const dispatch = useDispatch();

    // Redux State Extraction
    const { user } = useSelector((state) => state.auth);

    // Snackbar Instance
    const { enqueueSnackbar } = useSnackbar();

    const [editMode, setEditMode] = useState(false);
    const [cargarData, setCargarData] = useState(true)
    const [initialData, setInitialData] = useState("")
    const [error, setError] = useState(false)

    useEffect(() => {
        if (data.reference !== "" && cargarData) {
            setInitialData(data)
            setCargarData(false)
        }
    }, [data])

    const handleChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeInteger = (e) => {
        const { name, value } = e.target;
        //VALIDACION SOLO NUMEROS
        var expr = /^([0-9])+$/;
        if (expr.test(value)) {
            setData({ ...data, [name]: parseInt(value) });
        }
        if (value === '') {
            setData({ ...data, [name]: '' });
        }
    };

    const addProduct = () => {
        let validate = true
        Object.keys(data).map(item => {
            if (data[item] === "") {
                validate = false
            }
        })
        if (validate) {
            dispatch(addProductsAction(data, enqueueSnackbar))
            setError(false)
        } else {
            enqueueSnackbar("Diligenciar todos los campos", { variant: 'error' });
            setError(true)
        }
    }

    return (
        <Dialog
            open={modal}
            onClose={() => handleCloseModal()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth={"sm"}
            fullWidth={true}
        >
            <DialogTitle className={classes.modalTittle}>
                AÑADIR PRODUCTO
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
                            name="reference"
                            fullWidth
                            label="Referencia"
                            value={data.reference}
                            InputLabelProps={{
                                shrink: true
                            }}
                            error={data.reference === "" && error}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid
                        item
                        md={6}
                        sm={12}
                        xs={12}
                    >
                        <TextField
                            type="text"
                            variant="outlined"
                            name="brand"
                            fullWidth
                            label="Tipo"
                            value={data.brand}
                            InputLabelProps={{
                                shrink: true
                            }}
                            error={data.brand === "" && error}
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
                            name="category"
                            label="Categoria"

                            InputLabelProps={{
                                shrink: true
                            }}
                            error={data.category === "" && error}
                            value={data.category}
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
                            name="materiales"
                            fullWidth
                            label="Materiales"
                            value={data.materiales}
                            InputLabelProps={{
                                shrink: true
                            }}
                            error={data.materiales === "" && error}
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
                            name="dimensiones"
                            label="Dimensiones"
                            InputLabelProps={{
                                shrink: true
                            }}
                            error={data.dimensiones === "" && error}
                            value={data.dimensiones}
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
                            name="price"
                            label="Precio"
                            value={data.price}
                            InputLabelProps={{
                                shrink: true
                            }}
                            error={data.price === "" && error}
                            onChange={handleChangeInteger}
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
                            name="quantity"
                            label="Cantidad"
                            value={data.quantity}
                            InputLabelProps={{
                                shrink: true
                            }}
                            error={data.quantity === "" && error}
                            onChange={handleChangeInteger}
                        />
                    </Grid>

                    <Grid
                        item
                        md={12}
                        sm={12}
                        xs={12}
                    >
                        <Typography
                            variant='body2'
                            align='center'
                        >
                            No Disponible
                            <Switch
                                checked={data.availability}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.checked
                                    })
                                }}

                                name="availability"
                                color="primary"
                            />
                            Disponible
                        </Typography>
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
                            fullWidth
                            name="description"
                            label="Descripcion"
                            multiline
                            maxRows={3}
                            inputProps={{ maxLength: 100 }}
                            value={data.description}
                            error={data.description === "" && error}
                            InputLabelProps={{
                                shrink: true
                            }}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <Grid container justify="center" alignItems="center" spacing={2} style={{ marginTop: '10px' }}>
                    <Grid
                        item
                        md={6}
                        sm={12}
                        xs={12}
                        style={{ textAlign: "center" }}
                    >
                        <Button
                            color="primary"
                            variant="contained"
                            fullWidth
                            startIcon={<CheckIcon />}
                            onClick={() => addProduct()}
                        >
                            Añadir Producto
                        </Button>
                    </Grid>
                    <Grid
                        item
                        md={6}
                        sm={12}
                        xs={12}
                        style={{ textAlign: "center" }}
                    >
                        <Button
                            color="primary"
                            variant="outlined"
                            fullWidth
                            startIcon={<CloseIcon />}
                            onClick={() => {
                                handleCloseModal()
                            }}
                        >
                            Cancelar
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
            {/* <DialogContent dividers style={{ minHeight: '100px' }}>

            </DialogContent> */}
        </Dialog>
    )
}
