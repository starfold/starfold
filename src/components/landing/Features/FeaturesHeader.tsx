import { Stack, Text, Title } from '@mantine/core'
import { sizes } from '@/app/(frontend)/design'

export function FeaturesHeader() {
  return (
    <Stack gap="sm">
      <Title
        c="bright"
        fw={600}
        order={2}
        ta="center"
        style={{
          fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
        }}
      >
        From zero to production in minutes
      </Title>

      <Text size="lg" ta="center" maw={160 * sizes.x1i}>
        A carefully curated stack of modern tools, pre-wired and
        production-ready so you can focus on your product.
      </Text>
    </Stack>
  )
}
