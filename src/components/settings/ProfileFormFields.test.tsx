import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MantineWrapper, verifiedUser } from '@/test'
import { ProfileFormFields } from './ProfileFormFields'

describe('ProfileFormFields', () => {
  const mockGetInputProps = vi.fn((_field: string) => ({
    value: '',
    onChange: vi.fn(),
    error: null,
  }))

  const mockForm = {
    getInputProps: mockGetInputProps,
  }

  it('renders title and description', () => {
    render(
      <ProfileFormFields
        form={mockForm}
        isLoading={false}
        email={verifiedUser.email}
      />,
      { wrapper: MantineWrapper }
    )

    expect(screen.getByText('Profile')).toBeInTheDocument()
    expect(
      screen.getByText('Manage your public profile information')
    ).toBeInTheDocument()
  })

  it('renders name input field', () => {
    render(
      <ProfileFormFields
        form={mockForm}
        isLoading={false}
        email={verifiedUser.email}
      />,
      { wrapper: MantineWrapper }
    )

    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument()
  })

  it('renders email input as disabled', () => {
    render(
      <ProfileFormFields
        form={mockForm}
        isLoading={false}
        email={verifiedUser.email}
      />,
      { wrapper: MantineWrapper }
    )

    const emailInput = screen.getByDisplayValue(
      verifiedUser.email
    ) as HTMLInputElement
    expect(emailInput).toBeInTheDocument()
    expect(emailInput).toBeDisabled()
  })

  it('renders update profile button', () => {
    render(
      <ProfileFormFields
        form={mockForm}
        isLoading={false}
        email={verifiedUser.email}
      />,
      { wrapper: MantineWrapper }
    )

    expect(
      screen.getByRole('button', { name: 'Update profile' })
    ).toBeInTheDocument()
  })

  it('shows loading state on button when isLoading is true', () => {
    render(
      <ProfileFormFields
        form={mockForm}
        isLoading={true}
        email={verifiedUser.email}
      />,
      { wrapper: MantineWrapper }
    )

    const button = screen.getByRole('button', { name: 'Update profile' })
    expect(button).toBeDisabled()
  })

  it('calls getInputProps for name field', () => {
    render(
      <ProfileFormFields
        form={mockForm}
        isLoading={false}
        email={verifiedUser.email}
      />,
      { wrapper: MantineWrapper }
    )

    expect(mockGetInputProps).toHaveBeenCalledWith('name')
  })
})
