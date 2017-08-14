import { 
  BroccoliCard, 
  CabbageCard,
  CauliflowerCard,
  RomanescoCard,
  RedCabbageCard,
  BrusselsSproutCard,
  InactiveCard,
  DisplayingCard
} from '../card';
import { SELECT, INACTIVATE, DISPLAY, REVERT } from '../constants';
import { Action } from 'redux';
import { selectAction } from '../actions';

type Cards = BroccoliCard | CabbageCard | RedCabbageCard | CauliflowerCard | RomanescoCard | BrusselsSproutCard;

function initialize<T extends Cards>(card: T, code: string): T {
  return card.setId(code) as T
}

export default function factory<T extends Cards>(c: {new(): T}, code: string): (card: T, action: Action) => T |InactiveCard | DisplayingCard<T>{
  return function(card: T | DisplayingCard<T> = initialize(new c(), code), action: Action): T | InactiveCard | DisplayingCard<T> {
    switch(action.type) {
      case SELECT:
        if ((action as selectAction).code === code) {
          return (card as T).select() as T;
        }
        break;
      case DISPLAY:
        if ((action as selectAction).code === code) {
          return (card as T).display() as DisplayingCard<T>;
        }
        break;
      case INACTIVATE:
        if ((action as selectAction).code === code) {
          return (card as DisplayingCard<T>).inactivate();
        }
        break;
      case REVERT:
        if ((action as selectAction).code === code) {
          return (card as DisplayingCard<T>).revert();
        }
        break;
    }

    return card;
  }
}