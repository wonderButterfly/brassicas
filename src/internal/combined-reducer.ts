import { combineReducers } from 'redux'
import score from './reducers/score';
import card from './reducers/card';

export default combineReducers({ 
  score, 
  rowA: rows, 
  rowB: rows, 
  rowC: rows, 
  rowD: rows, 
  rowE: rows 
})
