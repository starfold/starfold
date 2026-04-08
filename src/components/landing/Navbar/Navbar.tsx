'use client'

import { alpha, Box, Container, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useRef } from 'react'
import { Actions } from './Actions'
import { Logo } from './Logo'
import { MobileDropdown } from './MobileDropdown'
import { MobileToggle } from './MobileToggle'
import { NavLinks } from './NavLinks'
import { SignInButton } from './SignInButton'

export function Navbar() {
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
            <Logo />
            <Box visibleFrom="xs">
              <NavLinks mode="desktop" />
            </Box>
          </Group>

          {/* Desktop actions */}
          <Group gap="xs">
            <Box visibleFrom="xs">
              <Actions mode="desktop" />
            </Box>
            <SignInButton />
            {/* Mobile toggle arrow */}
            <Box hiddenFrom="xs" ref={toggleRef}>
              <MobileToggle opened={opened} onToggle={toggle} />
            </Box>
          </Group>
        </Group>
      </Container>

      {/* Mobile dropdown menu */}
      <Box hiddenFrom="xs">
        <MobileDropdown opened={opened} onClose={close} toggleRef={toggleRef} />
      </Box>
    </Box>
  )
}
