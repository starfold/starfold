'use client'

import { Anchor, Stack, Text, Title } from '@mantine/core'
import Link from 'next/link'
import { sizes } from '@/app/(frontend)/design'
import { Logo } from '@/components/common'
import { siteLinks } from '@/config'

export function SignUpHeader() {
  return (
    <Stack align="center" gap="sm">
      <Logo height={sizes.x16i} width={sizes.x16i} />
      <Title order={1} fw={700} ta="center">
        Create an account
      </Title>
      <Text size="sm" ta="center">
        Already have an account?{' '}
        <Anchor c="blue" component={Link} href={siteLinks.auth.signIn}>
          Sign in
        </Anchor>
      </Text>
    </Stack>
  )
}
