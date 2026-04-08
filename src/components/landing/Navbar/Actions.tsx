import { Group } from '@mantine/core'
import { sizes } from '@/app/(frontend)/theme'

import { ColorSchemeSwitch } from './ColorSchemeSwitch'
import { GitHubLink } from './GitHubLink'
import { LanguageSwitch } from './LanguageSwitch'

type ActionsProps = {
  mode: 'desktop' | 'mobile'
}

export function Actions({ mode }: ActionsProps) {
  if (mode === 'mobile') {
    return (
      <Group justify="space-between">
        <Group gap={sizes.x2}>
          <GitHubLink />
          <LanguageSwitch />
        </Group>
        <ColorSchemeSwitch />
      </Group>
    )
  }

  return (
    <Group gap={sizes.x2}>
      <LanguageSwitch />
      <GitHubLink />
      <ColorSchemeSwitch />
    </Group>
  )
}
