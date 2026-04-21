import { notifications } from '@mantine/notifications'
import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { authClient } from '@/lib/auth-client'
import { MantineWrapper } from '@/test'
import {
  changePasswordSchema,
  useChangePasswordForm,
} from './use-change-password-form'

vi.mock('@/lib/auth-client', () => ({
  authClient: {
    changePassword: vi.fn(),
  },
}))

vi.mock('@mantine/notifications', () => ({
  notifications: {
    show: vi.fn(),
  },
}))

describe('useChangePasswordForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('initializes with empty values', () => {
    const { result } = renderHook(() => useChangePasswordForm(), {
      wrapper: MantineWrapper,
    })

    expect(result.current.form.values).toEqual({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
  })

  it('initializes with isLoading false and isSuccess false', () => {
    const { result } = renderHook(() => useChangePasswordForm(), {
      wrapper: MantineWrapper,
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.isSuccess).toBe(false)
  })

  it('shows success notification on successful password change', async () => {
    vi.mocked(authClient.changePassword).mockResolvedValueOnce({
      data: { token: 'new-token', user: {} },
      error: null,
    } as never)

    const onSuccess = vi.fn()
    const { result } = renderHook(() => useChangePasswordForm({ onSuccess }), {
      wrapper: MantineWrapper,
    })

    await act(async () => {
      await result.current.handleSubmit({
        currentPassword: 'oldpassword123',
        newPassword: 'newpassword123',
        confirmPassword: 'newpassword123',
      })
    })

    expect(authClient.changePassword).toHaveBeenCalledWith({
      currentPassword: 'oldpassword123',
      newPassword: 'newpassword123',
    })
    expect(result.current.isSuccess).toBe(true)
    expect(notifications.show).toHaveBeenCalledWith({
      title: 'Success',
      message: 'Password changed successfully',
      color: 'green',
    })
    expect(onSuccess).toHaveBeenCalled()
  })

  it('shows error notification when change password returns an error', async () => {
    vi.mocked(authClient.changePassword).mockResolvedValueOnce({
      data: null,
      error: { message: 'Current password is incorrect' },
    } as never)

    const { result } = renderHook(() => useChangePasswordForm(), {
      wrapper: MantineWrapper,
    })

    await act(async () => {
      await result.current.handleSubmit({
        currentPassword: 'wrongpassword',
        newPassword: 'newpassword123',
        confirmPassword: 'newpassword123',
      })
    })

    expect(notifications.show).toHaveBeenCalledWith({
      title: 'Error',
      message: 'Current password is incorrect',
      color: 'red',
    })
    expect(result.current.isSuccess).toBe(false)
  })

  it('shows default error notification when error has no message', async () => {
    vi.mocked(authClient.changePassword).mockResolvedValueOnce({
      data: null,
      error: {},
    } as never)

    const { result } = renderHook(() => useChangePasswordForm(), {
      wrapper: MantineWrapper,
    })

    await act(async () => {
      await result.current.handleSubmit({
        currentPassword: 'oldpassword123',
        newPassword: 'newpassword123',
        confirmPassword: 'newpassword123',
      })
    })

    expect(notifications.show).toHaveBeenCalledWith({
      title: 'Error',
      message: 'Failed to change password',
      color: 'red',
    })
  })

  it('shows error notification on unexpected error', async () => {
    vi.mocked(authClient.changePassword).mockRejectedValueOnce(
      new Error('Network error')
    )

    const { result } = renderHook(() => useChangePasswordForm(), {
      wrapper: MantineWrapper,
    })

    await act(async () => {
      await result.current.handleSubmit({
        currentPassword: 'oldpassword123',
        newPassword: 'newpassword123',
        confirmPassword: 'newpassword123',
      })
    })

    expect(notifications.show).toHaveBeenCalledWith({
      title: 'Error',
      message: 'An unexpected error occurred',
      color: 'red',
    })
  })
})

describe('changePasswordSchema', () => {
  it('accepts valid password change', () => {
    const result = changePasswordSchema.safeParse({
      currentPassword: 'oldpassword123',
      newPassword: 'newpassword123',
      confirmPassword: 'newpassword123',
    })
    expect(result.success).toBe(true)
  })

  it('rejects when new password is less than 8 characters', () => {
    const result = changePasswordSchema.safeParse({
      currentPassword: 'oldpassword123',
      newPassword: 'short',
      confirmPassword: 'short',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Password must be at least 8 characters'
      )
    }
  })

  it('rejects when passwords do not match', () => {
    const result = changePasswordSchema.safeParse({
      currentPassword: 'oldpassword123',
      newPassword: 'newpassword123',
      confirmPassword: 'different123',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Passwords do not match')
    }
  })

  it('rejects empty current password', () => {
    const result = changePasswordSchema.safeParse({
      currentPassword: '',
      newPassword: 'newpassword123',
      confirmPassword: 'newpassword123',
    })
    expect(result.success).toBe(false)
  })
})
