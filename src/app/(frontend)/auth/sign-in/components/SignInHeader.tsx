'use client'

import { Anchor, Stack, Text, Title } from '@mantine/core'
import Link from 'next/link'
import { sizes } from '@/app/(frontend)/design'
import { Logo } from '@/components/common'
import { siteLinks } from '@/config'

export function SignInHeader() {
  return (
    <Stack align="center" gap="sm">
      <Logo height={sizes.x16i} width={sizes.x16i} />
      <Title order={1} fw={700} ta="center">
        Welcome back!
      </Title>
      <Text size="sm" ta="center">
        New to Starfold?{' '}
        <Anchor c="blue" component={Link} href={siteLinks.auth.signUp}>
          Create an account
        </Anchor>
      </Text>
    </Stack>
  )
}
