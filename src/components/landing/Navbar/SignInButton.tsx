import { Button } from '@mantine/core'
import Link from 'next/link'
import { sizes } from '@/app/(frontend)/theme'

export function SignInButton() {
  return (
    <Button component={Link} href="/sign-in" size="xs" h={sizes.x8}>
      Sign In
    </Button>
  )
}
