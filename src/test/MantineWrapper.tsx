import { MantineProvider } from '@mantine/core'
import type { ReactNode } from 'react'
import '@mantine/core/styles.layer.css'

import { theme } from '@/app/(frontend)/theme'

interface MantineWrapperProps {
  children: ReactNode
  forceColorScheme?: 'light' | 'dark'
}

export function MantineWrapper({
  children,
  forceColorScheme,
}: MantineWrapperProps) {
  return (
    <MantineProvider theme={theme} forceColorScheme={forceColorScheme}>
      {children}
    </MantineProvider>
  )
}
