import { Action } from 'redux';
import { JokerCard } from '../card';
import { selectAction } from '../actions';
import { SELECT } from '../constants';

export default function factory(code: string): (joker: JokerCard, action: Action) => JokerCard {
  return function joker(joker: JokerCard = new JokerCard([]), action: Action) {
    switch(action.type) {
      case SELECT:
        if ((action as selectAction).code === code) return joker.select();
    }
    return joker
  }
}
