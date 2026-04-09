import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { siteLinks } from '@/config'
import { MantineWrapper } from '@/test'
import { SignUpHeader } from './SignUpHeader'

describe(SignUpHeader, () => {
  it('renders logo image', () => {
    render(<SignUpHeader />, { wrapper: MantineWrapper })

    const logo = screen.getByRole('img', { name: /starfold/i })
    expect(logo).toBeInTheDocument()
  })

  it('renders Create an account title', () => {
    render(<SignUpHeader />, { wrapper: MantineWrapper })

    expect(screen.getByText('Create an account')).toBeInTheDocument()
  })

  it('renders sign in link', () => {
    render(<SignUpHeader />, { wrapper: MantineWrapper })

    const signInLink = screen.getByRole('link', { name: /sign in/i })
    expect(signInLink).toHaveAttribute('href', siteLinks.auth.signIn)
  })

  it('renders sign in helper text', () => {
    render(<SignUpHeader />, { wrapper: MantineWrapper })

    expect(screen.getByText(/already have an account/i)).toBeInTheDocument()
  })
})
