import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";


import { isLogged } from "../helpers/AuthHandler";




export default function RouteWrapper({
  component: Component,
  isPrivate = false,
  ...rest
}) {
  const isTrue = isLogged();
    
  return (
    <Route
      {...rest}
      render={props => (
         isPrivate === isTrue ? (
          <>
          <Component  {...props}/>
          </>

        ): (
          <Redirect to={{ pathname: isPrivate ? '/signin' : '/'}} />
        )
      )}
    />
  );
}

Route.propTypes = {
  isTrue: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
}

Route.defaultProps = {
  isPrivate: false
}

