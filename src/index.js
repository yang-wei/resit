import React from 'react';
import configureStore from './configureStore';
import { Provider } from 'react-redux';

import App from './App';

React.render(
  <Provider store={configureStore()}>
    {() => <App/>} 
  </Provider>,
  document.getElementById('root')
);
