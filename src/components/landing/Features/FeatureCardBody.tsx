import { Box, Group, Stack, Text } from '@mantine/core'
import { icon, sizes } from '@/app/(frontend)/design'
import type { FeatureItem } from './features.data'

interface FeatureCardBodyProps {
  feature: FeatureItem
}

export function FeatureCardBody({ feature }: FeatureCardBodyProps) {
  return (
    <Stack gap="sm">
      {/* Icon + Title */}
      <Group gap={sizes.x2}>
        <feature.icon size={icon.sizes.xl} stroke={icon.strokes.md} />
        <Text c="bright" fw={600} size="md">
          {feature.title}
        </Text>
      </Group>

      {/* Description */}
      <Text lh="md" size="sm">
        {feature.description}
      </Text>

      {/* Visual element */}
      <Box
        h={16 * sizes.x1i}
        style={{ display: 'flex', alignItems: 'flex-end' }}
      >
        <feature.visual />
      </Box>
    </Stack>
  )
}
