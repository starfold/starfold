import { render, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MantineWrapper } from '@/test'
import { FeatureNumberWatermark } from './FeatureNumberWatermark'

describe(FeatureNumberWatermark, () => {
  it('renders the provided number', () => {
    const { container } = render(<FeatureNumberWatermark number="05" />, {
      wrapper: MantineWrapper,
    })

    expect(within(container).getByText('05')).toBeInTheDocument()
  })

  it('has absolute positioning', () => {
    const { container } = render(<FeatureNumberWatermark number="01" />, {
      wrapper: MantineWrapper,
    })

    const text = container.querySelector('.mantine-Text-root')
    expect(text).toHaveStyle({ position: 'absolute' })
  })
})
