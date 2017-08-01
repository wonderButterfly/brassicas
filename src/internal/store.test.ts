import { store } from './store';
import { State } from './state';

it('creates a valid store', () => {
  expect(store).toHaveProperty('getState')
  expect(store).toHaveProperty('dispatch')
  expect(store).toHaveProperty('subscribe')
})

it('creates a store with a valid state', () => {
  const state: State = store.getState();
  expect(state).toHaveProperty('rowA')
  expect(state).toHaveProperty('rowB')
  expect(state).toHaveProperty('rowC')
  expect(state).toHaveProperty('rowD')
  expect(state).toHaveProperty('score')
})

it('creates a store with correct inital values', () => {
  const state: State = store.getState()
  expect(state.score).toBe(0)
  
})

it('updates state with correct values')

it('updates state without changing previous state')