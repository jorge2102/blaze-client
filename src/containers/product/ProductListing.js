import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/actions/productActions";
import ProductComponent from "./ProductComponent";
import { Constants } from "../../utils/constants";

const ProductPage = () => {
    const products = useSelector((state) => state.allProducts.products);
    const dispatch = useDispatch();

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
    }, []);

    return (
        <div className="ui grid container">
            <ProductComponent />
        </div>
    );
};

export default ProductPage;