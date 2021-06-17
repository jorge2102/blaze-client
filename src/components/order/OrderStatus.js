import React from "react";
import { Typography, Grid } from '@material-ui/core';

const OrderStatus = () => {
    const name = 'csme fulanito';
    const status = 'true';
    const date = '10/10/2020';

    return (
        <>
            <Grid container>
                <Grid item xs={2}>
                    <Typography variant="h6" gutterBottom>Customer</Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="h6" gutterBottom>{name}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="h6" gutterBottom>Status</Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="h6" gutterBottom>{status}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="h6" gutterBottom>Date</Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="h6" gutterBottom>{date}</Typography>
                </Grid>
            </Grid>
        </>
    );
};

export default OrderStatus;