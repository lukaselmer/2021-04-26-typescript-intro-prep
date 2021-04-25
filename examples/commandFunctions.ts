import assertNever from 'assert-never'

function main() {
  const dam: Dam = {
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
  exec(dam, { type: 'print' })
  exec(dam, { type: 'open', gate: 'a' })
  exec(dam, { type: 'print' })
  exec(dam, { type: 'open', gate: 'c' })
  exec(dam, { type: 'print' })
}

function exec(dam: Dam, command: Command) {
  if (command.type === 'open')
    openGates(dam.gates, command)
  else if (command.type === 'close')
    closeGates(dam.gates, command)
  else if (command.type === 'print') printDam(dam)
  else if (command.type === 'switchToBackup')
    switchToBackupGenerators(dam.generators)
  else assertNever(command)
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
) {
  gates[command.gate] = 'closed'
  console.log(`Closed gate ${command.gate}`)
}

function openGates(gates: Gates, command: OpenCommand) {
  gates[command.gate] = 'open'
  console.log(`Opened gate ${command.gate}`)
}

function printDam(dam: Dam) {
  console.log(dam)
}

function switchToBackupGenerators(
  generators: Generators
) {
  generators.backup = 'on'
  generators.main = 'off'
}

export {}
