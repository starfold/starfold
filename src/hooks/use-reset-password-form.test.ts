import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { MantineWrapper } from '@/test'
import {
  resetPasswordSchema,
  useResetPasswordForm,
} from './use-reset-password-form'

const mockGetSearchParam = vi.fn((key: string) =>
  key === 'token' ? 'valid-token' : null
)

vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(() => ({
    get: mockGetSearchParam,
  })),
}))

vi.mock('@mantine/notifications', () => ({
  notifications: {
    show: vi.fn(),
  },
}))

vi.mock('@/lib/client', () => ({
  authClient: {
    resetPassword: vi.fn(),
  },
}))

describe('useResetPasswordForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('initializes with correct default state', () => {
    const { result } = renderHook(() => useResetPasswordForm(), {
      wrapper: MantineWrapper,
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.isSuccess).toBe(false)
    expect(result.current.form.values.password).toBe('')
    expect(result.current.form.values.confirmPassword).toBe('')
  })

  it('sets isLoading to true when submitting', async () => {
    const { authClient } = await import('@/lib/client')
    vi.mocked(authClient.resetPassword).mockImplementationOnce(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    )

    const { result } = renderHook(() => useResetPasswordForm(), {
      wrapper: MantineWrapper,
    })

    act(() => {
      result.current.handleSubmit({
        password: 'newpassword123',
        confirmPassword: 'newpassword123',
      })
    })

    expect(result.current.isLoading).toBe(true)
  })

  it('sets isSuccess to true on successful submission', async () => {
    const { authClient } = await import('@/lib/client')
    vi.mocked(authClient.resetPassword).mockResolvedValueOnce({} as never)

    const { result } = renderHook(() => useResetPasswordForm(), {
      wrapper: MantineWrapper,
    })

    await act(async () => {
      await result.current.handleSubmit({
        password: 'newpassword123',
        confirmPassword: 'newpassword123',
      })
    })

    expect(result.current.isSuccess).toBe(true)
    expect(result.current.isLoading).toBe(false)
  })

  it('calls authClient.resetPassword with correct params', async () => {
    const { authClient } = await import('@/lib/client')
    vi.mocked(authClient.resetPassword).mockResolvedValueOnce({} as never)

    const { result } = renderHook(() => useResetPasswordForm(), {
      wrapper: MantineWrapper,
    })

    await act(async () => {
      await result.current.handleSubmit({
        password: 'newpassword123',
        confirmPassword: 'newpassword123',
      })
    })

    expect(authClient.resetPassword).toHaveBeenCalledWith({
      newPassword: 'newpassword123',
      token: 'valid-token',
    })
  })

  it('shows error notification on reset failure', async () => {
    const { notifications: notifs } = await import('@mantine/notifications')
    const { authClient } = await import('@/lib/client')
    vi.mocked(authClient.resetPassword).mockRejectedValueOnce(
      new Error('Failed')
    )

    const { result } = renderHook(() => useResetPasswordForm(), {
      wrapper: MantineWrapper,
    })

    await act(async () => {
      await result.current.handleSubmit({
        password: 'newpassword123',
        confirmPassword: 'newpassword123',
      })
    })

    await waitFor(() => {
      expect(vi.mocked(notifs.show)).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Error',
          message: 'Failed to reset password. The link may have expired.',
          color: 'red',
        })
      )
    })
  })

  it('sets isLoading back to false on error', async () => {
    const { authClient } = await import('@/lib/client')
    vi.mocked(authClient.resetPassword).mockRejectedValueOnce(
      new Error('Failed')
    )

    const { result } = renderHook(() => useResetPasswordForm(), {
      wrapper: MantineWrapper,
    })

    await act(async () => {
      await result.current.handleSubmit({
        password: 'newpassword123',
        confirmPassword: 'newpassword123',
      })
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.isSuccess).toBe(false)
  })

  it('shows error notification when token is missing', async () => {
    mockGetSearchParam.mockImplementation(() => null)

    const { notifications: notifs } = await import('@mantine/notifications')

    const { result } = renderHook(() => useResetPasswordForm(), {
      wrapper: MantineWrapper,
    })

    await act(async () => {
      await result.current.handleSubmit({
        password: 'newpassword123',
        confirmPassword: 'newpassword123',
      })
    })

    await waitFor(() => {
      expect(vi.mocked(notifs.show)).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Error',
          message: 'Invalid or missing reset token. Please request a new link.',
          color: 'red',
        })
      )
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.isSuccess).toBe(false)
  })
})

describe('resetPasswordSchema', () => {
  describe('password validation', () => {
    it('accepts password with at least 8 characters', () => {
      const result = resetPasswordSchema.safeParse({
        password: 'password123',
        confirmPassword: 'password123',
      })
      expect(result.success).toBe(true)
    })

    it('rejects password with less than 8 characters', () => {
      const result = resetPasswordSchema.safeParse({
        password: 'short',
        confirmPassword: 'short',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Password must be at least 8 characters'
        )
      }
    })

    it('rejects empty password', () => {
      const result = resetPasswordSchema.safeParse({
        password: '',
        confirmPassword: '',
      })
      expect(result.success).toBe(false)
    })
  })

  describe('confirmPassword validation', () => {
    it('accepts matching passwords', () => {
      const result = resetPasswordSchema.safeParse({
        password: 'password123',
        confirmPassword: 'password123',
      })
      expect(result.success).toBe(true)
    })

    it('rejects non-matching passwords', () => {
      const result = resetPasswordSchema.safeParse({
        password: 'password123',
        confirmPassword: 'differentpassword',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('confirmPassword')
        expect(result.error.issues[0].message).toBe('Passwords do not match')
      }
    })

    it('rejects when confirmPassword is empty but password is valid', () => {
      const result = resetPasswordSchema.safeParse({
        password: 'password123',
        confirmPassword: '',
      })
      expect(result.success).toBe(false)
    })
  })

  describe('complete form validation', () => {
    it('accepts valid matching passwords', () => {
      const result = resetPasswordSchema.safeParse({
        password: 'securepassword',
        confirmPassword: 'securepassword',
      })
      expect(result.success).toBe(true)
    })

    it('rejects when password is too short and passwords do not match', () => {
      const result = resetPasswordSchema.safeParse({
        password: 'short',
        confirmPassword: 'different',
      })
      expect(result.success).toBe(false)
    })
  })
})
