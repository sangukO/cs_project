import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={createStoreWithMiddleware(Reducer)}>
    <App />
  </Provider>
);