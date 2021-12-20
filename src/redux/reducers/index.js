import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import productsReducer from "./productsReducer";
import ordenesReducer from "./ordenesReducer";

export default combineReducers({
    auth: authReducer,
    userR: userReducer,
    products: productsReducer,
    ordenes: ordenesReducer,
})