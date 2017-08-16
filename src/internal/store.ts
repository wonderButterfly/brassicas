import { createStore, Store, applyMiddleware, Middleware, Action } from 'redux';
import { State } from './state';
import { REINIT } from './constants';
import reducers from './combined-reducer';
import middlewares from './middlewares';

const appReducers = function(state: State, action: Action) {
  console.log(action)
  if (action.type === REINIT) {
    console.log(state)
    return reducers(undefined, action);
  }

  return reducers(state, action);
}

export const store: Store<State> = createStore<State>(appReducers, applyMiddleware(...middlewares as Middleware[]))