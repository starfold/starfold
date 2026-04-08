import { Group, Stack, Text } from '@mantine/core'
import Link from 'next/link'

import classes from './NavLinks.module.css'

export const NAV_ITEMS = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
] as const

type NavLinksProps = {
  mode: 'desktop' | 'mobile'
}

export function NavLinks({ mode }: NavLinksProps) {
  const navLinks = NAV_ITEMS.map((item) => (
    <Text
      key={item.label}
      component={Link}
      href={item.href}
      c="bright"
      className={mode === 'desktop' ? classes.nav : undefined}
    >
      {item.label}
    </Text>
  ))

  if (mode === 'mobile') {
    return <Stack gap="md">{navLinks}</Stack>
  }

  return <Group gap="md">{navLinks}</Group>
}
