import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 100
  },
  link: {
    textDecoration: 'none',
    color: 'white'
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link className={classes.link} to={`/`}><Button color="inherit">Products</Button></Link>
          <Link className={classes.link} to={`/orders`}><Button color="inherit">Orders</Button></Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;