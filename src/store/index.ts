import {createStore, combineReducers} from 'redux';
import authReducer from './reducer/auth';

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer);
export type AppState = ReturnType<typeof rootReducer>;
export default store;
