import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MantineWrapper } from '@/test'
import { ForgotPasswordFormFields } from './ForgotPasswordFormFields'

describe('ForgotPasswordFormFields', () => {
  const mockGetInputProps = vi.fn((_field: string) => ({
    value: '',
    onChange: vi.fn(),
    error: null,
  }))

  const mockForm = {
    getInputProps: mockGetInputProps,
  }

  it('renders email input field', () => {
    render(<ForgotPasswordFormFields form={mockForm} isLoading={false} />, {
      wrapper: MantineWrapper,
    })

    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument()
  })

  it('renders submit button', () => {
    render(<ForgotPasswordFormFields form={mockForm} isLoading={false} />, {
      wrapper: MantineWrapper,
    })

    expect(
      screen.getByRole('button', { name: 'Send password reset email' })
    ).toBeInTheDocument()
  })

  it('shows loading state on button when isLoading is true', () => {
    render(<ForgotPasswordFormFields form={mockForm} isLoading={true} />, {
      wrapper: MantineWrapper,
    })

    const button = screen.getByRole('button', {
      name: 'Send password reset email',
    })
    expect(button).toBeDisabled()
  })

  it('calls getInputProps for email field', () => {
    render(<ForgotPasswordFormFields form={mockForm} isLoading={false} />, {
      wrapper: MantineWrapper,
    })

    expect(mockGetInputProps).toHaveBeenCalledWith('email')
  })

  it('disables input when isLoading is true', () => {
    render(<ForgotPasswordFormFields form={mockForm} isLoading={true} />, {
      wrapper: MantineWrapper,
    })

    const input = screen.getByPlaceholderText('you@example.com')
    expect(input).toBeDisabled()
  })
})
