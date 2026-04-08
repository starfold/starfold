'use client'

import { type CSSVariablesResolver, createTheme } from '@mantine/core'

export const sizes = {
  x0_5: '2px', // 2px   - micro adjustments
  x1: '4px', // 4px   - base unit
  x1_5: '6px', // 6px   - small gaps
  x2: '8px', // 8px   - small padding
  x3: '12px', // 12px  - medium gaps
  x4: '16px', // 16px  - standard gap (most common)
  x5: '20px', // 20px  - larger gaps
  x6: '24px', // 24px  - section padding
  x8: '32px', // 32px  - large gaps
  x10: '40px', // 40px  - container padding
  x12: '48px', // 48px  - large sections
  x16: '64px', // 64px  - major sections
  x20: '80px', // 80px  - page-level
  x24: '96px', // 96px  - large page sections
  x32: '128px', // 128px - hero spacing
  x40: '160px', // 160px - max spacing
} as const

declare module '@mantine/core' {
  export interface MantineThemeOther {
    sizes: typeof sizes
  }
}

export const theme = createTheme({
  defaultRadius: 'sm',
  primaryColor: 'dark',
  other: {
    sizes: sizes,
  },
})

export const resolver: CSSVariablesResolver = (t) => {
  const vars: Record<string, string> = {}
  Object.entries((t.other.sizes as Record<string, string>) ?? {}).forEach(
    ([key, value]) => {
      vars[`--mantine-size-${key}`] = value
    }
  )

  return {
    variables: vars,
    dark: {},
    light: {},
  }
}
