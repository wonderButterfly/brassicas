import { Action } from 'redux';
import { PRESELECT, UNSELECT, REINIT } from './constants';

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

export interface shuffleAction extends Action {
  blanks: Array<string|null>
  remaining: string[];
}

export function getSelectAction(code: string): selectAction {
  return { type: PRESELECT, code }
}

export function getUnselectAction(code: string): unselectAction {
  return { type: UNSELECT, code }
}

export function reinitAction(): Action {
  return { type: REINIT }
}