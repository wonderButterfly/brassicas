import { Action } from 'redux';
import { ADD_SELECTED, SUB_SELECTED} from '../constants';
import { selectAction } from '../actions';

export default function selected(id: string | null = null, action: Action): string | null {
  switch(action.type) {
    case ADD_SELECTED:
      const { code } = action as selectAction
      return code
    case SUB_SELECTED:
      return null
  }
  
  return id;
}