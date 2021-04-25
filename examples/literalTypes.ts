const house = createHouse('red')

if (house) printHouse(house)
else console.log('Could not create house')

function createHouse(color: Color): House | undefined {
  if (isHouseColor(color)) return { color: color }
  else return undefined
}

function isHouseColor(
  color: string
): color is HouseColor {
  return houseColors
    .map<string>((color) => color)
    .includes(color)
}

function printHouse(house: House) {
  console.log(house.color)
}

interface House {
  color: HouseColor
}

const houseColors: HouseColor[] = [
  'red',
  'green',
  'blue',
]
type HouseColor = 'red' | 'green' | 'blue'
type Color = string

// #region superheros

const peter = {
  type: 'person' as const,
  name: 'Peter Parker',
  friend: 'Marry Jane',
}

const spiderman = {
  type: 'superhero' as const,
  name: 'Spiderman',
  ability: 'spider things',
  secretIdentity: peter,
}

printFigure(peter)
printFigure(spiderman)
printSuperhero(spiderman)

function printFigure(figure: Person | Superhero) {
  console.log(figure.name)
  if (figure.type === 'person') printPerson(figure)
  else printSuperhero(figure)
}

function printPerson(person: Person) {
  console.log(person.friend, person.friend)
}

function printSuperhero(superhero: Superhero) {
  console.log(superhero.name, superhero.ability)
}

interface Person {
  type: 'person'
  name: string
  friend: string
}

interface Superhero {
  type: 'superhero'
  name: string
  ability: string
  secretIdentity: Person
}

//#endregion superheros

export {}
