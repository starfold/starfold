'use client'

import { Anchor, Stack, Text, Title } from '@mantine/core'
import Link from 'next/link'
import { sizes } from '@/app/(frontend)/design'
import { Logo } from '@/components/common'

interface AuthHeaderProps {
  title: string
  linkPrefix: string
  linkText: string
  linkHref: string
}

export function AuthHeader({
  title,
  linkPrefix,
  linkText,
  linkHref,
}: AuthHeaderProps) {
  return (
    <Stack align="center" gap="sm">
      <Link href="/">
        <Logo height={sizes.x16i} width={sizes.x16i} />
      </Link>
      <Title order={1} fw={700} ta="center">
        {title}
      </Title>
      <Text size="sm" ta="center">
        {linkPrefix}{' '}
        <Anchor c="blue" component={Link} href={linkHref}>
          {linkText}
        </Anchor>
      </Text>
    </Stack>
  )
}
