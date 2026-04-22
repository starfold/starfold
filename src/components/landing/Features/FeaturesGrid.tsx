import { SimpleGrid } from '@mantine/core'
import { useInView } from '@/hooks/use-in-view'
import { FeatureCard } from './FeatureCard'
import { featuresData } from './features.data'

function AnimatedFeatureCard({
  feature,
  index,
}: {
  feature: (typeof featuresData)[number]
  index: number
}) {
  const { ref, inView } = useInView({ threshold: 0.1 })

  return (
    <div
      ref={ref}
      data-testid="animated-feature-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 400ms ease ${index * 80}ms, transform 400ms ease ${index * 80}ms`,
      }}
    >
      <FeatureCard feature={feature} index={index} />
    </div>
  )
}

export function FeaturesGrid() {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
      {featuresData.map((feature, index) => (
        <AnimatedFeatureCard
          key={feature.title}
          feature={feature}
          index={index}
        />
      ))}
    </SimpleGrid>
  )
}
