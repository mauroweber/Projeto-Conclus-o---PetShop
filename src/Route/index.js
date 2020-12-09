import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";

import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import About from "../pages/NotFound";
import NotFound from "../pages/NotFound";
import AddClient from "../pages/AddClient";
import Order from "../pages/Order";
import AddProduct from "../pages/AddProduct";
import ListPetshop from "../pages/ListPetshop";
import Dashboard from "../pages/DashboardView";
import Pets from "../pages/Pet";
import Supplier from "../pages/Supplier";
import Pacotes from "../pages/Pacotes";

export default () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} isPrivate />
      <Route exact path="/about" component={About} isPrivate />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/listpetshop" component={ListPetshop} isPrivate />
      <Route exact path="/addclient" component={AddClient} isPrivate />
      <Route exact path="/addproduct" component={AddProduct} isPrivate />
      <Route exact path="/order" component={Order} isPrivate />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/pets" component={Pets} isPrivate />
      <Route exact path="/supplier" component={Supplier} isPrivate />
      <Route exact path="/pacotes" component={Pacotes} isPrivate />
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};
