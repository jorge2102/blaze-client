import React from "react";
import { Typography, Grid } from '@material-ui/core';

const OrderTotals = () => {
    const subtotal = '100';
    const totalCityTax = 'true';
    const totalCountryTax = '10/10/2020';
    const totalStateTax = '10/10/2020';
    const totalFederalTax = '10/10/2020';
    const totalTaxes = '10/10/2020';
    const total = '10/10/2020';

    return (
        <>
            <Grid container justify="flex-end">
                <Grid container item xs={5}>
                    <Grid item xs={6}>
                        <Typography variant="h6" gutterBottom>Subtotal</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align="right" variant="h6" gutterBottom>{subtotal}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>Taxes</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" gutterBottom>Total City Tax</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align="right" variant="body1" gutterBottom>{totalCityTax}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" gutterBottom>Total Country Tax</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align="right" variant="body1" gutterBottom>{totalCountryTax}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" gutterBottom>Total State Tax</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align="right" variant="body1" gutterBottom>{totalStateTax}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" gutterBottom>Total Federal Tax</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align="right" variant="body1" gutterBottom>{totalFederalTax}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" gutterBottom>Total Taxes</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align="right" variant="h6" gutterBottom>{totalTaxes}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" gutterBottom>Total</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align="right" variant="h6" gutterBottom>{total}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default OrderTotals;