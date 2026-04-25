import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { siteLinks } from '@/config'
import { MantineWrapper } from '@/test'
import {
  forgotPasswordSchema,
  useForgotPasswordForm,
} from './use-forgot-password-form'

vi.mock('@mantine/notifications', () => ({
  notifications: {
    show: vi.fn(),
  },
}))

vi.mock('@/lib/client', () => ({
  authClient: {
    requestPasswordReset: vi.fn(),
  },
}))

describe('forgotPasswordSchema', () => {
  describe('email validation', () => {
    it('accepts valid email', () => {
      const result = forgotPasswordSchema.safeParse({
        email: 'test@example.com',
      })
      expect(result.success).toBe(true)
    })

    it('rejects invalid email format', () => {
      const result = forgotPasswordSchema.safeParse({
        email: 'invalid-email',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Please enter a valid email address'
        )
      }
    })

    it('rejects empty email', () => {
      const result = forgotPasswordSchema.safeParse({
        email: '',
      })
      expect(result.success).toBe(false)
    })
  })
})

describe('useForgotPasswordForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('initializes with correct default state', () => {
    const { result } = renderHook(() => useForgotPasswordForm(), {
      wrapper: MantineWrapper,
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.isSuccess).toBe(false)
    expect(result.current.form.values.email).toBe('')
  })

  it('sets isLoading to true when submitting', async () => {
    const { authClient } = await import('@/lib/client')
    vi.mocked(authClient.requestPasswordReset).mockImplementationOnce(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    )

    const { result } = renderHook(() => useForgotPasswordForm(), {
      wrapper: MantineWrapper,
    })

    act(() => {
      result.current.handleSubmit({ email: 'test@example.com' })
    })

    expect(result.current.isLoading).toBe(true)
  })

  it('sets isSuccess to true on successful submission', async () => {
    const { authClient } = await import('@/lib/client')
    vi.mocked(authClient.requestPasswordReset).mockResolvedValueOnce(
      {} as never
    )

    const { result } = renderHook(() => useForgotPasswordForm(), {
      wrapper: MantineWrapper,
    })

    await act(async () => {
      await result.current.handleSubmit({ email: 'test@example.com' })
    })

    expect(result.current.isSuccess).toBe(true)
    expect(result.current.isLoading).toBe(false)
  })

  it('calls authClient.requestPasswordReset with correct params', async () => {
    const { authClient } = await import('@/lib/client')
    vi.mocked(authClient.requestPasswordReset).mockResolvedValueOnce(
      {} as never
    )

    const { result } = renderHook(() => useForgotPasswordForm(), {
      wrapper: MantineWrapper,
    })

    await act(async () => {
      await result.current.handleSubmit({ email: 'test@example.com' })
    })

    expect(authClient.requestPasswordReset).toHaveBeenCalledWith({
      email: 'test@example.com',
      redirectTo: siteLinks.auth.resetPassword,
    })
  })

  it('shows error notification on failure', async () => {
    const { notifications } = await import('@mantine/notifications')
    const { authClient } = await import('@/lib/client')
    vi.mocked(authClient.requestPasswordReset).mockRejectedValueOnce(
      new Error('Failed')
    )

    const { result } = renderHook(() => useForgotPasswordForm(), {
      wrapper: MantineWrapper,
    })

    await act(async () => {
      await result.current.handleSubmit({ email: 'test@example.com' })
    })

    await waitFor(() => {
      expect(vi.mocked(notifications.show)).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Error',
          message: 'Failed to send reset email. Please try again.',
          color: 'red',
        })
      )
    })
  })

  it('sets isLoading back to false on error', async () => {
    const { authClient } = await import('@/lib/client')
    vi.mocked(authClient.requestPasswordReset).mockRejectedValueOnce(
      new Error('Failed')
    )

    const { result } = renderHook(() => useForgotPasswordForm(), {
      wrapper: MantineWrapper,
    })

    await act(async () => {
      await result.current.handleSubmit({ email: 'test@example.com' })
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.isSuccess).toBe(false)
  })
})
