import axiosClient from '../../config/AxiosClient';
import {
	CORREO_EXISTE,
	LOGIN_START_SUCCESS
} from '../types';

export function correoExisteAction(email, enqueueSnackbar) {
	return async (dispatch) => {
		try {
			const response = await axiosClient.get('/api/user/emailexist/' + email.toLowerCase());
			if (response.data) {
				enqueueSnackbar("Este correo ya existe", { variant: 'warning' });
				dispatch(correoExisteSuccess(true))
			} else {
				dispatch(correoExisteSuccess(false))
			}
		} catch (error) {
		}
	};
}

const correoExisteSuccess = (data) => ({
	type: CORREO_EXISTE,
	payload: data
});

export function registrarUsuarioAction(data, enqueueSnackbar, navigate) {
	return async () => {
		try {
			//Router
			const response = await axiosClient.post('/api/user/new', data);
			if (response.data.id) {
				enqueueSnackbar("¡ Usuario creado con exito !", { variant: 'success' });
				navigate("/")
			} else {
				enqueueSnackbar("¡ Hubo un inconveniente con la creación !", { variant: 'warning' });
			}
		} catch (error) {
			enqueueSnackbar("¡ Hubo un inconveniente con la creación !", { variant: 'warning' });
		}
	};
}

export function loginAction(email, password) {
	return async (dispatch) => {
		try {
			const response = await axiosClient.get(`/api/user/${email.toLowerCase()}/${password}`);
			dispatch(loginStartSuccess(response.data));
			if (response.data.id !== null) {
				await sessionStorage.setItem('userData', JSON.stringify(response.data));
			}
		} catch (error) {
		}
	};
}

export function usuarioAction(data) {
	return async (dispatch) => {
		dispatch(loginStartSuccess(data));
	};
}

const loginStartSuccess = (data) => ({
	type: LOGIN_START_SUCCESS,
	payload: data
});
