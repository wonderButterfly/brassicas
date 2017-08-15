import { createStore, Store, applyMiddleware, Middleware, Action } from 'redux';
import { State } from './state';
import reducers from './combined-reducer';
import middlewares from './middlewares';

const appReducers = function(state: State, action: Action) {
  if (action.type === 'REINIT') {
    return reducers(undefined, action);
  }

  return reducers(state, action);
}

export const store: Store<State> = createStore<State>(appReducers, applyMiddleware(...middlewares as Middleware[]))