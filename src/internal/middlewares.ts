import {Store, Dispatch, Action} from 'redux';
import {State} from './state';
import {PRESELECT, SELECT, UNSELECT, ADD_SELECTED, SUB_SELECTED, INACTIVATE, ADD_SCORE, DISPLAY, REVERT} from './constants';
import {selectAction, unselectAction} from './actions';

export default [
  function middleware1({dispatch, getState}: Store<State>) {
    return function(next: Dispatch<Action>): (action: Action) => void {
      return function(action: Action) {
        if (action.type === PRESELECT) {
          const {code} = action as selectAction;
          const selected = getState().selected
          if (selected === null) {
            next({type: SELECT, code});
            return next({type: ADD_SELECTED, code});
          }
          else {
            next({type: DISPLAY, code})
            next({type: DISPLAY, code: selected})

            setTimeout(() => {
              const selectedCard = getState()[selected];
              const thisCard = getState()[code]

              if (selectedCard.compare(thisCard)) {
                next({type: INACTIVATE, code})
                next({type: INACTIVATE, code: selected})

              } 
              else {
                setTimeout(() => {
                  next({type: REVERT, code})
                  next({type: REVERT, code: selected})

                  next({type: ADD_SCORE, amount: 2})
                }, 1000);
              }
              return next({type: SUB_SELECTED});
            }, 1000)
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
