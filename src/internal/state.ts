import { 
  BroccoliCard, 
  BrusselsSproutCard, 
  CabbageCard, 
  CauliflowerCard, 
  RedCabbageCard, 
  RomanescoCard, 
  JokerCard 
} from './card';

import { Board } from './board';

export interface State {
  score: number;
  board: Board;
  selected: string;
  remaining: number;
  gameOver: boolean;
  isShuffling: boolean;
  a1: CabbageCard;
  a2: CabbageCard;
  a3: CabbageCard;
  a4: CabbageCard;
  b1: BroccoliCard;
  b2: BroccoliCard;
  b3: BroccoliCard;
  b4: BroccoliCard;
  c1: CauliflowerCard;
  c2: CauliflowerCard;
  c3: CauliflowerCard;
  c4: CauliflowerCard;
  d1: RedCabbageCard;
  d2: RedCabbageCard;
  d3: RedCabbageCard;
  d4: RedCabbageCard;
  e1: BrusselsSproutCard;
  e2: BrusselsSproutCard;
  e3: BrusselsSproutCard;
  e4: BrusselsSproutCard;
  f1: RomanescoCard;
  f2: RomanescoCard;
  f3: RomanescoCard;
  f4: RomanescoCard;
  g1: JokerCard;
}
