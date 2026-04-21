import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MantineWrapper } from '@/test'
import { PasswordFormFields } from './PasswordFormFields'

describe('PasswordFormFields', () => {
  const mockGetInputProps = vi.fn((_field: string) => ({
    value: '',
    onChange: vi.fn(),
    error: null,
  }))

  const mockForm = {
    getInputProps: mockGetInputProps,
  }

  it('renders title and description', () => {
    render(<PasswordFormFields form={mockForm} isLoading={false} />, {
      wrapper: MantineWrapper,
    })

    expect(screen.getByText('Account')).toBeInTheDocument()
    expect(
      screen.getByText('Manage your account security and password')
    ).toBeInTheDocument()
  })

  it('renders all password input fields', () => {
    render(<PasswordFormFields form={mockForm} isLoading={false} />, {
      wrapper: MantineWrapper,
    })

    expect(
      screen.getByPlaceholderText('Your current password')
    ).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Your new password')).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('Confirm your new password')
    ).toBeInTheDocument()
  })

  it('renders change password button', () => {
    render(<PasswordFormFields form={mockForm} isLoading={false} />, {
      wrapper: MantineWrapper,
    })

    expect(
      screen.getByRole('button', { name: 'Change password' })
    ).toBeInTheDocument()
  })

  it('shows loading state on button when isLoading is true', () => {
    render(<PasswordFormFields form={mockForm} isLoading={true} />, {
      wrapper: MantineWrapper,
    })

    const button = screen.getByRole('button', { name: 'Change password' })
    expect(button).toBeDisabled()
  })

  it('calls getInputProps for all password fields', () => {
    render(<PasswordFormFields form={mockForm} isLoading={false} />, {
      wrapper: MantineWrapper,
    })

    expect(mockGetInputProps).toHaveBeenCalledWith('currentPassword')
    expect(mockGetInputProps).toHaveBeenCalledWith('newPassword')
    expect(mockGetInputProps).toHaveBeenCalledWith('confirmPassword')
  })
})
