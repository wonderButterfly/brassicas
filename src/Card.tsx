import * as React from 'react';
import './Card.css';

import { ICard, IInactiveCard, IActiveCard } from './internal/card';

interface Props {
  card: ICard
  selectDispatch: () => void;
}

export default function Card({ card, selectDispatch }: Props) {
  if (card.isActive) {
    const { isSelected } = card as IActiveCard;
    return FaceDownCard(isSelected, selectDispatch)
  } else {
    const {URL, isCorrect} = card as IInactiveCard
    return InactiveCard(URL, isCorrect)
  }
}

function FaceDownCard(isSelected: boolean, select: () => any) {
  const selected = isSelected ? 'selected' : 'unselected'
  return <div className={`card card-facedown card-${selected}`} onClick={select} />
}

function InactiveCard(url: string, isCorrect: boolean) {
  const style = {
    backgroundImage: `url(${url})`,
    backgroundSize: '100% 100%'
  }
  return <div className={`card card-guess-${isCorrect}`} style={style} />
}

