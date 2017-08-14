import { BroccoliCard } from './card';


it('creates a card', () => {
  const myCard = new BroccoliCard()

  expect(myCard).toHaveProperty('brassica')
  expect(myCard.brassica).toBe('broccoli')
  expect(myCard).toHaveProperty('isActive')
  expect(myCard.isActive).toBe(true)
})