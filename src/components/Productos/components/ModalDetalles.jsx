import { Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, Switch, TextField, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'

import useStyles from '../../../assets/css/js/styles'
import { useTheme } from '@mui/material/styles';

import { useSnackbar } from 'notistack';

import { useDispatch, useSelector } from 'react-redux';

import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

//Actions
import { searchProductsAllAction, editProductsAction, deleteProductsAction, searchProductsAction } from '../../../redux/actions/ProductsAction'

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

    const editProduct = () => {
        dispatch(editProductsAction(data, enqueueSnackbar))
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
                {data.reference}
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
                            disabled={!editMode}
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
                            disabled={!editMode}
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
                            disabled={!editMode}
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
                            disabled={!editMode}
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
                            disabled={!editMode}
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
                            name="quantity"
                            label="Cantidad"
                            value={data.quantity}
                            InputLabelProps={{
                                shrink: true
                            }}
                            disabled={!editMode}
                            onChange={handleChange}
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
                                disabled={!editMode}
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
                            // 
                            value={data.description}
                            disabled={!editMode}
                            InputLabelProps={{
                                shrink: true
                            }}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                {(user.type === "ASE" || user.type === "ADMIN") && (
                    <Grid container justify="center" alignItems="center" spacing={2} style={{ marginTop: '10px' }}>
                        {editMode ? (
                            <>
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
                                        startIcon={<CheckIcon />}
                                        fullWidth
                                        onClick={() => editProduct()}
                                    >
                                        Guardar Cambios
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
                                            setData(initialData)
                                            setEditMode(false)
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                </Grid>
                            </>
                        ) : (
                            <>
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
                                        onClick={() => setEditMode(true)}
                                    >
                                        Editar
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
                                        startIcon={<CloseIcon />}
                                        fullWidth
                                        onClick={() => {
                                            dispatch(deleteProductsAction(data.reference, enqueueSnackbar))
                                            handleCloseModal()
                                        }}
                                    >
                                        Eliminar
                                    </Button>
                                </Grid>
                            </>
                        )}

                    </Grid>
                )}
            </DialogContent>
        </Dialog>
    )
}
