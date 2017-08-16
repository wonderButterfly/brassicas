import { Action } from 'redux';

import { INACTIVATE } from '../constants';

export default function scoreReducer(score: number = 25, action: Action): number {
  switch (action.type) {
    case INACTIVATE:
      return score - 1;
    default:
      return score;
  }
}