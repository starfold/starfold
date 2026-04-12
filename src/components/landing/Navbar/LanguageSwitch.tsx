import { ActionIcon } from '@mantine/core'
import { IconLanguage } from '@tabler/icons-react'
import { sizes } from '@/app/(frontend)/design'

export function LanguageSwitch() {
  return (
    <ActionIcon
      aria-label="Translation"
      color="gray"
      size={sizes.x8}
      variant="subtle"
    >
      <IconLanguage size={sizes.x5} data-testid="icon-language" />
    </ActionIcon>
  )
}
