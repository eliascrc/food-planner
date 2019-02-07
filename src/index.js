import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import { BrowserRouter } from "react-router-dom";

import App from './App';
import * as serviceWorker from './serviceWorker';
import { reducer } from './redux/reducer';
import './index.scss';

let store = Redux.createStore(reducer);

ReactDOM.render(
  <BrowserRouter>
    <ReactRedux.Provider store={store}>
      <App />
    </ReactRedux.Provider>
  </BrowserRouter>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
