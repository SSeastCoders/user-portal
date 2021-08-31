import { RouteProps, useHistory } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
const StateRequiredRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const history = useHistory();
  if (!history.location.state) {
    history.goBack();
  }
  return (
    <PrivateRoute
      {...rest}
    />
  );
};

export default StateRequiredRoute