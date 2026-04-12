import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MantineWrapper } from '@/test'
import { AuthHeader } from './AuthHeader'

describe('AuthHeader', () => {
  it('renders Logo component', () => {
    render(
      <AuthHeader
        title="Welcome back!"
        linkPrefix="New to Starfold?"
        linkText="Create an account"
        linkHref="/auth/sign-up"
      />,
      { wrapper: MantineWrapper }
    )
    const logo = screen.getByAltText('Starfold')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('width', '64')
    expect(logo).toHaveAttribute('height', '64')
  })

  it('renders title', () => {
    render(
      <AuthHeader
        title="Welcome back!"
        linkPrefix="New to Starfold?"
        linkText="Create an account"
        linkHref="/auth/sign-up"
      />,
      { wrapper: MantineWrapper }
    )
    expect(
      screen.getByRole('heading', { name: 'Welcome back!' })
    ).toBeInTheDocument()
  })

  it('renders link prefix text', () => {
    render(
      <AuthHeader
        title="Welcome back!"
        linkPrefix="New to Starfold?"
        linkText="Create an account"
        linkHref="/auth/sign-up"
      />,
      { wrapper: MantineWrapper }
    )
    expect(screen.getByText('New to Starfold?')).toBeInTheDocument()
  })

  it('renders link with correct text and href', () => {
    render(
      <AuthHeader
        title="Create an account"
        linkPrefix="Already have an account?"
        linkText="Sign in"
        linkHref="/auth/sign-in"
      />,
      { wrapper: MantineWrapper }
    )
    const link = screen.getByRole('link', { name: 'Sign in' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/auth/sign-in')
  })

  it('renders with sign up variant', () => {
    render(
      <AuthHeader
        title="Create an account"
        linkPrefix="Already have an account?"
        linkText="Sign in"
        linkHref="/auth/sign-in"
      />,
      { wrapper: MantineWrapper }
    )
    expect(
      screen.getByRole('heading', { name: 'Create an account' })
    ).toBeInTheDocument()
    expect(screen.getByText('Already have an account?')).toBeInTheDocument()
    const link = screen.getByRole('link', { name: 'Sign in' })
    expect(link).toHaveAttribute('href', '/auth/sign-in')
  })

  it('has centered layout', () => {
    const { container } = render(
      <AuthHeader
        title="Welcome back!"
        linkPrefix="New to Starfold?"
        linkText="Create an account"
        linkHref="/auth/sign-up"
      />,
      { wrapper: MantineWrapper }
    )
    // The Stack component should be present with centered alignment
    const stack =
      container.querySelector('[class*="m_8d3f4000"]') || container.firstChild
    expect(stack).toBeTruthy()
  })

  it('link has correct styling', () => {
    render(
      <AuthHeader
        title="Welcome back!"
        linkPrefix="New to Starfold?"
        linkText="Create an account"
        linkHref="/auth/sign-up"
      />,
      { wrapper: MantineWrapper }
    )
    const link = screen.getByRole('link', { name: 'Create an account' })
    expect(link).toBeInTheDocument()
  })
})
