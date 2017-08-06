import * as React from 'react';
import './Card.css';

import { ICard, IInactiveCard } from './internal/card';

interface Props {
  card: ICard
  selectDispatch: () => void;
}

export default function Card({ card, selectDispatch }: Props) {
  if (card.isActive) {
    return FaceDownCard(selectDispatch)
  } else {
    const inactiveCard = card as IInactiveCard
    return InactiveCard(inactiveCard.URL, inactiveCard.name)
  }
}

function FaceDownCard(select: () => any) {
  const flippedURL = '/assets/img/cards/flipped.jpg';
  return <div className="card" onClick={select}>
    <img className="card-img-facedown" src={flippedURL} />
  </div>
}

function InactiveCard(url: string, name: string) {
  return <div className="card">
    <img src={url} />
    <h5>{name}</h5>
  </div>
}

