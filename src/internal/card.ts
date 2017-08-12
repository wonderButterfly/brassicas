export interface ICard {
  URL: string;
  isActive: boolean;
  setId: (id: string) => Card;
  getId: () => string;
}

export interface IActiveCard extends ICard {
  isSelected: boolean;
  select(): Card;
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

export class DisplayingCard<T extends ActiveCard> extends Card {
  private instance: T;

  constructor(path: string, private c:{ new(): T}) {
    super(path, false)
    this.instance = new this.c();
  }

  revert(): T {
    return this.instance;
  }

  inactivate(): InactiveCard {
    const { URL, brassica } = this.instance;
    return new InactiveCard(URL, brassica || '');
  }
}

type ActiveSubCards = CabbageCard|BroccoliCard|CauliflowerCard|RomanescoCard|KaleCard|BrusselsSproutCard|JokerCard

abstract class ActiveCard extends Card implements IActiveCard {
  readonly isSelected: boolean;
  readonly brassica: string | null;

  constructor(protected flippedURL: string) {
    super('/', true);
  }

  abstract select(): any;
  abstract display(): DisplayingCard<ActiveSubCards>;
}

abstract class BrassicaCard extends ActiveCard {
  constructor(readonly brassica: string, path: string) {
    super(path);
  }
}

export class CabbageCard extends BrassicaCard {
  constructor(readonly isSelected: boolean = false) {
    super('cabbage', '/');
  }

  select(): CabbageCard {
    return new CabbageCard(!this.isSelected);
  }

  display(): DisplayingCard<CabbageCard> {
    return new DisplayingCard(this.flippedURL, CabbageCard);
  }
}

export class BroccoliCard extends BrassicaCard {
  constructor(readonly isSelected: boolean = false) {
    super('broccoli', '/');
  }

  select(): BroccoliCard {
    return new BroccoliCard(!this.isSelected);
  }

  display(): DisplayingCard<BroccoliCard> {
    return new DisplayingCard(this.flippedURL, BroccoliCard);
  }
}

export class CauliflowerCard extends BrassicaCard {
  constructor(readonly isSelected: boolean = false) {
    super('cauliflower', '/')
  }

  select(): CauliflowerCard {
    return new CauliflowerCard(!this.isSelected);
  }

  display(): DisplayingCard<CauliflowerCard> {
    return new DisplayingCard(this.flippedURL, CauliflowerCard);
  }
}

export class KaleCard extends BrassicaCard {
  constructor(readonly isSelected: boolean = false) {
    super('kale', '/');
  }

  select(): KaleCard {
    return new KaleCard(!this.isSelected);
  }

  display(): DisplayingCard<KaleCard> {
    return new DisplayingCard(this.flippedURL, KaleCard);
  }
}

export class BrusselsSproutCard extends BrassicaCard {
  constructor(readonly isSelected: boolean = false) {
    super('brussels sprout', '/');
  }

  select(): BrusselsSproutCard {
    return new BrusselsSproutCard(!this.isSelected);
  }

  display(): DisplayingCard<BrusselsSproutCard> {
    return new DisplayingCard(this.flippedURL, BrusselsSproutCard);
  }
}

export class RomanescoCard extends BrassicaCard {
  constructor(readonly isSelected: boolean = false) {
    super('romanesco', '/');
  }

  select(): RomanescoCard {
    return new RomanescoCard(!this.isSelected);
  }

  display(): DisplayingCard<RomanescoCard> {
    return new DisplayingCard(this.flippedURL, RomanescoCard);
  }
}


export class JokerCard extends ActiveCard {
  readonly behaviors: Array<() => void> = [];
  readonly brassica = null;

  constructor(readonly isSelected: boolean = false) {
    super('/');
  }

  select(): JokerCard {
    return new JokerCard(!this.isSelected);
  }
  display(): DisplayingCard<JokerCard> {
    return new DisplayingCard(this.flippedURL, JokerCard)
  }
}