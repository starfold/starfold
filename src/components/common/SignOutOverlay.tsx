'use client'

import { alpha, Center, Loader, Stack, Text } from '@mantine/core'
import { sizes } from '@/app/(frontend)/design'
import { Logo } from './Logo'

interface SignOutOverlayProps {
  visible: boolean
}

export function SignOutOverlay({ visible }: SignOutOverlayProps) {
  if (!visible) return null

  return (
    <Center
      pos={'fixed'}
      top={0}
      left={0}
      bottom={0}
      right={0}
      bg={alpha('var(--mantine-color-gray-1)', 0.95)}
      style={{
        zIndex: 'var(--mantine-z-index-overlay)',
      }}
    >
      <Stack align="center" gap="xs">
        <Logo height={sizes.x16i} width={sizes.x16i} />
        <Loader color="dark" type="dots" size="lg" />
        <Text fw={500} fz={'h4'}>
          Signing out...
        </Text>
      </Stack>
    </Center>
  )
}
