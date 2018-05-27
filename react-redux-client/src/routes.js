import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import CMS from './components/cms';

export default (
  <Route path="/" component={App}>
     <Route path="/cms" component={CMS} />
  </Route>
)