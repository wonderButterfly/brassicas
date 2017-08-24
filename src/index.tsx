import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './react-components/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import 'disable-react-devtools';

import store from './internal/store';

import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
