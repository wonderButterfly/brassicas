export interface ICard {
  URL: string;
  isActive: boolean;
  isJoker: boolean;
  setId: (id: string) => Card;
  getId: () => string;
}

export interface IActiveCard extends ICard {
  isSelected: boolean;
  select(): Card;
}

export interface IInactiveCard extends ICard {
  name: string;
  isCorrect: boolean;
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

  get isJoker(): boolean {
    return this instanceof JokerCard;
  }
}

export class InactiveCard extends Card implements IInactiveCard {
  readonly isCorrect: boolean = true;
  constructor(path: string, readonly name: string) {
    super(path, false);
  }
}

export class DisplayingCard<T extends ActiveCard> extends Card {
  private instance: T;

  constructor(
    path: string, 
    private c: { new(): T }, 
    readonly isCorrect?: boolean
  ) {
    super(path, false);
    this.instance = new this.c();
  }

  revert(): T {
    return this.instance;
  }

  inactivate(): InactiveCard {
    const { URL, brassica } = this.instance;
    return new InactiveCard(URL, brassica || '');
  }

  incorrect(): DisplayingCard<T> {
    return new DisplayingCard<T>(this.instance.URL, this.c, false);
  }

  get isJoker(): boolean {
    return this.instance instanceof JokerCard;
  }
}

type ActiveSubCards = 
  CabbageCard|
  BroccoliCard|
  CauliflowerCard|
  RomanescoCard|
  RedCabbageCard|
  BrusselsSproutCard|
  JokerCard;

abstract class ActiveCard extends Card implements IActiveCard {
  readonly isSelected: boolean;
  readonly brassica: string | null;

  constructor(path: string) {
    super(path, true);
  }

  abstract select(): ActiveSubCards;
  abstract display(): DisplayingCard<ActiveSubCards>;
}

abstract class BrassicaCard extends ActiveCard {
  constructor(readonly brassica: string, path: string) {
    super('/assets/img/brassicas/' + path);
  }
}

export class CabbageCard extends BrassicaCard {
  constructor(readonly isSelected: boolean = false) {
    super('cabbage', 'cabbage.jpg');
  }

  select(): CabbageCard {
    return new CabbageCard(!this.isSelected);
  }

  display(): DisplayingCard<CabbageCard> {
    return new DisplayingCard(this.URL, CabbageCard);
  }
}

export class BroccoliCard extends BrassicaCard {
  constructor(readonly isSelected: boolean = false) {
    super('broccoli', 'broccoli.jpg');
  }

  select(): BroccoliCard {
    return new BroccoliCard(!this.isSelected);
  }

  display(): DisplayingCard<BroccoliCard> {
    return new DisplayingCard(this.URL, BroccoliCard);
  }
}

export class CauliflowerCard extends BrassicaCard {
  constructor(readonly isSelected: boolean = false) {
    super('cauliflower', 'cauliflower.jpg');
  }

  select(): CauliflowerCard {
    return new CauliflowerCard(!this.isSelected);
  }

  display(): DisplayingCard<CauliflowerCard> {
    return new DisplayingCard(this.URL, CauliflowerCard);
  }
}

export class RedCabbageCard extends BrassicaCard {
  constructor(readonly isSelected: boolean = false) {
    super('red cabbage', 'red-cabbage.jpg');
  }

  select(): RedCabbageCard {
    return new RedCabbageCard(!this.isSelected);
  }

  display(): DisplayingCard<RedCabbageCard> {
    return new DisplayingCard(this.URL, RedCabbageCard);
  }
}

export class BrusselsSproutCard extends BrassicaCard {
  constructor(readonly isSelected: boolean = false) {
    super('brussels sprouts', 'brusselssprouts.jpg');
  }

  select(): BrusselsSproutCard {
    return new BrusselsSproutCard(!this.isSelected);
  }

  display(): DisplayingCard<BrusselsSproutCard> {
    return new DisplayingCard(this.URL, BrusselsSproutCard);
  }
}

export class RomanescoCard extends BrassicaCard {
  constructor(readonly isSelected: boolean = false) {
    super('romanesco', 'romanesco.jpg');
  }

  select(): RomanescoCard {
    return new RomanescoCard(!this.isSelected);
  }

  display(): DisplayingCard<RomanescoCard> {
    return new DisplayingCard(this.URL, RomanescoCard);
  }
}

export class JokerCard extends ActiveCard {
  readonly behaviors: Array<() => void> = [];

  constructor(readonly isSelected: boolean = false) {
    super('/');
  }

  select(): JokerCard {
    return new JokerCard(!this.isSelected);
  }
  display(): DisplayingCard<JokerCard> {
    return new DisplayingCard(this.URL, JokerCard);
  }
}