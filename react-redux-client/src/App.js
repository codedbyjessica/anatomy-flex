import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';
import routes from './routes';
import Header from './components/global/header';
import SideMenu from './components/global/sideMenu';
const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

class App extends Component {
  render() {
    const isCMS = window.location.pathname.indexOf('cms') > 0;
    return (
      <Provider store={store}>
        <div>
          <Header />
          <div className="content">
            {isCMS ? '' : <SideMenu />}
            <div className="main">
              <a href="/superior-anterior-muscles/learn">Superior Anterior Muscles - learn</a>
              <Router history={history} routes={routes} />

              <footer> 2019 AnatomyFlex . All rights reserved.</footer>
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}
App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}
export default App;