
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import FetchedMusclesReducer from './fetchedMusclesReducer';
import DeleteMuscleReducer from './deleteMuscleReducer';

import FetchedModulesReducer from './fetchedModulesReducer';
import DeleteModuleReducer from './deleteModuleReducer';

export default combineReducers({
  modules: FetchedModulesReducer,
  delete_module: DeleteModuleReducer,
  muscles: FetchedMusclesReducer,
  delete_muscle: DeleteMuscleReducer,
  routing
  // More reducers if there are
  // can go here
})