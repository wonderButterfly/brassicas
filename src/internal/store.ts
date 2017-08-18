import { createStore, applyMiddleware, Middleware, Action } from 'redux';
import { State } from './state';
import { REINIT } from './constants';
import reducers from './combined-reducer';
import middlewares from './middlewares';

const appReducers = function(state: State, action: Action) {
  if (action.type === REINIT) {
    return reducers(undefined, action);
  }

  return reducers(state, action);
};

export default createStore(appReducers, applyMiddleware(...middlewares as Middleware[]));