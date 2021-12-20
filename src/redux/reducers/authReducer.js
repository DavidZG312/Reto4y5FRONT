import {
    CORREO_EXISTE,
    LOGIN_START_SUCCESS
} from '../types';

const initialState = {
    user: {},
    correoExiste: false
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case CORREO_EXISTE:
            return {
                ...state,
                correoExiste: action.payload
            };
        case LOGIN_START_SUCCESS:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
}