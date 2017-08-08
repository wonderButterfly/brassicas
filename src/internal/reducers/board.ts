import { Action } from 'redux';
import { Board } from '../board';
import { INACTIVATE, DISPLAY, REVERT } from '../constants';

export default function board(board: Board = new Board(), action: Action): Board{
  switch(action.type) {
    case DISPLAY: 
      return board.disableClick();
    case INACTIVATE:
      return board.enableClick();
    case REVERT:
      return board.enableClick();
  }
  return board
}