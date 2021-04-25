display('Hello, world', {
  bold: false,
  padding: 5,
  label: undefined,
  formatting: undefined,
})

function display(text: string, options: Options) {
  const { bold, label, padding, formatting } = options

  const parsed = parseFormatting(formatting)

  console.log(parsed)

  if (padding) text = ' '.repeat(padding) + text
  if (label) text = `  ### ${label} ### ${text}`
  if (bold) text = text.toUpperCase()

  console.log(text)
}

function parseFormatting(formatting: unknown) {
  // if (formatting && typeof formatting === 'object')
  //   return formatting

  if (Array.isArray(formatting)) return formatting

  throw new Error('Unexpected formatting type')
}

interface Options {
  bold?: boolean
  label: string | null | undefined
  padding?: number
  formatting: unknown
}

export {}
