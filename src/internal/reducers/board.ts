import { Action } from 'redux';
import { Board } from '../board';

export default function board(board: Board = new Board(), action: Action): Board{

  return board
}