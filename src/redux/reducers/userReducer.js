import {
    SEARCH_USERALL_SUCCESS,
    SEARCH_USERALL_ERROR,
    SEARCH_USER_FILTER
} from '../types';

const initialState = {
    usersArray: [],
    initialStateUsers: [],

    // correoExiste: false
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case SEARCH_USERALL_SUCCESS:
            return {
                ...state,
                usersArray: action.payload,
                initialStateUsers: action.payload
            };
        case SEARCH_USERALL_ERROR:
            return {
                ...state,
                usersArray: [],
                initialStateUsers: []
            };
        case SEARCH_USER_FILTER:
            return {
                ...state,
                usersArray: action.payload,
            }
        default:
            return state;
    }
}