import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import MuscleCMS from './components/cms/cmsMuscle';

export default (
  <Route path="/" component={App}>
     <Route path="/cms/muscle" component={MuscleCMS} />
  </Route>
)