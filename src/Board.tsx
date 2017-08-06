import * as React from 'react';

import { ICard } from './internal/card';
import Card from './Card';

import './Board.css';

interface Props {
  order: string[];
  cards: {
    [id: string]: ICard;
  }
}

export default function Board({ order, cards }: Props) {
  return <div className="Board">
    {order.map((id: string) => {
      const card: ICard = cards[id];
      return <Card card={card} selectDispatch={() => {console.log(card.getId())}}/>
    })}
  </div>
}
