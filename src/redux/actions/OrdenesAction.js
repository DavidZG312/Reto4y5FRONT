import axiosClient from '../../config/AxiosClient';
import {
    SEARCH_ORDENESALL_SUCCESS,
    SEARCH_ORDENESALL_ERROR,
    SEARCH_ORDENES_FILTER
} from '../types';

export function searchOrdenesAllAction(enqueueSnackbar) {
    return async (dispatch) => {
        try {
            const response = await axiosClient.get('/api/order/all');
            enqueueSnackbar("Se realizo la consulta correctamente", { variant: 'success' });
            dispatch(searchOrdenesAllSuccess(response.data))
        } catch (error) {
            dispatch(searchOrdenesAllError())
        }
    };
}

const searchOrdenesAllSuccess = (data) => ({
    type: SEARCH_ORDENESALL_SUCCESS,
    payload: data
});

const searchOrdenesAllError = (data) => ({
    type: SEARCH_ORDENESALL_ERROR,
    payload: data
});

export function addOrdenesAction(data, enqueueSnackbar) {
    return async (dispatch) => {
        try {
            await axiosClient.post('/api/order/new', data);
            dispatch(searchOrdenesAllAction(enqueueSnackbar))
            enqueueSnackbar("Se añadio la orden con exito", { variant: 'success' });
        } catch (error) {
            enqueueSnackbar("Error al añadir la orden", { variant: 'error' });
        }
    };
}

export function editOrdenesAction(data, enqueueSnackbar) {
    return async (dispatch) => {
        try {
            await axiosClient.put('/api/order/update', data);
            dispatch(searchOrdenesAllAction(enqueueSnackbar))
            enqueueSnackbar("Se actualizo la orden con exito", { variant: 'success' });
        } catch (error) {
            enqueueSnackbar("Error al actualizar la orden", { variant: 'error' });
        }
    };
}

export function deleteOrdenesAction(data, enqueueSnackbar) {
    return async (dispatch) => {
        try {
            await axiosClient.delete('/api/order/' + data);
            dispatch(searchOrdenesAllAction(enqueueSnackbar))
            enqueueSnackbar("Se ha eliminado la orden con exito", { variant: 'success' });
        } catch (error) {
            enqueueSnackbar("Error al eliminar la orden", { variant: 'error' });
        }
    };
}

export function searchOrdenesAction(searchDataType, searchData, enqueueSnackbar, searchDataUser) {
    return async (dispatch) => {
        try {
            let response;
            if (searchDataType === "zona") {
                response = await axiosClient.get('/api/order/zona/' + searchData.toUpperCase());
            } else if (searchDataType === "vendedor") {
                response = await axiosClient.get('/api/order/salesman/' + searchDataUser);
            } else if (searchDataType === "estadoyvendedor") {
                response = await axiosClient.get(`/api/order/state/${searchData}/${searchDataUser}`);
            } else if (searchDataType === "fechayvendedor") {
                response = await axiosClient.get(`/api/order/date/${searchData}/${searchDataUser}`);
            }
            dispatch(searchOrdenes(response.data))
            if (response.data.length !== 0) {
                enqueueSnackbar("Se han encontrado ordenes relacionadas", { variant: 'success' });
            } else {
                enqueueSnackbar("No se han encontrado ordenes relacionadas", { variant: 'success' });
            }
        } catch (error) {
            // enqueueSnackbar("Error al eliminar el producto", { variant: 'error' });
        }
    };
}

export function initialStateOrdenesAction(data) {
    return async (dispatch) => {
        dispatch(searchOrdenes(data))
    };
}

const searchOrdenes = (data) => ({
    type: SEARCH_ORDENES_FILTER,
    payload: data
});