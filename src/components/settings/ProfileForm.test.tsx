import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { authClient } from '@/lib/client/auth-client'
import { MantineWrapper, verifiedUser } from '@/test'
import { ProfileForm } from './ProfileForm'

vi.mock('@/lib/client/auth-client', () => ({
  authClient: {
    updateUser: vi.fn(),
  },
}))

vi.mock('@mantine/notifications', () => ({
  notifications: {
    show: vi.fn(),
  },
}))

describe('ProfileForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders title and description', () => {
    render(<ProfileForm user={verifiedUser} />, { wrapper: MantineWrapper })

    expect(screen.getByText('Profile')).toBeInTheDocument()
    expect(
      screen.getByText('Manage your public profile information')
    ).toBeInTheDocument()
  })

  it('renders name input with initial value', () => {
    render(<ProfileForm user={verifiedUser} />, { wrapper: MantineWrapper })

    const nameInput = screen.getByPlaceholderText(
      'Your name'
    ) as HTMLInputElement
    expect(nameInput.value).toBe(verifiedUser.name)
  })

  it('renders email input as disabled', () => {
    render(<ProfileForm user={verifiedUser} />, { wrapper: MantineWrapper })

    const emailInput = screen.getByDisplayValue(
      verifiedUser.email
    ) as HTMLInputElement
    expect(emailInput).toBeDisabled()
  })

  it('submits form and calls updateUser', async () => {
    vi.mocked(authClient.updateUser).mockResolvedValueOnce({
      data: { user: { name: 'Updated Name' } },
      error: null,
    } as never)

    render(<ProfileForm user={verifiedUser} />, { wrapper: MantineWrapper })

    const nameInput = screen.getByPlaceholderText('Your name')
    fireEvent.change(nameInput, { target: { value: 'Updated Name' } })

    const submitButton = screen.getByRole('button', { name: 'Update profile' })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(authClient.updateUser).toHaveBeenCalledWith({
        name: 'Updated Name',
      })
    })
  })

  it('shows validation error for short name', async () => {
    render(<ProfileForm user={verifiedUser} />, { wrapper: MantineWrapper })

    const nameInput = screen.getByPlaceholderText('Your name')
    fireEvent.change(nameInput, { target: { value: 'A' } })

    const submitButton = screen.getByRole('button', { name: 'Update profile' })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(
        screen.getByText('Name must be at least 2 characters')
      ).toBeInTheDocument()
    })
  })
})
