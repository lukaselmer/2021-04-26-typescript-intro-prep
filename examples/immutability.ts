import assertNever from 'assert-never'

function main() {
  const damOrig: Dam = {
    gates: {
      a: 'closed',
      b: 'closed',
      c: 'closed',
    },
    generators: {
      main: 'on',
      backup: 'off',
    },
  }
  execCommands(damOrig, [
    { type: 'print' },
    { type: 'open', gate: 'a' },
    { type: 'print' },
    { type: 'open', gate: 'c' },
    { type: 'open', gate: 'c' },
    { type: 'open', gate: 'c' },
    { type: 'open', gate: 'c' },
    { type: 'print' },
  ])
}

function execCommands(dam: Dam, commands: Command[]) {
  let current = dam
  commands.forEach((command) => {
    const after = exec(current, command)
    console.log('Executing', command)
    if (current !== after)
      console.log(
        'DAM CHANGED => rerender / send update'
      )
    current = after
  })
}

function exec(dam: Dam, command: Command): Dam {
  if (command.type === 'open')
    return updateGates(
      dam,
      openGates(dam.gates, command)
    )
  else if (command.type === 'close')
    return updateGates(
      dam,
      closeGates(dam.gates, command)
    )
  else if (command.type === 'print') {
    printDam(dam)
    return dam
  } else if (command.type === 'switchToBackup')
    return updateGenerators(
      dam,
      switchToBackupGenerators(dam.generators)
    )
  else assertNever(command)
}

function updateGates(dam: Dam, gates: Gates): Dam {
  if (dam.gates === gates) return dam
  return { ...dam, gates }
}

function updateGenerators(
  dam: Dam,
  generators: Generators
): Dam {
  if (dam.generators === generators) return dam
  return { ...dam, generators }
}

type Dam = {
  gates: Gates
  generators: Generators
}

type Gates = Record<string, 'open' | 'closed'>

type Generators = Record<
  'main' | 'backup',
  'on' | 'off'
>

type Command =
  | OpenCommand
  | CloseCommand
  | PrintCommand
  | SwitchToBackupGeneratorCommand

interface OpenCommand {
  type: 'open'
  gate: string
}

interface CloseCommand {
  type: 'close'
  gate: string
}

interface PrintCommand {
  type: 'print'
}

interface SwitchToBackupGeneratorCommand {
  type: 'switchToBackup'
}

main()

function closeGates(
  gates: Gates,
  command: CloseCommand
): Gates {
  if (gates[command.gate] === 'closed') return gates

  console.log(`Closed gate ${command.gate}`)
  return { ...gates, [command.gate]: 'closed' }
}

function openGates(gates: Gates, command: OpenCommand) {
  if (gates[command.gate] === 'open') return gates

  console.log(`Opened gate ${command.gate}`)
  return { ...gates, [command.gate]: 'open' as const }
}

function printDam(dam: Dam) {
  console.log(dam)
}

function switchToBackupGenerators(
  generators: Generators
): Generators {
  return backupGeneratorRunning(generators)
    ? generators
    : { backup: 'on', main: 'off' }
}

function backupGeneratorRunning(
  generators: Generators
) {
  return (
    generators.backup === 'on' &&
    generators.main === 'off'
  )
}

export {}
