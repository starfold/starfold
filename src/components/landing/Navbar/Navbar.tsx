'use client'

import { alpha, Box, Container, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import type { User } from 'better-auth'
import { useRef } from 'react'
import { LogoWithTitle, UserMenu } from '@/components/common'
import { Actions } from './Actions'
import { MobileDropdown } from './MobileDropdown'
import { MobileToggle } from './MobileToggle'
import { NavLinks } from './NavLinks'

interface NavbarProps {
  user?: User
  landing?: boolean
}

export function Navbar({ user, landing = false }: NavbarProps) {
  const [opened, { toggle, close }] = useDisclosure(false)
  const toggleRef = useRef<HTMLDivElement>(null)

  if (!landing) {
    return (
      <Box
        component="header"
        style={{
          borderBottomWidth: 1,
          borderBottomStyle: 'solid',
          borderBottomColor: alpha('var(--mantine-color-dark-5)', 0.2),
        }}
      >
        <Container size="xl" py="md">
          <Group justify="space-between">
            <LogoWithTitle />
            {user && <UserMenu user={user} />}
          </Group>
        </Container>
      </Box>
    )
  }

  return (
    <Box
      component="header"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: alpha('var(--mantine-color-dark-5)', 0.2),
        background: 'transparent',
      }}
    >
      <Container size="xl" py="md">
        <Group justify="space-between">
          <Group gap="md">
            <LogoWithTitle />
            <Box visibleFrom="xs">
              <NavLinks mode="desktop" />
            </Box>
          </Group>

          {/* Desktop actions */}
          <Group gap="xs">
            <Box visibleFrom="xs">
              <Actions mode="desktop" user={user} />
            </Box>
            {/* Mobile toggle arrow */}
            <Box hiddenFrom="xs" ref={toggleRef}>
              <MobileToggle opened={opened} onToggle={toggle} />
            </Box>
          </Group>
        </Group>
      </Container>

      {/* Mobile dropdown menu */}
      <Box hiddenFrom="xs">
        <MobileDropdown
          opened={opened}
          onClose={close}
          toggleRef={toggleRef}
          user={user}
        />
      </Box>
    </Box>
  )
}
