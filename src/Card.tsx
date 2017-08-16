import * as React from 'react';
import './Card.css';

import { ICard, IInactiveCard, IActiveCard } from './internal/card';

interface Props {
  card: ICard;
  selectDispatch: () => void;
}

export default function Card({ card, selectDispatch }: Props) {
  if (card.isActive) {
    const { isSelected } = card as IActiveCard;
    return FaceDownCard(isSelected, selectDispatch);
  } else {
    const {URL, isCorrect, isJoker} = card as IInactiveCard;
    if (isJoker) return JokerDisplay();
    return InactiveCard(URL, isCorrect);
  }
}

function FaceDownCard(isSelected: boolean, select: () => any) {
  const selected = isSelected ? 'selected' : 'unselected';
  return <div className={`card card-facedown card-${selected}`} onClick={select} />;
}

function InactiveCard(url: string, isCorrect: boolean) {
  const style = {
    backgroundImage: `url(${url})`,
    backgroundSize: '100% 100%'
  };
  return <div className={`card card-guess-${isCorrect}`} style={style} />;
}

const jokerSVG = require('./joker.svg');

function JokerDisplay() {
  return (
    <div className="card">
      <div className="card-flex">
        <img src={jokerSVG} className="card-joker" alt="joker" />
      </div>
    </div>
  );
}