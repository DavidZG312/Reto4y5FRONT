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
import { addOrdenesAction, deleteOrdenesAction } from '../../../redux/actions/OrdenesAction'

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

    const [quantities, setQuantities] = useState("")
    const [productosTotal, setProductostotal] = useState("")

    const addOrden = () => {
        if(Object.keys(quantities).length !== 0){
            dispatch(addOrdenesAction({
                ...data,
                id: '',
                products: {
                    ...productosTotal
                },
                quantities: {
                    ...quantities
                }
            }, enqueueSnackbar))
            handleCloseModal()
        } else {
            enqueueSnackbar("Ingrese al menos 1 producto", { variant: 'error' });
        }

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
                                fullWidth
                                label="Vendedor"
                                value={data.salesMan.name}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                disabled
                            />
                        </Grid>
                        <Grid
                            item
                            md={12}
                            sm={12}
                            xs={12}
                        >
                            <Button fullWidth variant="contained" onClick={() => {
                                openModalProductos()
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
                            <Grid container spacing={2} style={{ marginTop: '10px' }}>
                                {quantities !== "" && (
                                    <Grid item xs={12} className={classes.modalTittle}>
                                        CANTIDAD
                                    </Grid>
                                )}
                                {quantities === "" || Object.keys(quantities).length === 0 ? (
                                    <Grid xs={12} style={{ textAlign: 'center', marginTop: '10px' }}>
                                        NO HAY PRODUCTOS SELECCIONADOS
                                    </Grid>
                                ) : (
                                    <>
                                        {
                                            Object.keys(quantities).map(cantidad => (
                                                <>
                                                    <Grid item xs={7} sm={9} md={9}>
                                                        {cantidad}
                                                    </Grid>
                                                    <Grid item xs={1} sm={1} md={1}>
                                                        {quantities[cantidad]}
                                                    </Grid>
                                                    <Grid item xs={2} sm={1} md={1}>
                                                        <IconButton onClick={() => {
                                                            setQuantities({
                                                                ...quantities,
                                                                [cantidad]: quantities[cantidad] + 1
                                                            })
                                                        }}>
                                                            <AddCircleOutlineIcon />
                                                        </IconButton>
                                                    </Grid>
                                                    <Grid item xs={2} sm={1} md={1}>
                                                        <IconButton onClick={() => {
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
                                            ))
                                        }
                                    </>

                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                    {(user.type === "ASE" || user.type === "ADMIN") && (
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
                                    startIcon={<CheckIcon />}
                                    fullWidth
                                    onClick={() => addOrden()}
                                >
                                    Añadir Orden
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
                                        handleCloseModal()
                                    }}
                                >
                                    Cancelar
                                </Button>
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
            </Dialog >
        </>

    )
}
