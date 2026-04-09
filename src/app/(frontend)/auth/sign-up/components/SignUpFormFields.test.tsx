import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MantineWrapper } from '@/test'
import { SignUpFormFields } from './SignUpFormFields'

describe('SignUpFormFields', () => {
  const mockGetInputProps = vi.fn((_field: string) => ({
    value: '',
    onChange: vi.fn(),
    error: null,
  }))

  const mockForm = {
    getInputProps: mockGetInputProps,
  }

  it('renders name input field', () => {
    render(<SignUpFormFields form={mockForm} isLoading={false} />, {
      wrapper: MantineWrapper,
    })

    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument()
  })

  it('renders email input field', () => {
    render(<SignUpFormFields form={mockForm} isLoading={false} />, {
      wrapper: MantineWrapper,
    })

    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument()
  })

  it('renders password input field', () => {
    render(<SignUpFormFields form={mockForm} isLoading={false} />, {
      wrapper: MantineWrapper,
    })

    expect(screen.getByPlaceholderText('Your password')).toBeInTheDocument()
  })

  it('renders Create an account button', () => {
    render(<SignUpFormFields form={mockForm} isLoading={false} />, {
      wrapper: MantineWrapper,
    })

    expect(
      screen.getByRole('button', { name: 'Create an account' })
    ).toBeInTheDocument()
  })

  it('shows loading state on button when isLoading is true', () => {
    render(<SignUpFormFields form={mockForm} isLoading={true} />, {
      wrapper: MantineWrapper,
    })

    const button = screen.getByRole('button', { name: 'Create an account' })
    expect(button).toBeDisabled()
  })

  it('calls getInputProps for all form fields', () => {
    render(<SignUpFormFields form={mockForm} isLoading={false} />, {
      wrapper: MantineWrapper,
    })

    expect(mockGetInputProps).toHaveBeenCalledWith('name')
    expect(mockGetInputProps).toHaveBeenCalledWith('email')
    expect(mockGetInputProps).toHaveBeenCalledWith('password')
  })

  it('renders form with correct structure', () => {
    const { container } = render(
      <SignUpFormFields form={mockForm} isLoading={false} />,
      { wrapper: MantineWrapper }
    )

    const stack = container.querySelector('.mantine-Stack-root')
    expect(stack).toBeInTheDocument()
  })
})
