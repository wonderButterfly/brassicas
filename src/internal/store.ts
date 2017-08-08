import { createStore, Store, applyMiddleware, Middleware } from 'redux';
import { State } from './state';
import reducers from './combined-reducer';
import middlewares from './middlewares';

export const store: Store<State> = createStore<State>(reducers, applyMiddleware(...middlewares as Middleware[]))