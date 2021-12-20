import { Button, Dialog, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Switch, TextField, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axiosClient from '../../../config/AxiosClient';

import useStyles from '../../../assets/css/js/styles'
import { useTheme } from '@mui/material/styles';

import { useSnackbar } from 'notistack';

import { useDispatch, useSelector } from 'react-redux';

import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveIcon from "@mui/icons-material/Remove";

//Actions
import { editOrdenesAction, deleteOrdenesAction } from '../../../redux/actions/OrdenesAction'

import useModal from '../../../hooks/useModal'

import ModalProductos from './ModalProductos'

export default function ModalDetalles({ modal, data, setData, handleCloseModal }) {

    //Styles
    const classes = useStyles();
    const theme = useTheme();

    const matches2 = useMediaQuery(theme.breakpoints.only('xs'));

    // Dispatch Instance
    const dispatch = useDispatch();

    //Hooks
    const [modalProductos, openModalProductos, closeModalProductos] = useModal();

    // Redux State Extraction
    const { user } = useSelector((state) => state.auth);

    // Snackbar Instance
    const { enqueueSnackbar } = useSnackbar();

    const [editMode, setEditMode] = useState(false);
    const [cargarData, setCargarData] = useState(true)
    const [initialData, setInitialData] = useState("")
    const [quantities, setQuantities] = useState("")
    const [productosTotal, setProductostotal] = useState("")

    useEffect(() => {
        if (data.id !== "" && cargarData) {
            setInitialData(data)
            setCargarData(false)
            setQuantities(data.quantities)
            setProductostotal(data.products)
        }
    }, [data])

    const editOrden = () => {
        dispatch(editOrdenesAction({
            ...data,
            products: {
                ...productosTotal
            },
            quantities: {
                ...quantities
            }
        }, enqueueSnackbar))
        handleCloseModal()
    }

    return (
        <>
            <ModalProductos modal={modalProductos} handleCloseModal={closeModalProductos} data={data} setData={setData} quantities={quantities} setQuantities={setQuantities} productosTotal={productosTotal} setProductostotal={setProductostotal} />
            <Dialog
                open={modal}
                onClose={() => handleCloseModal()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={"sm"}
                fullWidth={true}
            >
                <DialogTitle className={classes.modalTittle}>
                    ORDEN
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
                                // name="brand"
                                fullWidth
                                label="Vendedor"
                                value={data.salesMan.name}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                disabled
                            // onChange={handleChange}
                            />
                        </Grid>
                        <Grid
                            item
                            md={12}
                            sm={12}
                            xs={12}
                        >
                            <Button disabled={!editMode} fullWidth variant="contained" onClick={() => {
                                if (editMode) {
                                    openModalProductos()
                                }
                            }}>
                                PRODUCTOS
                            </Button>
                        </Grid>

                        <Grid
                            item
                            md={12}
                            sm={12}
                            xs={12}
                        >
                            <Grid container spacing={2} >
                                <Grid item xs={12} className={classes.modalTittle}>
                                    CANTIDAD
                                </Grid>
                                {quantities !== "" ? (
                                    <>
                                        {Object.keys(quantities).map(cantidad => (
                                            <>
                                                <Grid item xs={9}>
                                                    {cantidad}
                                                </Grid>
                                                <Grid item xs={1}>
                                                    {quantities[cantidad]}
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <IconButton disabled={!editMode} onClick={() => {
                                                        setQuantities({
                                                            ...quantities,
                                                            [cantidad]: quantities[cantidad] + 1
                                                        })
                                                    }}>
                                                        <AddCircleOutlineIcon />
                                                    </IconButton>
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <IconButton disabled={!editMode} onClick={() => {
                                                        if (quantities[cantidad] > 1) {
                                                            setQuantities({
                                                                ...quantities,
                                                                [cantidad]: quantities[cantidad] - 1
                                                            })
                                                        } else {
                                                            let newQuantities = new Object();
                                                            Object.keys(quantities).map(item => {
                                                                if (item !== cantidad) {
                                                                    newQuantities[item] = quantities[item]
                                                                }
                                                            })
                                                            setQuantities(newQuantities)
                                                        }
                                                    }}
                                                    >
                                                        <RemoveIcon />
                                                    </IconButton>
                                                </Grid>
                                            </>
                                        ))}
                                    </>
                                ) : (
                                    <p>No hay productos seleccionados</p>
                                )}
                            </Grid>
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
                                            onClick={() => editOrden()}
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
                                                setQuantities(data.quantities)
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
                                                dispatch(deleteOrdenesAction(data.id, enqueueSnackbar))
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
            </Dialog >
        </>

    )
}
