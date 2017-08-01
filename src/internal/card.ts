abstract class Card {
  public faceUpURL: string;

  constructor(
    public faceDownURL: string,
    public isSelected: boolean
  ) {

  }
}

type Constructor = (...args: any[]) => void

abstract class BrassicaCard extends Card {
  constructor(
    public brassica: string, 
    path: string,
    isSelected: boolean = false
  ) {
    super(path, isSelected)
    this.select = this.select.bind(this)
  }


  select(): BrassicaCard {
    const { brassica, faceDownURL, isSelected } = this
    const constructorOfSameBrassica = this.constructor as BrassicaCardConstructor
    return (new constructorOfSameBrassica(brassica, faceDownURL, isSelected)) as BrassicaCard
  }
}

class CabbageCard extends BrassicaCard {
  constructor() {
    super('cabbage', '/')
  }

  checking() {
    return this.
  }
}

new CabbageCard()

class JokerCard extends Card {

}