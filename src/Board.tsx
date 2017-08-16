import * as React from 'react';

import { ICard, IActiveCard } from './internal/card';
import Card from './Card';

import './Board.css';

interface Props {
  order: string[];
  cards: {
    [id: string]: ICard;
  };
  click: boolean;
  selected: string;
  select: (code: string) => void;
  unselect: (code: string) => void;
}

export default function Board({ order, click, cards, select, unselect, selected }: Props) {
  return (
    <div className="Board">
      {order.map((id: string) => {
        const card: ICard = cards[id];
        let key = id;
        let dispatch: () => void;

        if (card.isActive) {
          const {isSelected} = card as IActiveCard;
          key = (isSelected ? '+' : '-') + key;
          dispatch = isSelected ? () => {unselect(id); } : () => {select(id); };
        } else {
          dispatch = () => { };
        }
        
        return <Card key={key} card={card} selectDispatch={click ? () => {} : dispatch}/>;
      })}
    </div>
  );
}
