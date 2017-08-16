import { Action } from 'redux';

import { GAME_OVER } from '../constants';

export default function gameOver(status: boolean = false, action: Action): boolean {
  switch (action.type) {
    case GAME_OVER:
      return true;
    default:
      return status;
  }
}