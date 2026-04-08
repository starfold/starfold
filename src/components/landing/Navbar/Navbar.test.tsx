import { render, within } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { MantineWrapper } from '@/test'
import { Navbar } from './Navbar'

describe('Navbar', () => {
  let container: HTMLElement

  beforeEach(() => {
    const result = render(<Navbar />, { wrapper: MantineWrapper })
    container = result.container
  })

  it('renders logo and nav links', () => {
    expect(within(container).getByText('Starfold')).toBeInTheDocument()
    // Nav links are now rendered in both desktop and mobile dropdown
    // So we check they exist at least once
    const features = within(container).getAllByText('Features')
    const pricing = within(container).getAllByText('Pricing')
    const faq = within(container).getAllByText('FAQ')

    expect(features.length).toBeGreaterThanOrEqual(1)
    expect(pricing.length).toBeGreaterThanOrEqual(1)
    expect(faq.length).toBeGreaterThanOrEqual(1)
  })

  it('renders actions component with sign in button', () => {
    // Sign In button is rendered in both desktop and mobile dropdown
    const signInButtons = within(container).getAllByText('Sign In')
    expect(signInButtons.length).toBeGreaterThanOrEqual(1)
  })

  it('has toggle button for mobile', () => {
    const toggleButton = within(container).getByLabelText('Toggle navigation')
    expect(toggleButton).toBeInTheDocument()
  })
})
