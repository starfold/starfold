import { Menu, Text } from '@mantine/core'
import type { User } from 'better-auth'
import { useRouter } from 'next/navigation'
import { sizes } from '@/app/(frontend)/design'
import { siteLinks } from '@/config'
import { UserAvatar } from './UserAvatar'

interface UserMenuProps {
  user: User
}

export function UserMenu({ user }: UserMenuProps) {
  const router = useRouter()
  return (
    <Menu
      arrowOffset={sizes.x3i}
      arrowSize={sizes.x2i}
      position="bottom-end"
      shadow="md"
      withArrow
    >
      <Menu.Target>
        <UserAvatar user={user} />
      </Menu.Target>
      <Menu.Dropdown miw={40 * sizes.x1i}>
        <Menu.Label>
          <Text c="bright">{user.name}</Text>
        </Menu.Label>
        <Menu.Divider />
        <Menu.Item onClick={() => router.push(siteLinks.dashboard)}>
          Dashboard
        </Menu.Item>
        <Menu.Item onClick={() => router.push(siteLinks.settings)}>
          Settings
        </Menu.Item>
        <Menu.Item
          color="red"
          onClick={() => router.push(siteLinks.auth.signOut)}
        >
          Sign Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
