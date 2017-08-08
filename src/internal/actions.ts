import { Action } from 'redux';
import { SELECT } from './constants';

export interface SelectAction extends Action {
  code: string;
}

export function getSelectAction(code: string): SelectAction {
  return { type: SELECT, code }
}