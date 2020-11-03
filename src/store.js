import {createStore,applyMiddleware,compose,combineReducers} from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import { orderReducer } from "./reducers/orderReducer";
import { productReducers } from "./reducers/productReducers";

const initialState={};
const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//here store takes 3 parameters
const store=createStore(
    combineReducers({
        products:productReducers,
        cart:cartReducer,
        order:orderReducer
    }),
    initialState,
    composeEnhancer(applyMiddleware(thunk))

);
export default store;