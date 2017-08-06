import { combineReducers } from 'redux'
import score from './reducers/score';
import card from './reducers/card';

export default combineReducers({ 
  score, 
  a1: card('cabbage'),
  a2: card('cabbage')
})
