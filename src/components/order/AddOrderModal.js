import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField } from '@material-ui/core';
import { selectedOrder } from "../../redux/actions/orderActions";
import OrderCalculation from "../../utils/OrderCalculation";

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 700,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }
}));

const AddOrderModal = ({ idItem, nameItem, show, close, deleteItem }) => {
    const styles = useStyles();
    const products = useSelector((state) => state.allProducts.products);
    const order = useSelector((state) => state.order);
    const dispatch = useDispatch();
    const [tableProducts, setTableProducts] = useState([]);

    const handleChange = (e, idProduct) => {
        const { value } = e.target;

        tableProducts.forEach(product => {
            if (product.id == idProduct) {
                product.quantity = value;
            }
        });

        setTableProducts([...tableProducts]);
    };

    const confirm = () => {
        let orderProducts = OrderCalculation.getOrderProducts(tableProducts);
        order.orderProducts = [...orderProducts];

        dispatch(selectedOrder({ ...order }));
        close();
    };

    useEffect(() => {
        const table = OrderCalculation.getTableProducts(products, order.orderProducts);

        setTableProducts(table);
    }, [show, products]);

    return (
        <>
            <Modal open={show} onClose={close}>
                <div className={styles.modal}>

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>N°</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Quantity</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {tableProducts?.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>{product.id}</TableCell>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{product.category}</TableCell>
                                        <TableCell>{product.price}</TableCell>
                                        <TableCell>{product.active ? 'Active' : 'Inactive'}</TableCell>
                                        <TableCell>
                                            <TextField
                                                id={`outlined-full-width${product.id}`}
                                                name={`outlined-full-width${product.id}`}
                                                autoComplete="off"
                                                onChange={(e) => handleChange(e, product.id)}
                                                fullWidth
                                                margin="normal"
                                                type="number"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="outlined"
                                                value={product.quantity}
                                                size="small"
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div align="right">
                        <Button color="secondary" onClick={confirm}>Save</Button>
                        <Button onClick={close}>Cancel</Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default AddOrderModal;