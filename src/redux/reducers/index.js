import { combineReducers } from "redux";
import { productsReducer, selectedProductsReducer } from "./productsReducer";
import { ordersReducer, selectedOrdersReducer } from "./ordersReducer";

const reducers = combineReducers({
    allProducts: productsReducer,
    product: selectedProductsReducer,

    allOrders: ordersReducer,
    order: selectedOrdersReducer,
});

export default reducers;