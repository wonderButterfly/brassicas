import * as React from 'react';

import { ICard, IActiveCard } from './internal/card';
import Card from './Card';

import './Board.css';

interface Props {
  order: string[];
  cards: {
    [id: string]: ICard;
  };
  select: (code: string) => void;
}

export default function Board({ order, cards, select }: Props) {
  return <div className="Board">
    {order.map((id: string) => {
      const card: ICard = cards[id];
      let key = id;
      if (card.isActive) {
        key = ((card as IActiveCard).isSelected ? '+' : '-') + key;
      }
      return <Card key={key} card={card} selectDispatch={() => {select(id)}}/>
    })}
  </div>
}
