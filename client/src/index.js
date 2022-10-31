import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

const userId = undefined;

function reducer(state = userId, action) {
  if (action.type === 'getId') {
    state = action._id;
    return state;
  } else if (action.type === 'deleteId') {
    state = undefined;
    return state;
  }
}

let store = createStore(reducer)


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
  <App />
</Provider>
);