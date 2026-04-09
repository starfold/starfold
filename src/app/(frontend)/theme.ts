'use client'

import { type CSSVariablesResolver, createTheme } from '@mantine/core'
import { sizes } from './design'

export const theme = createTheme({
  defaultRadius: 'sm',
  primaryColor: 'dark',
})

export const resolver: CSSVariablesResolver = () => {
  const vars: Record<string, string> = {}

  // Only export string values (px) to CSS variables, skip integer values (ending with 'i')
  for (const [key, value] of Object.entries(sizes)) {
    if (!key.endsWith('i') && typeof value === 'string') {
      vars[`--mantine-size-${key}`] = value
    }
  }

  return {
    variables: vars,
    dark: {},
    light: {},
  }
}
