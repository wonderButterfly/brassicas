import { Action } from 'redux';

import { ScoreAction } from '../actions';
import { ADD_SCORE } from '../constants';

export default function scoreReducer(score: number = 0, action: Action): number {
  switch (action.type) {
    case ADD_SCORE:
      const { amount } = action as ScoreAction;
      return score + amount;
    default:
      return score;
  }
}