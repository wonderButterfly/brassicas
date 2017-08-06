import { 
  BroccoliCard, 
  CabbageCard,
  CauliflowerCard,
  RomanescoCard,
  KaleCard,
  BrusselsSproutCard
} from '../card';
import { Action } from 'redux';

type Cards = BroccoliCard | CabbageCard | KaleCard | CauliflowerCard | RomanescoCard | BrusselsSproutCard

export default function(type: string, code: string): (card: Cards, action: Action) => Cards {
  switch(type) {
    case 'broccoli':
      return function(card: BroccoliCard = new BroccoliCard(), action: Action) {
        if (card.getId() === code) {

        }

        return card.setId(code) as BroccoliCard
      }
    case 'cabbage': 
      return function(card: CabbageCard = new CabbageCard(), action: Action): CabbageCard {

        return card.setId(code) as CabbageCard
      }
    case 'kale': 
      return function(card: KaleCard = new KaleCard(), action: Action) {

        return card.setId(code) as KaleCard
      }
    case 'cauliflower': 
      return function(card: CauliflowerCard = new CauliflowerCard(), action: Action) {

        return card.setId(code) as CauliflowerCard
      }
    case 'romanesco': 
      return function(card: RomanescoCard = new RomanescoCard(), action: Action) {

        return card.setId(code) as RomanescoCard
      }
    case 'brussels sprout': 
      return function(card: BrusselsSproutCard = new BrusselsSproutCard(), action: Action) {

        return card.setId(code) as BrusselsSproutCard
      }
    default:
      return function(card: any) {return card}
  }
}
