import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOrders, removeSelectedOrder } from "../../redux/actions/orderActions";
import { setProducts } from "../../redux/actions/productActions";
import OrderComponent from "./OrderComponent";
import { Constants } from "../../utils/constants";

const OrderPage = () => {
    const orders = useSelector((state) => state.allOrders.orders);
    const dispatch = useDispatch();

    const fetchOrders = async () => {
        const response = await axios
            .get(Constants.API_URL_ORDER)
            .catch((err) => {
                console.log("Err: ", err);
            });

        dispatch(setOrders(response.data));
        dispatch(removeSelectedOrder());
    };

    const fetchProducts = async () => {
        const response = await axios
            .get(Constants.API_URL_PRODUCT)
            .catch((err) => {
                console.log("Err: ", err);
            });

        dispatch(setProducts(response.data));
    };

    useEffect(() => {
        fetchProducts();
        fetchOrders();
    }, []);

    return (
        <div className="ui grid container">
            <OrderComponent />
        </div>
    );
};

export default OrderPage;