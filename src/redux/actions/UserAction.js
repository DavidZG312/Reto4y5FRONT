import axiosClient from '../../config/AxiosClient';
import {
	SEARCH_USERALL_SUCCESS,
	SEARCH_USERALL_ERROR,
	SEARCH_USER_FILTER
} from '../types';

export function searchUserAllAction(enqueueSnackbar) {
	return async (dispatch) => {
		try {
			const response = await axiosClient.get('/api/user/all');
			enqueueSnackbar("Se realizo la consulta correctamente", { variant: 'success' });
			dispatch(searchUserAllSuccess(response.data))
		} catch (error) {
			dispatch(searchUserAllError())
		}
	};
}

const searchUserAllSuccess = (data) => ({
	type: SEARCH_USERALL_SUCCESS,
	payload: data
});

const searchUserAllError = (data) => ({
	type: SEARCH_USERALL_ERROR,
	payload: data
});

export function editUserAction(data, enqueueSnackbar) {
	return async (dispatch) => {
		try {
			await axiosClient.put('/api/user/update', data);
			dispatch(searchUserAllAction(enqueueSnackbar))
			enqueueSnackbar("Se actualizo el usuario con exito", { variant: 'success' });
		} catch (error) {
			enqueueSnackbar("Error al actualizar el usuario", { variant: 'error' });
		}
	};
}

export function deleteUserAction(data, enqueueSnackbar) {
	return async (dispatch) => {
		try {
			await axiosClient.delete('/api/user/' + data);
			dispatch(searchUserAllAction(enqueueSnackbar))
			enqueueSnackbar("Se ha eliminado el usuario con exito", { variant: 'success' });
		} catch (error) {
			enqueueSnackbar("Error al eliminar el usuario", { variant: 'error' });
		}
	};
}

export function searchUserAction(data) {
	return async (dispatch) => {
		dispatch(searchUser(data))
	};
}

const searchUser = (data) => ({
	type: SEARCH_USER_FILTER,
	payload: data
});