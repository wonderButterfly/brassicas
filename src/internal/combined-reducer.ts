import { combineReducers } from 'redux'
import score from './reducers/score';
import board from './reducers/board';
import card from './reducers/cards';
import joker from './reducers/joker'
import { State } from './state';

export default combineReducers<State>({ 
  score,
  board, 
  a1: card('cabbage', 'a1'),
  a2: card('cabbage', 'a2'),
  a3: card('cabbage', 'a3'),
  a4: card('cabbage', 'a4'),
  b1: card('broccoli', 'b1'),
  b2: card('broccoli', 'b2'),
  b3: card('broccoli', 'b3'),
  b4: card('broccoli', 'b4'),
  c1: card('cauliflower', 'c1'),
  c2: card('cauliflower', 'c2'),
  c3: card('cauliflower', 'c3'),
  c4: card('cauliflower', 'c4'),
  d1: card('kale', 'd1'),
  d2: card('kale', 'd2'),
  d3: card('kale', 'd3'),
  d4: card('kale', 'd4'),
  e1: card('brussels sprout', 'e1'),
  e2: card('brussels sprout', 'e2'),
  e3: card('brussels sprout', 'e3'),
  e4: card('brussels sprout', 'e4'),
  f1: card('romanesco', 'f1'),
  f2: card('romanesco', 'f2'),
  f3: card('romanesco', 'f3'),
  f4: card('romanesco', 'f4'),
  g1: joker
})
