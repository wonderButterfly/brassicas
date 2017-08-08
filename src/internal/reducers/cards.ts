import { 
  BroccoliCard, 
  CabbageCard,
  CauliflowerCard,
  RomanescoCard,
  KaleCard,
  BrusselsSproutCard,
  InactiveCard
} from '../card';
import { SELECT, INACTIVATE } from '../constants';
import { Action } from 'redux';
import { selectAction } from '../actions';

type Cards = BroccoliCard | CabbageCard | KaleCard | CauliflowerCard | RomanescoCard | BrusselsSproutCard;

function initialize<T extends Cards>(card: T, code: string): T {
  return card.setId(code) as T
}

export default function factory<T extends Cards>(c: {new(): T}, code: string): (card: T, action: Action) => T |InactiveCard {
  return function(card: T = initialize(new c(), code), action: Action): T | InactiveCard {
    switch(action.type) {
      case SELECT:
        if ((action as selectAction).code === code) {
          return card.select() as T
        }
      case INACTIVATE:
        if ((action as selectAction).code === code) {
          return new InactiveCard(card.URL, card.brassica)
        }
    }

    return card;
  }
}