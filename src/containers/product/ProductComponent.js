import { React, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; 
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Button, Paper } from '@material-ui/core';
import { Edit, Delete, AddCircle } from '@material-ui/icons';
import DeleteModal from '../../components/DeleteModal';
import { setProducts } from "../../redux/actions/productActions";
import { Constants } from "../../utils/constants";


const ProductComponent = () => {
    const products = useSelector((state) => state.allProducts.products);
    const dispatch = useDispatch();

    const [currentProduct, setCurrentProduct] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const showDeleteProductModal = (product) => {
        setCurrentProduct(product);
        switchShowDeleteModal();
    };

    const switchShowDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal);
    };

    const deleteProduct = async (id) => {
        const response = await axios.
            delete(`${Constants.API_URL_PRODUCT}/${id}`)
            .catch((err) => {
                console.log("Err: ", err);
            });

        deleteProductTable(id);
        switchShowDeleteModal();
    };

    const deleteProductTable = (id) => {
        let currentProducts = [];

        products.forEach(element => {
            if (element.id != id) {
                currentProducts = [...currentProducts, element];
            }
        });

        dispatch(setProducts(currentProducts));
    };

    return (
        <>
            <div style={{ padding: 16, margin: 'auto', maxWidth: 800 }}>
                <Link style={{ textDecoration: 'none', color: 'white' }} to={`/product/0`}>
                    <Button variant="contained" color="primary" startIcon={<AddCircle />}>Create Product</Button>
                </Link>
                <br /><br />

                <Paper style={{ padding: 16 }}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>N°</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Actions</TableCell>
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
                                            <Link to={`/product/${product.id}`}><Edit color="primary" /></Link>
                                            &nbsp;&nbsp;&nbsp; 
                                            <Link onClick={() => showDeleteProductModal(product)}><Delete color="secondary" /></Link>
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

export default ProductComponent;