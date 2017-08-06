import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import './internal/store';

import * as ReactRedux from 'react-redux';
const { Provider } = ReactRedux;

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
