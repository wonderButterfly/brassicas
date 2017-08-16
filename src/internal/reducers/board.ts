import { Action } from 'redux';
import { ShuffleAction } from '../actions';
import { Board } from '../board';
import { INACTIVATE, DISPLAY, REVERT, SHUFFLE } from '../constants';

export default function boardReducer(board: Board = new Board(), action: Action): Board {
  switch (action.type) {
    case DISPLAY: 
      return board.disableClick();
    case INACTIVATE:
      return board.enableClick();
    case REVERT:
      return board.enableClick();
    case SHUFFLE: 
      const { blanks, remaining } = action as ShuffleAction;
      return board.shuffled(blanks, remaining);
    default:
      return board;
  }
}