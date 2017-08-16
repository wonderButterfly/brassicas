import { createStore, Store, applyMiddleware, Middleware, Action, AnyAction } from 'redux';
import { State } from './state';
import { REINIT } from './constants';
import reducers from './combined-reducer';
import middlewares from './middlewares';

const appReducers = function(state: State, action: Action) {
  if (action.type === REINIT) {
    return reducers(undefined, action);
  }

  return reducers(state, action);
}

interface createStore<S> {
  (reducer: (state: S|undefined, action: AnyAction) => S, enhancer: ((next: (reducer: (state: S, action: AnyAction) => S, preloadedState?: S | undefined) => Store<S>) => (reducer: (state: S, action: AnyAction) => S, preloadedState?: S | undefined) => Store<S>)): Store<S>
}


export const store: Store<State | undefined> = createStore(appReducers, applyMiddleware(...middlewares as Middleware[]))