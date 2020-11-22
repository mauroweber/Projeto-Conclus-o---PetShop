import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { useAuth } from "../hooks/auth";



export default function RouteWrapper({
  component: Component,
  isPrivate = false,
  ...rest
}) {
  const { token } = useAuth();

  return (
    <Route
      {...rest}
      render={({location}) => (
        isPrivate === !!token ? (
          <Component />
        ) : (
            <Redirect to={{ pathname: isPrivate ? '/signin' : '/', state: {from: location} }} />
          )
      )}
    />
  );
}

Route.propTypes = {
  isToken: PropTypes.string
}

Route.defaultProps = {
  isPrivate: false
}

