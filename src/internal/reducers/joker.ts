import { Action } from 'redux';
import { JokerCard, DisplayingCard } from '../card';
import { SelectAction } from '../actions';
import { SELECT, REVERT, DISPLAY } from '../constants';

export default function factory(code: string): (joker: JokerCard, action: Action) => JokerCard|DisplayingCard<JokerCard> {
  return function jokerReducer(joker: JokerCard|DisplayingCard<JokerCard> = new JokerCard(), action: Action): JokerCard | DisplayingCard<JokerCard> {
    switch (action.type) {
      case SELECT:
        if ((action as SelectAction).code === code) return (joker as JokerCard).select();
        break;
      case DISPLAY:
        if ((action as SelectAction).code === code) return (joker as JokerCard).display();
        break;
      case REVERT:
        if ((action as SelectAction).code === code) return (joker as DisplayingCard<JokerCard>).revert();
        break;
      default:
        return joker;
    }
    return joker;
  };
}
