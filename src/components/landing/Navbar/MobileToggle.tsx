import { ActionIcon } from '@mantine/core'
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'
import { sizes } from '@/app/(frontend)/design'

interface MobileToggleProps {
  opened: boolean
  onToggle: () => void
}

export function MobileToggle({ opened, onToggle }: MobileToggleProps) {
  return (
    <ActionIcon
      variant="subtle"
      color="gray"
      size="lg"
      onClick={onToggle}
      aria-label="Toggle navigation"
    >
      {opened ? (
        <IconChevronUp size={sizes.x5} data-testid="icon-chevron-up" />
      ) : (
        <IconChevronDown size={sizes.x5} data-testid="icon-chevron-down" />
      )}
    </ActionIcon>
  )
}
