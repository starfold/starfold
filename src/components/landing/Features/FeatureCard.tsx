'use client'

import { Box, Card } from '@mantine/core'
import { useState } from 'react'
import { FeatureCardBody } from './FeatureCardBody'
import { FeatureNumberWatermark } from './FeatureNumberWatermark'
import type { FeatureItem } from './features.data'

interface FeatureCardProps {
  feature: FeatureItem
  index: number
}

export function FeatureCard({ feature, index }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const number = String(index + 1).padStart(2, '0')

  return (
    <Card
      padding="lg"
      radius="xs"
      shadow={isHovered ? 'md' : 'xs'}
      bd={isHovered ? '1px solid var(--mantine-color-gray-5)' : undefined}
      style={{
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        transition:
          'transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease',
      }}
      withBorder
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box pos={'relative'}>
        <FeatureNumberWatermark number={number} />
      </Box>
      <FeatureCardBody feature={feature} />
    </Card>
  )
}
