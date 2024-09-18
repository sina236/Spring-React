import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, compose, applyMiddleware, combineReducers } from "redux"
import {Provider} from 'react-redux'
import thunk  from 'redux-thunk'
import reducer from './Reducers/reducer1'
import backlog from './Reducers/backlogReducer'
import Auth from './Reducers/Authorization'


const rootreducer=combineReducers({
  reducer:reducer,
  backlog:backlog,
  auth:Auth
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootreducer, composeEnhancers(applyMiddleware(thunk)))
ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
