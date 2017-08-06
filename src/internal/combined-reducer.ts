import { combineReducers } from 'redux'
import score from './reducers/score';
import board from './reducers/board';
import card from './reducers/cards';
import joker from './reducers/joker'
import { State } from './state';

export default combineReducers<State>({ 
  score,
  board, 
  a1: card('cabbage'),
  a2: card('cabbage'),
  a3: card('cabbage'),
  a4: card('cabbage'),
  b1: card('broccoli'),
  b2: card('broccoli'),
  b3: card('broccoli'),
  b4: card('broccoli'),
  c1: card('cauliflower'),
  c2: card('cauliflower'),
  c3: card('cauliflower'),
  c4: card('cauliflower'),
  d1: card('kale'),
  d2: card('kale'),
  d3: card('kale'),
  d4: card('kale'),
  e1: card('brussels sprout'),
  e2: card('brussels sprout'),
  e3: card('brussels sprout'),
  e4: card('brussels sprout'),
  f1: card('romanesco'),
  f2: card('romanesco'),
  f3: card('romanesco'),
  f4: card('romanesco'),
  h1: joker
})
