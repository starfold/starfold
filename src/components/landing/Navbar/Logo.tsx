import { Group, Text } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'

export function Logo() {
  return (
    <Link href="/" style={{ textDecoration: 'none' }}>
      <Group gap="sm">
        <Image
          src="/static/assets/logo/starfold.png"
          alt="Starfold"
          width={32}
          height={32}
        />
        <Text fw={700} size="md" c="bright">
          Starfold
        </Text>
      </Group>
    </Link>
  )
}
