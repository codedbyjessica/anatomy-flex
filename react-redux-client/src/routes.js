import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import MuscleCMS from './components/cms/cmsMuscle';

import Modules from './components/global/modules';
import MuscleLearn from './components/learn/learn.muscle';

export default (
  <Route path="/" component={App}>
     <Route path="/cms/muscle" component={MuscleCMS} />
     <Route path="/modules" component={Modules} />
     <Route path="/muscle/learn" component={MuscleLearn} />
  </Route>
)