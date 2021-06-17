import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Button, Paper } from '@material-ui/core';
import { Edit, Delete, AddCircle } from '@material-ui/icons';
import DeleteModal from '../../components/DeleteModal';
import { Constants } from "../../utils/constants";

const OrderComponent = () => {
    const orders = useSelector((state) => state.allOrders.orders);
    const [currentProduct, setCurrentProduct] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const history = useHistory();

    const showDeleteProductModal = (product) => {
        setCurrentProduct(product);
        switchShowDeleteModal();
    };

    const switchShowDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal);
    };

    const deleteProduct = async (id) => {
        const response = await axios.
            delete(`${Constants.API_URL_ORDER}/${id}`)
            .catch((err) => {
                console.log("Err: ", err);
            });

        history.push({
            pathname: '/'
        });

        switchShowDeleteModal();
    };

    return (
        <>
            <div style={{ padding: 16, margin: 'auto', maxWidth: 800 }}>
                <Link style={{ textDecoration: 'none', color: 'white' }} to={`/order/0`}>
                    <Button variant="contained" color="primary" startIcon={<AddCircle />}>Create Order</Button>
                </Link>
                <br /><br />

                <Paper style={{ padding: 16 }}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>N°</TableCell>
                                    <TableCell>Customer</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {orders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell>{order.id}</TableCell>
                                        <TableCell>{order.customer}</TableCell>
                                        <TableCell>{order.date}</TableCell>
                                        <TableCell>{order.status}</TableCell>
                                        <TableCell>
                                            <Link to={`/order/${order.id}`}><Edit color="primary" /></Link>
                                            &nbsp;&nbsp;&nbsp;
                                            <Link onClick={() => showDeleteProductModal(order)}><Delete color="secondary" /></Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>

                <DeleteModal idItem={currentProduct.id} nameItem={currentProduct.name} show={showDeleteModal} close={switchShowDeleteModal} deleteItem={deleteProduct} />
            </div>
        </>
    );
};

export default OrderComponent;