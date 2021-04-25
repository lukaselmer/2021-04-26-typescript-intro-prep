const colorsToHexA: Record<string, number> = {
  red: 0xff0000,
  green: 0x00ff00,
  blue: 0x0000ff,
  null: 1,
  undefined: 2,
}

console.log(colorsToHexA['null'])
console.log(colorsToHexA['undefined'])
console.log(colorsToHexA[null as any])
console.log(colorsToHexA[undefined as any])

const colorsToHexB = new Map<
  string | null | undefined,
  number
>(
  Object.entries({
    red: 0xff0000,
    green: 0x00ff00,
    blue: 0x0000ff,
    null: 1,
    undefined: 2,
  })
)
colorsToHexB.set(undefined, -1)
colorsToHexB.set(null, -2)

const hex = colorsToHexB.get('null')
console.log(`B: ${hex}`)

export {}
