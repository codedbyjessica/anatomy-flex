
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import FetchedMusclesReducer from './fetchedMusclesReducer';
import DeleteMuscleReducer from './deleteMuscleReducer';

export default combineReducers({
  muscles: FetchedMusclesReducer,
  delete_muscle: DeleteMuscleReducer,
  routing
  // More reducers if there are
  // can go here
})