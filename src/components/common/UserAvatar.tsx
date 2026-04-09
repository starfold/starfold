import { Avatar } from '@mantine/core'
import type { User } from 'better-auth'
import { sizes } from '@/app/(frontend)/design'

interface UserAvatarProps {
  user: User
  size?: number
}

export function UserAvatar({
  user,
  size = sizes.x8i,
  ...rest
}: UserAvatarProps) {
  return (
    <Avatar
      data-testid="user-avatar"
      {...rest}
      src={user.image}
      alt={user.name}
      size={size}
      style={{ cursor: 'pointer' }}
    >
      {user.name?.charAt(0).toUpperCase()}
    </Avatar>
  )
}
