import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectedOrder, removeSelectedOrder } from "../../redux/actions/orderActions";
import { Typography, Grid, Button, CssBaseline } from '@material-ui/core';
import OrderItems from "../../components/order/OrderItems";
import OrderStatus from "../../components/order/OrderStatus";
import OrderTotals from "../../components/order/OrderTotals";
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import Backspace from '@material-ui/icons/Backspace';
import { Constants } from "../../utils/constants"; 
import DateTime from "../../utils/DateTime";

const OrderDetails = () => {
  const { orderId } = useParams();
  let order = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const history = useHistory();

  const [statusValues, setStatusValues] = useState({
    id: '0',
    customer: '',
    date: DateTime.changeFormatDate(new Date()),
    orderProducts: [],
    status: 'Pending',
    taxes: 0,
    totalAmount: 0,
    totalTaxes: 0
  });

  const save = () => {
    order.customer = statusValues.name;
    order.status = statusValues.status;
    order.date = statusValues.date;
    
    updateOrder(order);
  }

  const updateOrder = async (order) => {
    let response;

    if (order?.id && parseInt(order.id) != 0) {
      response = await axios.
        put(Constants.API_URL_ORDER, order)
        .catch((err) => {
          console.log("Err: ", err);
        });
    }
    else {
      response = await axios.
        post(Constants.API_URL_ORDER, order)
        .catch((err) => {
          console.log("Err: ", err);
        });
    }

    history.push({
      pathname: '/orders'
    });
  };

  const fetchOrderDetail = async (id) => {
    const response = await axios
      .get(`${Constants.API_URL_ORDER}/${id}`)
      .catch((err) => {
        console.log("Err: ", err);
      });
      
    setStatusValues({ ...response.data });
    dispatch(selectedOrder({...response.data}));
  };

  useEffect(async () => {
    if (orderId && orderId !== "") {
      await fetchOrderDetail(orderId);
    }
  }, [orderId]);

  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 800 }}>
      <CssBaseline />

      <Grid container style={{ marginBottom: 50 }}>
        <Grid item sm={6}><Typography variant="h4" gutterBottom>Order N°{'1'}</Typography></Grid>
        <Grid container item sm={6} justify="flex-end">
          <Link style={{ textDecoration: 'none', color: 'white' }} to={`/orders`}>
            <Button variant="contained" startIcon={<Backspace />}>back</Button>
          </Link>
        </Grid>
      </Grid>

      <OrderStatus setStatusValues={setStatusValues} />
      <OrderItems />
      <OrderTotals />

      <Grid container justify="flex-end">
        <Grid item style={{ marginTop: 50, marginRight: 16 }}>
          <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={save}>Complete Order</Button>
        </Grid>
        <Grid item style={{ marginTop: 50 }} >
          <Link style={{ textDecoration: 'none', color: 'white' }} to={`/orders`}>
            <Button variant="contained" color="secondary" startIcon={<CancelIcon />}>Reject Order</Button>
          </Link>
        </Grid>
      </Grid>

    </div>
  );
};

export default OrderDetails;