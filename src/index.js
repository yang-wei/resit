import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import resitApp from './reducers';

React.render(
  <Provider store={createStore(resitApp)}>
    {() => <App/>} 
  </Provider>,
  document.getElementById('root')
);
