import {Store, Dispatch, Action} from 'redux';
import {IActiveCard} from './card';
import {State} from './state';
import {SELECT, UNSELECT, ADD_SELECTED, SUB_SELECTED, INACTIVATE, ADD_SCORE} from './constants';
import {selectAction, unselectAction} from './actions';

export default [
  function middleware1({dispatch, getState}: Store<State>) {
    return function(next: Dispatch<Action>): (action: Action) => void {
      return function(action: Action) {
        const selected = getState().selected
        if (action.type === SELECT) {
          const {code} = action as selectAction;
          if (selected === null) {
            next({type: SELECT, code});
            return next({type: ADD_SELECTED, code});
          }
          else {
            const selectedCard = getState()[selected] as IActiveCard;
            const thisCard = getState()[code]

            if (selectedCard.compare(thisCard)) {
              next({type: INACTIVATE, code})
              next({type: INACTIVATE, code: selected})

            } else {

              next({type: SELECT, code: selected})
              next({type: ADD_SCORE, amount: 2})
            }
            return next({type: SUB_SELECTED});
          }
        }
        if (action.type === UNSELECT) {
          const { code } = action as unselectAction;
          dispatch({type: SELECT, code});
          return next({type: SUB_SELECTED});
        }

        return next(action);
      }
    }
  }
]
