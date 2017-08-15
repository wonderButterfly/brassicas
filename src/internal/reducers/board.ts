import { Action } from 'redux';
import { shuffleAction } from '../actions';
import { Board } from '../board';
import { INACTIVATE, DISPLAY, REVERT, SHUFFLE } from '../constants';

export default function board(board: Board = new Board(), action: Action): Board{
  switch(action.type) {
    case DISPLAY: 
      return board.disableClick();
    case INACTIVATE:
      return board.enableClick();
    case REVERT:
      return board.enableClick();
    case SHUFFLE: 
      const { blanks, remaining } = action as shuffleAction
      return board.shuffled(blanks, remaining);
  }
  return board
}