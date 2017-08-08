import { createStore, Store, applyMiddleware } from 'redux';
import { State } from './state';
import reducers from './combined-reducer';
import selection from './middlewares';

export const store: Store<State> = createStore<State>(reducers, applyMiddleware(selection))