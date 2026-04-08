import { MantineProvider } from '@mantine/core'
import type { ReactNode } from 'react'
import '@mantine/core/styles.layer.css'

import { theme } from '@/app/(frontend)/theme'

export function MantineWrapper({ children }: { children: ReactNode }) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>
}
