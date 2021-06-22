import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectedProduct, removeSelectedProduct } from "../../redux/actions/productActions";
import { FormControl, FormControlLabel, InputLabel, Checkbox, Grid, Button, TextField, CssBaseline, Paper, NativeSelect } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { Constants } from "../../utils/constants";

const ProductDetails = () => {
  const { productId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    id: '0',
    name: '',
    category: '',
    price: '0',
    active: false
  });

  const handleChange = e => {
    const { name, value, type } = e.target;
    setFormValues(prevState => ({
      ...prevState,
      [name]: (type == 'checkbox') ? e.target.checked : value
    }));
  }

  const updateProduct = async () => {
    let response;

    if (formValues?.id && parseInt(formValues.id) != 0) {
      response = await axios.
        put(Constants.API_URL_PRODUCT, formValues)
        .catch((err) => {
          console.log("Err: ", err);
        });
    }
    else {
      response = await axios.
        post(Constants.API_URL_PRODUCT, formValues)
        .catch((err) => {
          console.log("Err: ", err);
        });
    }

    history.push({
      pathname: '/'
    });
  };

  const fetchProductDetail = async (id) => {
    const response = await axios
      .get(`${Constants.API_URL_PRODUCT}/${id}`)
      .catch((err) => {
        console.log("Err: ", err);
      });

    setFormValues({ ...response.data });
    dispatch(selectedProduct(response.data));
  };

  useEffect(() => {
    if (productId && productId !== "") {
      fetchProductDetail(productId);
    }

    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productId]);

  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <CssBaseline />
      <form noValidate>
        <Paper style={{ padding: 16 }}>
          <Grid container alignItems="flex-start" spacing={2}>

            <Grid item xs={12}>
              <TextField
                id="outlined-full-width"
                name="name"
                label="Name"
                autoComplete="off"
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={formValues.name}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="price"
                label="Price"
                type="number"
                fullWidth
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={formValues.price}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel shrink htmlFor="age-native-label-placeholder">
                  Category
                </InputLabel>
                <NativeSelect
                  name="category"
                  value={formValues.category}
                  onChange={handleChange}
                  inputProps={{
                    name: 'category',
                    id: 'age-native-label-placeholder',
                  }}
                >
                  <option value={'Cookies'}>Cookies</option>
                  <option value={'Candies'}>Candies</option>
                  <option value={'Cakes'}>Cakes</option>
                  <option value={'Desserts'}>Desserts</option>
                  <option value={'Drinks'}>Drinks</option>
                </NativeSelect>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox color="primary" checked={formValues.active} name="active" onChange={handleChange} />}
                label="Active"
              />
            </Grid>

            <Grid container justify="flex-end">
              <Grid item style={{ marginTop: 16, marginRight: 16 }}>
                <Button variant="contained" color="primary" onClick={updateProduct} startIcon={<SaveIcon />}>Save</Button>
              </Grid>

              <Grid item style={{ marginTop: 16 }} >
                <Link style={{ textDecoration: 'none', color: 'white' }} to={`/`}>
                  <Button variant="contained" color="secondary" startIcon={<CancelIcon />}>Cancel</Button>
                </Link>
              </Grid>

            </Grid>
          </Grid>
        </Paper>
      </form>
    </div>
  );
};

export default ProductDetails;