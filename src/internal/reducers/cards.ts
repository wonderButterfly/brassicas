import { 
  BroccoliCard, 
  CabbageCard,
  CauliflowerCard,
  RomanescoCard,
  KaleCard,
  BrusselsSproutCard
} from '../card';
import { SELECT } from '../constants';
import { Action } from 'redux';
import { SelectAction } from '../actions';

type Cards = BroccoliCard | CabbageCard | KaleCard | CauliflowerCard | RomanescoCard | BrusselsSproutCard;

function initialize<T extends Cards>(card: T, code: string): T {
  return card.setId(code) as T
}

export default function factory<T extends Cards>(c: {new(): T}, code: string): (card: T, action: Action) => T {
  return function(card: T = initialize(new c(), code), action: Action): T {
    switch(action.type) {
      case SELECT:
        if ((action as SelectAction).code === code) {
          return card.select() as T
        }
    }

    return card;
  }
}