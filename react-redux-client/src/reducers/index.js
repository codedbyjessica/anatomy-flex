
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import FetchedMusclesReducer from './fetchedMusclesReducer';

export default combineReducers({
  muscles:FetchedMusclesReducer,
  routing
  // More reducers if there are
  // can go here
})