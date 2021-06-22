import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { Typography, Grid } from '@material-ui/core';
import OrderCalculation from "../../utils/OrderCalculation";

const OrderTotals = () => {
    const order = useSelector((state) => state.order);
    const [totals, setTotals] = useState({});
    
    useEffect(() => {
        const totalTaxes = OrderCalculation.calculateTotals(order);
        
        setTotals(totalTaxes);
    }, [order]);

    return (
        <>
            <Grid container justify="flex-end">
                <Grid container item xs={5}>
                    <Grid item xs={6}>
                        <Typography variant="h6" gutterBottom>Subtotal</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align="right" variant="h6" gutterBottom>{totals.subtotal}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>Taxes</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" gutterBottom>Total City Tax</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align="right" variant="body1" gutterBottom>{totals.totalCityTax}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" gutterBottom>Total Country Tax</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align="right" variant="body1" gutterBottom>{totals.totalCountryTax}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" gutterBottom>Total State Tax</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align="right" variant="body1" gutterBottom>{totals.totalStateTax}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" gutterBottom>Total Federal Tax</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align="right" variant="body1" gutterBottom>{totals.totalFederalTax}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" gutterBottom>Total Taxes</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align="right" variant="h6" gutterBottom>{totals.totalTaxes}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" gutterBottom>Total</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align="right" variant="h6" gutterBottom>{totals.total}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default OrderTotals;