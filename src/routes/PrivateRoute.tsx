/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import {Redirect, Route, RouteProps} from 'react-router-dom';
import {useSelector} from 'react-redux';

const PrivateRoute: React.FC<RouteProps> = ({children, ...rest}) => {
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  return (
    <Route
      {...rest}
      render={({location}) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {from: location},
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
