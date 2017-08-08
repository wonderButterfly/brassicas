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
    const {URL, name} = card as IInactiveCard
    return InactiveCard(URL, name)
  }
}

function FaceDownCard(isSelected: boolean, select: () => any) {
  const flippedURL = '/assets/img/cards/flipped.jpg';
  const selected = isSelected ? 'selected' : 'unselected'
  return <div className={`card card-${selected}`} onClick={select}>
    <img className="card-img-facedown" src={flippedURL} />
  </div>
}

function InactiveCard(url: string, name: string) {
  return <div className="card">
    <img src={url} />
    <h5>{name}</h5>
  </div>
}

