import { render, within } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { MantineWrapper } from '@/test'
import { SignInButton } from './SignInButton'

describe('SignInButton', () => {
  let button: HTMLElement
  let link: HTMLAnchorElement | null

  beforeEach(() => {
    const { container } = render(<SignInButton />, { wrapper: MantineWrapper })
    button = within(container).getByText('Sign In')
    link = button.closest('a')
  })

  it('renders sign in button', () => {
    expect(button).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/sign-in')
  })
})
