import axiosClient from '../../config/AxiosClient';
import {
    SEARCH_PRODUCTSALL_SUCCESS,
    SEARCH_PRODUCTSALL_ERROR,
    SEARCH_PRODUCTS_FILTER
} from '../types';

export function searchProductsAllAction(enqueueSnackbar) {
    return async (dispatch) => {
        try {
            const response = await axiosClient.get('/api/cookware/all');
            enqueueSnackbar("Se realizo la consulta correctamente", { variant: 'success' });
            dispatch(searchProductsAllSuccess(response.data))
        } catch (error) {
            dispatch(searchProductsAllError())
        }
    };
}

const searchProductsAllSuccess = (data) => ({
    type: SEARCH_PRODUCTSALL_SUCCESS,
    payload: data
});

const searchProductsAllError = (data) => ({
    type: SEARCH_PRODUCTSALL_ERROR,
    payload: data
});

export function addProductsAction(data, enqueueSnackbar) {
    return async (dispatch) => {
        try {
            await axiosClient.post('/api/cookware/new', data);
            dispatch(searchProductsAllAction(enqueueSnackbar))
            enqueueSnackbar("Se añadio el producto con exito", { variant: 'success' });
        } catch (error) {
            enqueueSnackbar("Error al añadir el orden", { variant: 'error' });
        }
    };
}

export function editProductsAction(data, enqueueSnackbar) {
    return async (dispatch) => {
        try {
            await axiosClient.put('/api/cookware/update', data);
            dispatch(searchProductsAllAction(enqueueSnackbar))
            enqueueSnackbar("Se actualizo el producto con exito", { variant: 'success' });
        } catch (error) {
            enqueueSnackbar("Error al actualizar el producto", { variant: 'error' });
        }
    };
}

export function deleteProductsAction(data, enqueueSnackbar) {
    return async (dispatch) => {
        try {
            await axiosClient.delete('/api/cookware/' + data);
            dispatch(searchProductsAllAction(enqueueSnackbar))
            enqueueSnackbar("Se ha eliminado el producto con exito", { variant: 'success' });
        } catch (error) {
            enqueueSnackbar("Error al eliminar el producto", { variant: 'error' });
        }
    };
}

export function searchProductsAction(searchDataType, searchData, enqueueSnackbar) {
    return async (dispatch) => {
        try {
            let response;
            if (searchDataType === "precio") {
                response = await axiosClient.get('/api/cookware/price/' + searchData);
            } else {
                response = await axiosClient.get('/api/cookware/description/' + searchData);
            }
            dispatch(searchProducts(response.data))
            if (response.data.length !== 0) {
                enqueueSnackbar("Se han encontrado productos relacionados", { variant: 'success' });
            } else {
                enqueueSnackbar("No se han encontrado productos relacionados", { variant: 'success' });
            }
        } catch (error) {
            // enqueueSnackbar("Error al eliminar el producto", { variant: 'error' });
        }
    };
}

export function initialStateProductsAction(data) {
    return async (dispatch) => {
        dispatch(searchProducts(data))
    };
}

const searchProducts = (data) => ({
    type: SEARCH_PRODUCTS_FILTER,
    payload: data
});