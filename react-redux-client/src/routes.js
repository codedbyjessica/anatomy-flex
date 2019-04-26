import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import MuscleCMS from './components/cms/cmsMuscle';
import MuscleStudy from './components/study/study.muscle';

export default (
  <Route path="/" component={App}>
     <Route path="/cms/muscle" component={MuscleCMS} />
     <Route path="/study/muscle" component={MuscleStudy} />
  </Route>
)