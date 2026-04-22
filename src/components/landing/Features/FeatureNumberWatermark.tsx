import { Text } from '@mantine/core'

interface FeatureNumberWatermarkProps {
  number: string
}

export function FeatureNumberWatermark({
  number,
}: FeatureNumberWatermarkProps) {
  return (
    <Text
      c="dimmed"
      ff="monospace"
      fw={600}
      fz="4rem"
      lh={1}
      opacity={0.05}
      pos="absolute"
      right={0}
      style={{
        userSelect: 'none',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      top={-4}
    >
      {number}
    </Text>
  )
}
