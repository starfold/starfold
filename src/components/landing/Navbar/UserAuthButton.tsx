import type { User } from 'better-auth'
import { UserMenu } from '@/components/common'
import { SignInButton } from './SignInButton'

interface UserAuthButtonProps {
  user?: User
}

export function UserAuthButton({ user }: UserAuthButtonProps) {
  if (user) {
    return <UserMenu user={user} />
  }

  return <SignInButton />
}
