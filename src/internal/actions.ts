import { Action } from 'redux';
import { SELECT, UNSELECT } from './constants';

export interface selectAction extends Action {
  code: string;
}

export interface unselectAction extends Action {
  code: string;
}

export interface inactivateAction extends Action {
  code: string;
}

export interface scoreAction extends Action {
  amount: number;
}

export function getSelectAction(code: string): selectAction {
  return { type: SELECT, code }
}

export function getUnselectAction(code: string): unselectAction {
  return { type: UNSELECT, code }
}
