import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { siteLinks } from '@/config'
import { MantineWrapper } from '@/test'
import { SignInHeader } from './SignInHeader'

describe(SignInHeader, () => {
  beforeEach(() => {
    render(<SignInHeader />, { wrapper: MantineWrapper })
  })

  it('renders logo', () => {
    const logo = screen.getByRole('img', { name: /starfold/i })
    expect(logo).toBeInTheDocument()
  })

  it('renders welcome back title', () => {
    expect(screen.getByText('Welcome back!')).toBeInTheDocument()
  })

  it('renders sign up link', () => {
    const signUpLink = screen.getByRole('link', { name: /Create an account/i })
    expect(signUpLink).toHaveAttribute('href', siteLinks.auth.signUp)
  })

  it('renders sign up helper text', () => {
    expect(screen.getByText(/New to Starfold\?/i)).toBeInTheDocument()
  })
})
