'use client'

import { Button } from '@mantine/core'
import Link from 'next/link'
import { sizes } from '@/app/(frontend)/design'
import { siteLinks } from '@/config'

export function SignInButton() {
  return (
    <Button
      component={Link}
      href={siteLinks.auth.signIn}
      size="xs"
      h={sizes.x8}
    >
      Sign in
    </Button>
  )
}
