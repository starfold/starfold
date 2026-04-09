import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MantineWrapper } from '@/test'
import { SignInFormFields } from './SignInFormFields'

describe('SignInFormFields', () => {
  const mockGetInputProps = vi.fn((_field: string) => ({
    value: '',
    onChange: vi.fn(),
    error: null,
  }))

  const mockForm = {
    getInputProps: mockGetInputProps,
  }

  it('renders email input field', () => {
    render(<SignInFormFields form={mockForm} isLoading={false} />, {
      wrapper: MantineWrapper,
    })

    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument()
  })

  it('renders password input field', () => {
    render(<SignInFormFields form={mockForm} isLoading={false} />, {
      wrapper: MantineWrapper,
    })

    expect(screen.getByPlaceholderText('Your password')).toBeInTheDocument()
  })

  it('renders forgot password link', () => {
    render(<SignInFormFields form={mockForm} isLoading={false} />, {
      wrapper: MantineWrapper,
    })

    const forgotPasswordLink = screen.getByRole('link', {
      name: 'Forgot password?',
    })
    expect(forgotPasswordLink).toBeInTheDocument()
    expect(forgotPasswordLink).toHaveAttribute('href', '/forgot-password')
  })

  it('renders sign in button', () => {
    render(<SignInFormFields form={mockForm} isLoading={false} />, {
      wrapper: MantineWrapper,
    })

    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument()
  })

  it('shows loading state on button when isLoading is true', () => {
    render(<SignInFormFields form={mockForm} isLoading={true} />, {
      wrapper: MantineWrapper,
    })

    const button = screen.getByRole('button', { name: 'Sign in' })
    expect(button).toBeDisabled()
  })

  it('calls getInputProps for email field', () => {
    render(<SignInFormFields form={mockForm} isLoading={false} />, {
      wrapper: MantineWrapper,
    })

    expect(mockGetInputProps).toHaveBeenCalledWith('email')
  })

  it('calls getInputProps for password field', () => {
    render(<SignInFormFields form={mockForm} isLoading={false} />, {
      wrapper: MantineWrapper,
    })

    expect(mockGetInputProps).toHaveBeenCalledWith('password')
  })

  it('renders form with correct structure', () => {
    const { container } = render(
      <SignInFormFields form={mockForm} isLoading={false} />,
      { wrapper: MantineWrapper }
    )

    // Check that the component renders a Stack (flex container)
    const stack = container.querySelector('.mantine-Stack-root')
    expect(stack).toBeInTheDocument()
  })
})
