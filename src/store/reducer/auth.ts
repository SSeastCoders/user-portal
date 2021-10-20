import {LoginAction} from '../action/action';
import * as ActionTypes from '../action/actiontypes';

export interface AuthState {
  isLoggedIn: boolean;
  token?: string | null;
  id?: string | null;
}

const initialState: AuthState = {
  isLoggedIn: !!sessionStorage.getItem('token'),
  token: sessionStorage.getItem('token'),
  id: sessionStorage.getItem('id'),
};

const authReducer = (
  state: AuthState = initialState,
  action: LoginAction
): AuthState => {
  switch (action.type) {
    case ActionTypes.LOGIN_USER:
      sessionStorage.setItem('token', action.token!);
      sessionStorage.setItem('id', action.id!);
      return {
        ...state,
        isLoggedIn: true,
        token: action.token,
        id: action.id,
      };
    case ActionTypes.LOGOUT_USER:
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('id');
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        id: null,
      };

    default:
      return {
        ...state,
      };
  }
};
export default authReducer;
