import { Board } from './board';

it('creates a board', () => {
  const board = new Board();
  
  expect(board).toHaveProperty('order');
  expect(board.order.length).toBe(25);
})

it('creates a board that contains all cards', () => {
  const board = new Board();
  for( let card of Board.cards) {
    expect(board.order).toContain(card)
  }
})

it('can shuffle and return new board');