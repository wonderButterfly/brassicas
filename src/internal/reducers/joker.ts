import { Action } from 'redux';
import { JokerCard, DisplayingCard } from '../card';
import { selectAction } from '../actions';
import { SELECT, REVERT, DISPLAY } from '../constants';

export default function factory(code: string): (joker: JokerCard, action: Action) => JokerCard|DisplayingCard<JokerCard> {
  return function joker(joker: JokerCard|DisplayingCard<JokerCard> = new JokerCard(), action: Action): JokerCard | DisplayingCard<JokerCard> {
    switch(action.type) {
      case SELECT:
        if ((action as selectAction).code === code) return (joker as JokerCard).select();
      case DISPLAY:
        if ((action as selectAction).code === code) return (joker as JokerCard).display();
      case REVERT:
        if ((action as selectAction).code === code) return (joker as DisplayingCard<JokerCard>).revert();
    }
    return joker
  }
}
