import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import AddClient from "./pages/AddClient";
import Order from "./pages/Order";

export default () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/about">
        <About />
      </Route>
      <Route exact path="/signin">
        <SignIn />
      </Route>
      <Route exact path="/signup">
        <SignUp />
      </Route>
      <Route exact path="/addclient">
        <AddClient />
      </Route>
      <Route exact path="/order">
        <Order />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};
