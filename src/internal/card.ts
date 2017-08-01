abstract class Card {
  constructor(
    readonly URL: string,
    readonly isActive: boolean
  ) { }
}

export class InactiveCard extends Card {
  constructor(path: string) {
    super(path, false)
  }
}

abstract class ActiveCard extends Card {
  readonly isSelected: boolean;

  constructor(path: string) {
    super(path, true)
  }

}

abstract class BrassicaCard extends ActiveCard {
  constructor(
    readonly brassica: string, 
    path: string
  ) {
    super(path)
  }

  abstract select(): any

  compare(card: Card): boolean {
    if (card instanceof BrassicaCard) return this.brassica === card.brassica;
    else return false;
  }
}

export class CabbageCard extends BrassicaCard {
  constructor(isSelected: boolean = false) {
    super('cabbage', '/')
  }

  select(): CabbageCard {
    return new CabbageCard(!this.isSelected)
  }

}

export class BroccoliCard extends BrassicaCard {
  constructor(isSelected: boolean = false) {
    super('broccoli', '/')
  }

  select(): BroccoliCard {
    return new BroccoliCard(!this.isSelected)
  }
}

export class CauliflowerCard extends BrassicaCard {
  constructor(isSelected: boolean = false) {
    super('cauliflower', '/')
  }

  select(): CauliflowerCard {
    return new CauliflowerCard(!this.isSelected)
  }
}

export class KaleCard extends BrassicaCard {
  constructor(isSelected: boolean = false) {
    super('kale', '/')
  }

  select(): KaleCard {
    return new KaleCard(!this.isSelected)
  }
}

export class BrusselsSproutCard extends BrassicaCard {
  constructor(isSelected: boolean = false) {
    super('kale', '/')
  }

  select(): BrusselsSproutCard {
    return new BrusselsSproutCard(!this.isSelected)
  }
}

export class RomanescoCard extends BrassicaCard {
  constructor(isSelected: boolean = false) {
    super('kale', '/')
  }

  select(): RomanescoCard {
    return new RomanescoCard(!this.isSelected)
  }
}


export class JokerCard extends ActiveCard {

}