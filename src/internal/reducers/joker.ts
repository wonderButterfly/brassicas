import { Action } from 'redux';
import { JokerCard } from '../card';
import { SelectAction } from '../actions';
import { SELECT } from '../constants';

export default function factory(code: string): (joker: JokerCard, action: Action) => JokerCard {
  return function joker(joker: JokerCard = new JokerCard([]), action: Action) {
    switch(action.type) {
      case SELECT:
        if ((action as SelectAction).code === code) return joker.select();
    }
    return joker
  }
}
