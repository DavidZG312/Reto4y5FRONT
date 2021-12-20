import { Dialog, DialogContent, DialogTitle, Grid, IconButton, List, ListItem, TextField, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axiosClient from '../../../config/AxiosClient';

import useStyles from '../../../assets/css/js/styles'
import { useTheme } from '@mui/material/styles';

import { useSnackbar } from 'notistack';

import { useDispatch, useSelector } from 'react-redux';

import CloseIcon from "@mui/icons-material/Close";

export default function ModalDetalles({ modal, handleCloseModal, data, setData, quantities, setQuantities, productosTotal, setProductostotal }) {

    //Styles
    const classes = useStyles();
    const theme = useTheme();

    const matches2 = useMediaQuery(theme.breakpoints.only('xs'));

    const [initialData, setInitialData] = useState([])
    const [products, setProducts] = useState([])
    const [searchData, setSearchData] = useState("")

    useEffect(() => {
        const query = async () => {
            try {
                const response = await axiosClient.get('/api/cookware/all');
                setProducts(response.data)
                setInitialData(response.data)
            } catch (error) {
            }
        };
        query()
    }, [])

    useEffect(() => {
        if (searchData.length !== 0) {
            const filterData = initialData.filter((i) => {
                return (
                    i.reference.toLowerCase().includes(searchData)
                );
            });
            setProducts(filterData);
        } else {
            setProducts(initialData);
        }
    }, [searchData]);


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
                    PRODUCTOS
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
                    <Grid container justifyContent="center" alignContent="center">
                        <Grid item xs={10}>
                            <TextField
                                fullWidth
                                value={searchData}
                                onChange={e => setSearchData(e.target.value.toLowerCase())}
                                variant="outlined"
                                label="Busqueda"
                                placeholder='Ingrese el parametro de busqueda'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <List>
                                {products.map(product => (
                                    <ListItem
                                        fullWidth
                                        key={product.reference}
                                        style={{
                                            textAlign: 'center', border: '1px solid gray', cursor: 'pointer'
                                        }}
                                        onClick={() => {
                                            const filter = Object.keys(quantities).filter(item => item === product.reference)
                                            const filterProducts = Object.keys(productosTotal).filter(item => item.reference === product.reference)
                                            if (filter.length !== 0) {
                                                setQuantities({
                                                    ...quantities,
                                                    [product.reference]: quantities[product.reference] + 1
                                                })
                                            } else {
                                                setQuantities({
                                                    ...quantities,
                                                    [product.reference]: 1
                                                })
                                            }
                                            if (filterProducts.length === 0) {
                                                setProductostotal({
                                                    ...productosTotal,
                                                    [product.reference]: product
                                                })
                                            }
                                            handleCloseModal()
                                        }}
                                    >
                                        {product.reference}
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog >
        </>

    )
}
