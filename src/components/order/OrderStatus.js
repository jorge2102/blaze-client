import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography, Grid, TextField, FormControl, InputLabel, NativeSelect } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DateTime from "../../utils/DateTime";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    status: {
        paddingTop: 40
    },
    date: {
        paddingTop: 50
    }
}));

const OrderStatus = ({ setStatusValues }) => {
    const order = useSelector((state) => state.order);
    const classes = useStyles();

    const [formValues, setFormValues] = useState({
        name: '',
        status: false,
        date: DateTime.changeFormatDateMaterialUI(new Date())
    })

    const handleChange = e => {
        const { name, value, type } = e.target;
        setFormValues(prevState => ({
            ...prevState,
            [name]: (type == 'checkbox') ? e.target.checked : value
        }));

        setStatusValues({ ...formValues });
    }

    useEffect(() => {
        setFormValues({
            name: order.customer,
            status: order.status,
            date: DateTime.changeFormatDateMaterialUI(order.date)
        });

    }, [order]);

    return (
        <>
            <Grid container>
                <Grid item xs={2} alignItems="center" alignContent="center">
                    <Typography variant="h6" gutterBottom>Customer</Typography>
                </Grid>
                <Grid item xs={10}>
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
                <Grid item xs={2} className={classes.status}>
                    <Typography variant="h6" gutterBottom>Status</Typography>
                </Grid>
                <Grid item xs={10} className={classes.status}>
                    <FormControl fullWidth>
                        <InputLabel shrink htmlFor="age-native-label-placeholder">
                            Status
                        </InputLabel>
                        <NativeSelect
                            name="status"
                            value={formValues.status}
                            onChange={handleChange}
                            inputProps={{
                                name: 'status',
                                id: 'age-native-label-placeholder',
                            }}
                        >
                            <option value={'Pending'}>Pending</option>
                            <option value={'Completed'}>Completed</option>
                            <option value={'Rejected'}>Rejected</option>
                        </NativeSelect>
                    </FormControl>
                </Grid>
                <Grid item xs={2} className={classes.date}>
                    <Typography variant="h6" gutterBottom>Date</Typography>
                </Grid>
                <Grid item xs={10} className={classes.date}>
                    <TextField
                        id="date"
                        name="date"
                        label=""
                        type="date"
                        className={classes.textField}
                        value={formValues.date}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default OrderStatus;