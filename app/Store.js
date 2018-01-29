import thunkMiddleware from 'redux-thunk'
import { routerReducer } from 'react-router-redux'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'

import resetEnhancer from './enhancer/reset.js'
import {reducer as navSideReducer, stateKey } from './components/nav-side'

let prod = process.env.NODE_ENV === 'production'

const middleware = [thunkMiddleware]
const win = window

const originalReducers = {
  routing: routerReducer,
  [stateKey]: navSideReducer
}
const reducer = combineReducers(originalReducers)

if (!prod) {
// TBA
}

const storeEnhancers = compose(
  resetEnhancer,
  applyMiddleware(...middleware),
  (win && win.devToolsExtension && !prod) ? win.devToolsExtension() : (f) => f
)

const store = createStore(reducer, {}, storeEnhancers)
store._reducers = originalReducers

export default store