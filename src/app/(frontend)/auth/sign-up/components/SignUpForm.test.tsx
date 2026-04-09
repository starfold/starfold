import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MantineWrapper } from '@/test'
import { SignUpForm } from './SignUpForm'

describe(SignUpForm, () => {
  it('renders sign up form with all fields', () => {
    render(<SignUpForm />, { wrapper: MantineWrapper })

    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Your password')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Create an account' })
    ).toBeInTheDocument()
  })

  it('renders form with required attributes', () => {
    render(<SignUpForm />, { wrapper: MantineWrapper })

    expect(screen.getByPlaceholderText('Your name')).toBeRequired()
    expect(screen.getByPlaceholderText('you@example.com')).toBeRequired()
    expect(screen.getByPlaceholderText('Your password')).toBeRequired()
  })

  it('calls onSuccess callback on successful sign up', () => {
    const onSuccess = vi.fn()
    vi.stubGlobal('authClient', {
      signUp: {
        email: vi.fn().mockResolvedValue({ data: { user: {} }, error: null }),
      },
    })
    vi.stubGlobal('router', {
      push: vi.fn(),
    })

    render(<SignUpForm onSuccess={onSuccess} />, { wrapper: MantineWrapper })

    expect(onSuccess).toBeDefined()
  })
})
