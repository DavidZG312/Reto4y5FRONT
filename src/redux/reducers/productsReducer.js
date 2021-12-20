import {
	SEARCH_PRODUCTSALL_SUCCESS,
	SEARCH_PRODUCTSALL_ERROR,
	SEARCH_PRODUCTS_FILTER
} from '../types';

const initialState = {
    productsArray: [],
    initialStateProducts: [],
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case SEARCH_PRODUCTSALL_SUCCESS:
            return {
                ...state,
                productsArray: action.payload,
                initialStateProducts: action.payload
            };
        case SEARCH_PRODUCTSALL_ERROR:
            return {
                ...state,
                productsArray: [],
                initialStateProducts: []
            };
        case SEARCH_PRODUCTS_FILTER:
            return {
                ...state,
                productsArray: action.payload,
            }
        default:
            return state;
    }
}