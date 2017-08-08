export interface ICard {
  URL: string;
  isActive: boolean;
  setId: (id: string) => Card;
  getId: () => string;
}

export interface IActiveCard extends ICard {
  isSelected: boolean;
}

export interface IInactiveCard extends ICard {
  name: string;
}

abstract class Card implements ICard {
  private id: string;

  constructor(
    readonly URL: string,
    readonly isActive: boolean
  ) {
    this.id = '';
  }

  public setId(id: string): Card {
    this.id = id;
    return this;
  }

  public getId(): string {
    return this.id;
  }
}

export class InactiveCard extends Card implements IInactiveCard {
  constructor(path: string, public name: string) {
    super(path, false);
  }
}

abstract class ActiveCard extends Card implements IActiveCard {
  readonly isSelected: boolean;

  constructor(readonly flippedURL: string) {
    super('/', true);
  }

  abstract select(): any;
}

abstract class BrassicaCard extends ActiveCard {
  constructor(
    readonly brassica: string, 
    path: string
  ) {
    super(path);
  }


  compare(card: Card): boolean {
    if (card instanceof BrassicaCard) return this.brassica === card.brassica;
    else return false;
  }
}

export class CabbageCard extends BrassicaCard {
  constructor(readonly isSelected: boolean = false) {
    super('cabbage', '/');
  }

  select(): CabbageCard {
    return new CabbageCard(!this.isSelected);
  }

}

export class BroccoliCard extends BrassicaCard {
  constructor(readonly isSelected: boolean = false) {
    super('broccoli', '/');
  }

  select(): BroccoliCard {
    return new BroccoliCard(!this.isSelected);
  }
}

export class CauliflowerCard extends BrassicaCard {
  constructor(readonly isSelected: boolean = false) {
    super('cauliflower', '/')
  }

  select(): CauliflowerCard {
    return new CauliflowerCard(!this.isSelected)
  }
}

export class KaleCard extends BrassicaCard {
  constructor(readonly isSelected: boolean = false) {
    super('kale', '/');
  }

  select(): KaleCard {
    return new KaleCard(!this.isSelected);
  }
}

export class BrusselsSproutCard extends BrassicaCard {
  constructor(readonly isSelected: boolean = false) {
    super('brussels sprout', '/');
  }

  select(): BrusselsSproutCard {
    return new BrusselsSproutCard(!this.isSelected);
  }
}

export class RomanescoCard extends BrassicaCard {
  constructor(readonly isSelected: boolean = false) {
    super('romanesco', '/');
  }

  select(): RomanescoCard {
    return new RomanescoCard(!this.isSelected);
  }
}


export class JokerCard extends ActiveCard {
  constructor(
    readonly behaviors: Array<() => {}>,
    readonly isSelected: boolean = false,
  ) {
    super('/');
  }

  select(): JokerCard {
    return new JokerCard(this.behaviors, !this.isSelected);
  }
}