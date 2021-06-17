import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField } from '@material-ui/core';

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

    const confirm = () => {
        //deleteItem(idItem);
        close();
    };

    const products = [
        { id: 1, name: 'xxx', category: 'cat', price: 10, active: 'Active', quantity: 5 },
        { id: 2, name: 'xxx', category: 'cat', price: 10, active: 'Active', quantity: 5 },
        { id: 3, name: 'xxx', category: 'cat', price: 10, active: 'Active', quantity: 5 }
    ];

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
                                {products.map((product) => (
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
                        <Button color="secondary" onClick={confirm} >Save</Button>
                        <Button onClick={close}>Cancel</Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default AddOrderModal;