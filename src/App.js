import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductListing from "./containers/product/ProductListing";
import ProductDetails from "./containers/product/ProductDetails";
import OrderListing from "./containers/order/OrderListing";
import OrderDetails from "./containers/order/OrderDetails";
import Header from "./containers/Header";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={ProductListing} />
          <Route path="/product/:productId" component={ProductDetails} />
          <Route path="/orders" component={OrderListing} />
          <Route path="/order/:orderId" component={OrderDetails} />
          <Route>404 Not Found!</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
