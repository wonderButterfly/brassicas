import { BroccoliCard, CabbageCard } from './card';


it('creates a card', () => {
  const myCard = new BroccoliCard()

  expect(myCard).toHaveProperty('brassica')
  expect(myCard.brassica).toBe('broccoli')

})

it('allows for comparisons', () => {
  const a = new BroccoliCard();
  const b = new BroccoliCard();
  const c = new CabbageCard();

  expect(a.compare(b)).toBe(true);
  expect(a.compare(c)).toBe(false);
})