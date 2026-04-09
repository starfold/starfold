import { Group } from '@mantine/core'
import type { User } from 'better-auth'
import { sizes } from '@/app/(frontend)/design'

import { ColorSchemeSwitch } from './ColorSchemeSwitch'
import { GitHubLink } from './GitHubLink'
import { LanguageSwitch } from './LanguageSwitch'
import { UserAuthButton } from './UserAuthButton'

type ActionsProps = {
  mode: 'desktop' | 'mobile'
  user?: User
}

export function Actions({ mode, user }: ActionsProps) {
  if (mode === 'mobile') {
    return (
      <Group justify="space-between">
        <Group gap="xs">
          <GitHubLink />
          <LanguageSwitch />
          <ColorSchemeSwitch />
        </Group>
        <UserAuthButton user={user} />
      </Group>
    )
  }

  return (
    <Group gap={sizes.x2}>
      <LanguageSwitch />
      <GitHubLink />
      <ColorSchemeSwitch />
      <UserAuthButton user={user} />
    </Group>
  )
}
