import { Stack, Text, Title } from '@mantine/core'
import { siteConfig } from '@/config'

export function HeroTitle() {
  return (
    <Stack gap="xs" align="center">
      <Title
        c="bright"
        fw={700}
        order={1}
        style={{
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          opacity: 0.85,
          textShadow: '4px 4px 8px rgba(0, 0, 0, 0.5)',
        }}
        ta="center"
      >
        {siteConfig.description}
      </Title>

      <Text size="xl" ta={'center'} maw={640}>
        An opinionated Next.js 16 boilerplate to help ship your SaaS in days,
        not months. Everything you need—auth, payments, emails, CMS, and
        more—beautifully integrated.
      </Text>
    </Stack>
  )
}
