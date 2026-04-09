import { ActionIcon } from '@mantine/core'
import { IconLanguage } from '@tabler/icons-react'
import { sizes } from '@/app/(frontend)/design'

export function LanguageSwitch() {
  return (
    <ActionIcon
      aria-label="Translation"
      color="gray"
      size="lg"
      variant="subtle"
    >
      <IconLanguage size={sizes.x5} data-testid="icon-language" />
    </ActionIcon>
  )
}
