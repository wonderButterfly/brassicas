import { 
  BroccoliCard, 
  BrusselsSproutCard, 
  CabbageCard, 
  CauliflowerCard, 
  KaleCard, 
  RomanescoCard, 
  JokerCard 
} from './card';

export interface State {
  score: number;
  board: any;
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
  d1: KaleCard;
  d2: KaleCard;
  d3: KaleCard;
  d4: KaleCard;
  e1: BrusselsSproutCard;
  e2: BrusselsSproutCard;
  e3: BrusselsSproutCard;
  e4: BrusselsSproutCard;
  f1: RomanescoCard;
  f2: RomanescoCard;
  f3: RomanescoCard;
  f4: RomanescoCard;
  h1: JokerCard;
}
