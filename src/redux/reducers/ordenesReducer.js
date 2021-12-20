import {
    SEARCH_ORDENESALL_SUCCESS,
    SEARCH_ORDENESALL_ERROR,
    SEARCH_ORDENES_FILTER
} from '../types';

const initialState = {
    ordenesArray: [],
    initialStateOrdenes: [],
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case SEARCH_ORDENESALL_SUCCESS:
            return {
                ...state,
                ordenesArray: action.payload,
                initialStateOrdenes: action.payload
            };
        case SEARCH_ORDENESALL_ERROR:
            return {
                ...state,
                ordenesArray: [],
                initialStateOrdenes: []
            };
        case SEARCH_ORDENES_FILTER:
            return {
                ...state,
                ordenesArray: action.payload,
            }
        default:
            return state;
    }
}