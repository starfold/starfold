import { render, within } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { siteLinks } from '@/config'
import { MantineWrapper } from '@/test'
import { HeroCTA } from './HeroCTA'

describe(HeroCTA, () => {
  let container: HTMLElement

  beforeEach(() => {
    container = render(<HeroCTA />, { wrapper: MantineWrapper }).container
  })

  it('renders Get Started button with correct href', () => {
    const getStartedButton = within(container).getByText('Get Started')
    expect(getStartedButton).toBeInTheDocument()
    const link = getStartedButton.closest('a')
    expect(link).toHaveAttribute('href', siteLinks.auth.signIn)
  })

  it('renders Try Demo button with correct href', () => {
    const githubButton = within(container).getByText('Try Demo')
    expect(githubButton).toBeInTheDocument()
    const link = githubButton.closest('a')
    expect(link).toHaveAttribute('href', siteLinks.github.repo)
  })

  it('renders GitHub link with target and rel attributes', () => {
    const githubButton = within(container).getByText('Try Demo')
    const link = githubButton.closest('a')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
