import 'react-redux';

import {AppState} from '../store';

declare module 'react-redux' {
  type DefaultRootState = AppState;
}
