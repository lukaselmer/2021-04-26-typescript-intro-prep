function main() {
  const seller = new Seller()
  seller.addForSale({
    draw: () => console.log('Red house'),
  })
  seller.addForSale({
    draw: () => console.log('Green house'),
  })
  seller.addForSale(new HouseImpl('Blue'))
  seller.addForSale(({
    name: 'my fake house',
  } as unknown) as House)

  seller.drawHouses()
}

class Seller {
  private readonly houses: House[] = []

  addForSale(house: House) {
    this.houses.push(house)
  }

  drawHouses() {
    this.houses.forEach((house) => house.draw())
  }
}

interface House {
  draw(): void
}

class HouseImpl {
  constructor(private readonly color: string) {}

  draw() {
    console.log(`${this.color} house`)
  }
}

main()

export {}
