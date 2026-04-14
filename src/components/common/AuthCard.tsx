'use client'

import { Center, Stack } from '@mantine/core'
import { sizes } from '@/app/(frontend)/design'

interface AuthCardProps {
  header: React.ReactNode
  children: React.ReactNode
}

export function AuthCard({ header, children }: AuthCardProps) {
  return (
    <Center mih={'100vh'}>
      <Stack miw={90 * sizes.x1i} maw={100 * sizes.x1i}>
        {header}
        {children}
      </Stack>
    </Center>
  )
}
