import { render, within } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { MantineWrapper } from '@/test'
import { Logo } from './Logo'

describe('Logo', () => {
  let container: HTMLElement

  beforeEach(() => {
    const result = render(<Logo />, { wrapper: MantineWrapper })
    container = result.container
  })

  it('renders Starfold text', () => {
    expect(within(container).getByText('Starfold')).toBeInTheDocument()
  })

  it('renders logo image with alt text', () => {
    const img = within(container).getByAltText('Starfold')
    expect(img).toBeInTheDocument()
  })

  it('renders link to home page', () => {
    const link = container.querySelector('a')
    expect(link).toHaveAttribute('href', '/')
  })
})
