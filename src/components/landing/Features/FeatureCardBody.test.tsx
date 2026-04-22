import { render, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MantineWrapper } from '@/test'
import { FeatureCardBody } from './FeatureCardBody'
import { featuresData } from './features.data'

describe(FeatureCardBody, () => {
  it('renders the feature title', () => {
    const feature = featuresData[0]
    const { container } = render(<FeatureCardBody feature={feature} />, {
      wrapper: MantineWrapper,
    })

    expect(within(container).getByText(feature.title)).toBeInTheDocument()
  })

  it('renders the feature description', () => {
    const feature = featuresData[1]
    const { container } = render(<FeatureCardBody feature={feature} />, {
      wrapper: MantineWrapper,
    })

    expect(within(container).getByText(feature.description)).toBeInTheDocument()
  })

  it('renders the visual element container', () => {
    const feature = featuresData[0]
    const { container } = render(<FeatureCardBody feature={feature} />, {
      wrapper: MantineWrapper,
    })

    // The visual element is wrapped in a div with display: flex
    const flexContainer = container.querySelector('[style*="display: flex"]')
    expect(flexContainer).toBeInTheDocument()
  })
})
