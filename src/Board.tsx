import * as React from 'react';

import { ICard, IActiveCard } from './internal/card';
import Card from './Card';

import './Board.css';

interface Props {
  order: string[];
  cards: {
    [id: string]: ICard;
  };
  count: number;
  select: (code: string, count: number) => void;
  unselect: (code: string) => void;
}

export default function Board({ order, cards, select, unselect, count }: Props) {
  return <div className="Board">
    {order.map((id: string) => {
      const card: ICard = cards[id];
      let key = id;
      let dispatch: () => void;

      if (card.isActive) {
        const {isSelected} = card as IActiveCard
        key = (isSelected ? '+' : '-') + key;
        dispatch = isSelected ? () => {unselect(id)} : () => {select(id, count)}
      }
      else {
        dispatch = () => {}
      }
      
      return <Card key={key} card={card} selectDispatch={dispatch}/>
    })}
  </div>
}
