import { useEffect, useState } from 'react'
import { Button, Grid, IconButton, InputAdornment, TextField, Paper, useMediaQuery } from '@mui/material'
// import axiosClient from '../config/AxiosClient'
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import useStyles from '../assets/css/js/styles'
import { useTheme } from '@mui/material/styles';

import { loginAction } from '../redux/actions/AuthAction'

//Icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useNavigate } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout'

import Carousel from 'react-material-ui-carousel'

function Item(props) {
    return (
        <Paper style={{ height: '100%', textAlign: 'center' }}>
            <h2> ¡ Echa un vistazo a nuestros productos !</h2>
            <p>{props.item.description}</p>

            <img src={props.item.img} style={{ height: "500px", borderRadius: '20px', cursor: 'pointer', width: '100%' }} />
        </Paper>
    )
}

export default function Login() {

    // Dispatch Instance
    const dispatch = useDispatch();

    // Redux State Extraction
    // const { userT } = useSelector((state) => state.auth);

    // Snackbar Instance
    const { enqueueSnackbar } = useSnackbar();

    //Router
    const navigate = useNavigate();

    //Styles
    const classes = useStyles();
    const theme = useTheme();

    const matches1 = useMediaQuery(theme.breakpoints.down('md'));
    const matches2 = useMediaQuery(theme.breakpoints.only('xs'));
    const matches3 = useMediaQuery(theme.breakpoints.down('sm'));

    var items = [
        {
            description: "Batería de Cocina Familia, 23 piezas | Utensilios premium americanos de cocina, en acero inoxidable",
            img: 'https://www.classicaregal.com/datas/1543866059_set-familiar-23-piezas-classica-foco-1.jpg'
        },
        {
            description: "Productos negros de cocina para la darks que llevas dentro | CocinaDelirante",
            img: 'https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2019/07/amazoncocinanegraportada22.jpg'
        },
        {
            description: "Catálogo Menaje Cocina para profesionales de hostelería",
            img: 'https://blog.munozbosch.com/wp-content/uploads/2016/07/catalogo-menaje-cocina-para-profesionales-hosteleria-utensilios.png'
        },
        {
            description: "Lista de utensilios de cocina necesarios y su uso",
            img: 'https://mihogarchic.com/wp-content/uploads/2018/05/utensilios-de-cocina.jpg'
        },
        {
            description: "10 utensilios o aparatos de cocina que te facilitarán la vida | Cocina Vital",
            img: 'https://www.cocinavital.mx/wp-content/uploads/2017/01/utensilios-o-aparatos-de-cocina-que-facilitara%CC%81n-tu-vida.jpg'
        },

    ]



    return (
        <>
            <MainLayout>

            </MainLayout>
            <Grid container justifyContent="center" alignItems="center" className={classes.login}>
                <Grid item md={10} style={{
                    backgroundColor: '#fff',
                    padding: '30px',
                    borderRadius: '20px',
                    marginTop: '3rem'
                }}>
                    <div
                        style={{ width: '100%', height: '800px' }}
                    >
                        <Carousel
                            navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
                                style: {
                                    backgroundColor: '#fff',
                                    borderRadius: '20px'
                                }
                            }}
                        >
                            {
                                items.map((item, i) =>
                                    <Item key={i} item={item} />)
                            }
                        </Carousel>
                    </div>

                </Grid>
            </Grid>
        </>

    )
}
