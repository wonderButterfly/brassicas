import { Action } from 'redux';

import { scoreAction } from '../actions';
import { ADD_SCORE } from '../constants';

export default function score(score: number = 0, action: Action): number {
  switch(action.type) {
    case ADD_SCORE:
      const { amount } = action as scoreAction;
      return score + amount;
  }
  return score
}