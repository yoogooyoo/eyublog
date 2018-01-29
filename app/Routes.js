import React from 'react'
import { combineReducers } from 'redux'

import { Router , Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import store from './Store.js'
import App from './containers/App'

const resetState = (reducer, initialState, stateKey, setting = {}) => {
  const state = store.getState()

  store._reducers = {...store._reducers, ...reducer}

  let {_cover = true, ...params} = setting,
      currentState = _cover ? {...state, ...initialState} : {...initialState, ...state}

  currentState[stateKey] = {...currentState[stateKey], ...params}

  store.reset(combineReducers({
    ...store._reducers
  }), {
    ...currentState
  })
}

const getHomePage = (location, callback) => {
  require.ensure([], function (require) {
    const {Home} = require('./containers/Home')
    document.title = "Ethan's Blog"
    callback(null, Home)
  }, 'home')
}

const history = syncHistoryWithStore(browserHistory, store)

const Routes = () => (
  <Router history={history}>
    <Route path="/" breadcrumbName="Home" component={App}>
      <IndexRoute name="home" getComponent={getHomePage} />
      <Route name="home" path="home" getComponent={getHomePage} />
    </Route>
  </Router>
)

export default Routes