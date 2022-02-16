import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {isAuthenticated} from "./userapicall"

{/*https://v5.reactrouter.com/web/example/auth-workflow*/}
const PrivateRoutes = ({component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated()
        ? (
          <Component {...props} />
        ) 
        : (
          <Redirect
            to={{
              pathname: "/signup",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoutes;