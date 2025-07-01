// third-party
import { combineReducers } from 'redux';

// project import
import auth from './features/auth.reducer';
import app from './features/app.reducer';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  auth,
  app,
});

export default reducers;
