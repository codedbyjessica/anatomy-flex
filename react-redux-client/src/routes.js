import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import MuscleCMS from './components/cms/cmsMuscle';
import ModuleCMS from './components/cms/cmsModule';

import Modules from './components/global/modules';
import MuscleLearn from './components/learn/learn.muscle';

export default (
  <Route path="/" component={App}>
     <Route path="/cms/module" component={ModuleCMS} />
     <Route path="/cms/muscle" component={MuscleCMS} />
     <Route path="/modules" component={Modules} />
     <Route path="/superior-anterior-muscles/learn" component={MuscleLearn} />
  </Route>
)