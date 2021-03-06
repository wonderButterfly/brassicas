export interface IBoard {
  order: string[];
  isClickDisabled: boolean;
}

export class Board {
  static cards: string[] = [
      'a1', 'a2', 'a3', 'a4',
      'b1', 'b2', 'b3', 'b4',
      'c1', 'c2', 'c3', 'c4',
      'd1', 'd2', 'd3', 'd4',
      'e1', 'e2', 'e3', 'e4',
      'f1', 'f2', 'f3', 'f4',
      'g1'
    ];

  static shuffle(cards: string[] = Board.cards): string[] {
    const shuffled = [];
    let remaining = [...cards];
    while (shuffled.length < Board.cards.length) {
      let random: number = Math.floor(Math.random() * remaining.length);
      shuffled.push(remaining.splice(random, 1)[0]);
    }
    return shuffled;
  }

  constructor(
    readonly order: string[] = Board.shuffle(),
    readonly isClickDisabled: boolean = false
  ) { }

  disableClick(): Board {
    return new Board(this.order, true);
  }

  enableClick(): Board {
    return new Board(this.order);
  }

  public shuffled(input: Array<string|null>, remaining: string[]): Board {
    const newOrder: string[] = [];
    const remainingShuffled = Board.shuffle(remaining);
    for (let i = 0; i < input.length; i++) {
      newOrder[i] = input[i] || shift(remainingShuffled);
    }

    return new Board(newOrder);
  }
}

function shift(arr: string[]): string {
  return arr.shift() || '';
}