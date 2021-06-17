import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Button, Paper, Grid } from '@material-ui/core';
import { Edit, Delete, AddCircle } from '@material-ui/icons';
import DeleteModal from '../../components/DeleteModal';
import AddOrderModal from './AddOrderModal';
import { Constants } from "../../utils/constants";

const OrderItems = () => {
    const orders = useSelector((state) => state.allOrders.orders);
    const [currentProduct, setCurrentProduct] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddOrderModal, setShowAddOrderModal] = useState(false);
    const history = useHistory();
    const orderItems = [
        { id: '1', name: 'Chocolate', quantity: 10, unitPrice: 10, cost: 100 },
        { id: '2', name: 'Chocolate', quantity: 10, unitPrice: 10, cost: 100 },
        { id: '3', name: 'Chocolate', quantity: 10, unitPrice: 10, cost: 100 }
    ];

    const showDeleteProductModal = (product) => {
        setCurrentProduct(product);
        switchShowDeleteModal();
    };

    const switchShowDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal);
    };

    const switchShowAddOrderModal = () => {
        setShowAddOrderModal(!showAddOrderModal);
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
            <div style={{ marginTop: 50, marginBottom: 50, maxWidth: 800 }}>
                <Paper style={{ padding: 16 }}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>N°</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Unit Price</TableCell>
                                    <TableCell>Cost</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {orderItems.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{item.unitPrice}</TableCell>
                                        <TableCell>{item.cost}</TableCell>
                                        <TableCell>
                                            <Link to={`/product/${item.id}`}><Edit color="primary" /></Link>
                                            &nbsp;&nbsp;&nbsp;
                                            <Link onClick={() => showDeleteProductModal(item)}><Delete color="secondary" /></Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                <br />
                <Grid container justify="flex-end">
                    <Button variant="contained" color="primary" onClick={switchShowAddOrderModal} startIcon={<AddCircle />}>Add Item</Button>
                </Grid>

                <AddOrderModal show={showAddOrderModal} close={switchShowAddOrderModal} />
                <DeleteModal idItem={currentProduct.id} nameItem={currentProduct.name} show={showDeleteModal} close={switchShowDeleteModal} deleteItem={deleteProduct} />
            </div>
        </>
    );
};

export default OrderItems;