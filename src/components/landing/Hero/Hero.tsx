import { Container, Flex, Stack } from '@mantine/core'
import { GlassBlobBackground } from './GlassBlobBackground'
import { HeroCTA } from './HeroCTA'
import { HeroTitle } from './HeroTitle'

export function Hero() {
  return (
    <Flex
      dir="column"
      pos="relative"
      justify="center"
      mih="100vh"
      direction={'column'}
    >
      {/* Slowly morphing glassmorphism crystal blobs */}
      <GlassBlobBackground />

      {/* Content sits above the blobs via z-index */}
      <Container size="xl" pos="relative">
        <Stack gap="xl" align="center">
          <HeroTitle />
          <HeroCTA />
        </Stack>
      </Container>
    </Flex>
  )
}
