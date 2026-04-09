'use client'

import { alpha, Box, Container, Group, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import type { User } from 'better-auth'
import Link from 'next/link'
import { useRef } from 'react'
import { Logo } from '@/components/common'
import { Actions } from './Actions'
import { MobileDropdown } from './MobileDropdown'
import { MobileToggle } from './MobileToggle'
import { NavLinks } from './NavLinks'

interface NavbarProps {
  user?: User
}

export function Navbar({ user }: NavbarProps) {
  const [opened, { toggle, close }] = useDisclosure(false)
  const toggleRef = useRef<HTMLDivElement>(null)

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
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Group gap="sm">
                <Logo />
                <Text fw={700} size="md" c="bright">
                  Starfold
                </Text>
              </Group>
            </Link>
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
