'use client'

import { Box, Container, Stack } from '@mantine/core'
import { sizes } from '@/app/(frontend)/design'
import { FeaturesGrid } from './FeaturesGrid'
import { FeaturesHeader } from './FeaturesHeader'

export function Features() {
  return (
    <Box
      style={{
        backgroundColor:
          'light-dark(var(--mantine-color-gray-0), var(--mantine-color-gray-9))',
      }}
    >
      <Container
        id="features"
        component="section"
        size="xl"
        py={24 * sizes.x1i}
      >
        <Stack gap="xl" align="center">
          <FeaturesHeader />
          <FeaturesGrid />
        </Stack>
      </Container>
    </Box>
  )
}
