import Card from './card'

export type Row = [Card, Card, Card, Card, Card]

export interface State {
  rowA: Row;
  rowB: Row;
  rowC: Row;
  rowD: Row;
  rowE: Row;
  score: number;
}
