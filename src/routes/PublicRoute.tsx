import React from 'react';
import {useSelector} from 'react-redux';
import {Redirect, Route, RouteProps} from 'react-router-dom';

const PublicRoute: React.FC<RouteProps> = ({children, ...rest}) => {
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const isAuthenticated = isLoggedIn || sessionStorage.getItem('token');

  return (
    <Route
      {...rest}
      render={({location}) =>
        isAuthenticated ? (
          <Redirect
            to={{
              pathname: '/',
              state: {from: location},
            }}
          />
        ) : (
          children
        )
      }
    />
  );
};

export default PublicRoute;
