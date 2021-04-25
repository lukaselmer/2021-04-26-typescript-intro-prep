const peter = { name: 'Peter Parker' }

const spiderman = {
  name: 'Spiderman',
  ability: 'spider things',
  secretIdentity: peter,
}

printPerson(peter)
printPerson(spiderman)
printSuperhero(spiderman)

function printPerson(person: Person) {
  console.log(person.name)
}

function printSuperhero(superhero: Superhero) {
  console.log(superhero.name, superhero.ability)
}
interface Person {
  name: string
}

interface Superhero {
  name: string
  ability: string
  secretIdentity: Person
}

export {}
