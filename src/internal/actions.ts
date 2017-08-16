import { Action } from 'redux';
import { PRESELECT, UNSELECT, REINIT } from './constants';

export interface SelectAction extends Action {
  code: string;
}

export interface UnselectAction extends Action {
  code: string;
}

export interface InactivateAction extends Action {
  code: string;
}

export interface ScoreAction extends Action {
  amount: number;
}

export interface ShuffleAction extends Action {
  blanks: Array<string|null>;
  remaining: string[];
}

export function getSelectAction(code: string): SelectAction {
  return { type: PRESELECT, code };
}

export function getUnselectAction(code: string): UnselectAction {
  return { type: UNSELECT, code };
}

export function reinitAction(): Action {
  return { type: REINIT };
}