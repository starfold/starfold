import { alpha, Box, Collapse, Container, Divider } from '@mantine/core'
import { useClickOutside } from '@mantine/hooks'
import { useRef } from 'react'
import { Actions } from './Actions'
import { NavLinks } from './NavLinks'

interface MobileDropdownProps {
  opened: boolean
  onClose: () => void
  toggleRef: React.RefObject<HTMLElement | null>
}

export function MobileDropdown({
  opened,
  onClose,
  toggleRef,
}: MobileDropdownProps) {
  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(onClose, null, [ref.current, toggleRef.current])

  return (
    <Collapse expanded={opened} transitionDuration={200}>
      <Box
        ref={ref}
        style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          zIndex: 99,
          borderBottomWidth: 1,
          borderBottomStyle: 'solid',
          borderBottomColor: alpha('var(--mantine-color-dark-5)', 0.2),
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
        }}
      >
        <Container size="xl" py="md">
          <NavLinks mode="mobile" />
          {/* Bottom actions */}
          <Divider
            my="sm"
            style={{
              borderTopColor: alpha('var(--mantine-color-dark-5)', 0.1),
            }}
          />
          <Actions mode="mobile" />
        </Container>
      </Box>
    </Collapse>
  )
}
