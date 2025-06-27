// third-party
import { combineReducers } from 'redux';

// project import
import auth from './features/auth.reducer';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  auth,
});

export default reducers;
