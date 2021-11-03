/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {RouteProps, useHistory} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
const StateRequiredRoute: React.FC<RouteProps> = ({children, ...rest}) => {
  const history = useHistory();
  if (!history.location.state) {
    history.goBack();
  }
  return <PrivateRoute {...rest} />;
};

export default StateRequiredRoute;
