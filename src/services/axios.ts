import axios, {AxiosError} from 'axios';
import store from '../store';
import * as ActionTypes from '../store/action/actiontypes';

const axiosToken = axios.create();
axiosToken.interceptors.request.use(
  request => {
    const {token} = store.getState().auth;
    if (token) {
      request.headers.Authorization = token;
    }
    return request;
  },
  error => {
    return Promise.reject(error);
  }
);
axiosToken.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      store.dispatch({type: ActionTypes.LOGOUT_USER});
    }
    return Promise.reject(error);
  }
);

export default axiosToken;
