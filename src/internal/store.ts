import { createStore, Store } from 'redux';
import { State } from './state';
import reducers from './combined-reducer';

export const store: Store<State> = createStore(reducers)