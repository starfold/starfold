import { render, within } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { MantineWrapper } from '@/test'
import { Logo, LogoWithTitle } from './Logo'

describe('Logo', () => {
  let container: HTMLElement

  beforeEach(() => {
    const result = render(<Logo />, {
      wrapper: MantineWrapper,
    })
    container = result.container
  })

  it('renders logo image with alt text', () => {
    const img = within(container).getByAltText('Starfold')
    expect(img).toBeInTheDocument()
  })
})

describe('LogoWithTitle', () => {
  let container: HTMLElement

  beforeEach(() => {
    const result = render(<LogoWithTitle />, {
      wrapper: MantineWrapper,
    })
    container = result.container
  })

  it('renders logo image with alt text', () => {
    const img = within(container).getByAltText('Starfold')
    expect(img).toBeInTheDocument()
  })

  it('renders the Starfold title text', () => {
    const title = within(container).getByText('Starfold')
    expect(title).toBeInTheDocument()
  })

  it('wraps content in a link to home page', () => {
    const link = container.querySelector('a[href="/"]')
    expect(link).toBeInTheDocument()
  })

  it('applies custom width and height to logo', () => {
    const { container: customContainer } = render(
      <LogoWithTitle width={100} height={50} />,
      {
        wrapper: MantineWrapper,
      }
    )
    const img = within(customContainer).getByAltText('Starfold')
    expect(img).toHaveAttribute('width', '100')
    expect(img).toHaveAttribute('height', '50')
  })
})
