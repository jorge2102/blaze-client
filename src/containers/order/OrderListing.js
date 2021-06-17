import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../../redux/actions/orderActions";
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
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="ui grid container">
            <OrderComponent />
        </div>
    );
};

export default OrderPage;