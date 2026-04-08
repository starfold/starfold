import { render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { MantineWrapper } from '@/test'

import { GitHubLink } from './GitHubLink'

describe(GitHubLink, () => {
  let button: HTMLElement

  beforeEach(() => {
    const { container } = render(<GitHubLink />, { wrapper: MantineWrapper })
    button = within(container).getByLabelText('GitHub')
  })

  it('renders GitHub button with correct aria-label', () => {
    expect(button).toBeInTheDocument()
  })

  it('renders link with correct href', () => {
    expect(button).toHaveAttribute(
      'href',
      'https://github.com/starfold/starfold'
    )
  })

  it('has correct target and rel attributes', () => {
    expect(button).toHaveAttribute('target', '_blank')
    expect(button).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders GitHub icon', () => {
    expect(screen.getByTestId('icon-github')).toBeInTheDocument()
  })
})
