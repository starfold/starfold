import { notifications } from '@mantine/notifications'
import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { authClient } from '@/lib/auth-client'
import { MantineWrapper } from '@/test'
import { signInSchema, useSignInForm } from './use-sign-in-form'

// Mock the auth-client module
vi.mock('@/lib/auth-client', () => ({
  authClient: {
    signIn: {
      email: vi.fn(),
    },
  },
}))

// Mock mantine notifications
vi.mock('@mantine/notifications', () => ({
  notifications: {
    show: vi.fn(),
  },
}))

describe('useSignInForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('initializes with empty form values', () => {
    const { result } = renderHook(() => useSignInForm(), {
      wrapper: MantineWrapper,
    })

    expect(result.current.form.values).toEqual({
      email: '',
      password: '',
    })
  })

  it('initializes with isLoading false', () => {
    const { result } = renderHook(() => useSignInForm(), {
      wrapper: MantineWrapper,
    })

    expect(result.current.isLoading).toBe(false)
  })

  it('updates form values when setFieldValue is called', async () => {
    const { result } = renderHook(() => useSignInForm(), {
      wrapper: MantineWrapper,
    })

    await act(async () => {
      result.current.form.setFieldValue('email', 'test@example.com')
      result.current.form.setFieldValue('password', 'password123')
    })

    expect(result.current.form.values.email).toBe('test@example.com')
    expect(result.current.form.values.password).toBe('password123')
  })

  it('handleSubmit is defined and callable', async () => {
    const onSuccess = vi.fn()
    vi.mocked(authClient.signIn.email).mockResolvedValueOnce({
      data: { user: {} },
      error: null,
    } as never)

    const { result } = renderHook(() => useSignInForm({ onSuccess }), {
      wrapper: MantineWrapper,
    })

    expect(typeof result.current.handleSubmit).toBe('function')

    let error: unknown
    try {
      await act(async () => {
        await result.current.handleSubmit({
          email: 'test@example.com',
          password: 'password123',
        })
      })
    } catch (e) {
      error = e
    }

    // Verify no error was thrown - the function should complete
    expect(error).toBeUndefined()
  })

  it('shows error notification when sign in returns an error', async () => {
    vi.mocked(authClient.signIn.email).mockResolvedValueOnce({
      data: null,
      error: { message: 'Invalid credentials' },
    } as never)

    const { result } = renderHook(() => useSignInForm(), {
      wrapper: MantineWrapper,
    })

    await act(async () => {
      await result.current.handleSubmit({
        email: 'test@example.com',
        password: 'wrongpassword',
      })
    })

    expect(notifications.show).toHaveBeenCalledWith({
      title: 'Error',
      message: 'Invalid credentials',
      color: 'red',
    })
  })

  it('shows error notification with default message when sign in error has no message', async () => {
    vi.mocked(authClient.signIn.email).mockResolvedValueOnce({
      data: null,
      error: {},
    } as never)

    const { result } = renderHook(() => useSignInForm(), {
      wrapper: MantineWrapper,
    })

    await act(async () => {
      await result.current.handleSubmit({
        email: 'test@example.com',
        password: 'wrongpassword',
      })
    })

    expect(notifications.show).toHaveBeenCalledWith({
      title: 'Error',
      message: 'Failed to sign in',
      color: 'red',
    })
  })

  it('shows error notification when an unexpected error occurs', async () => {
    vi.mocked(authClient.signIn.email).mockRejectedValueOnce(
      new Error('Network error')
    )

    const { result } = renderHook(() => useSignInForm(), {
      wrapper: MantineWrapper,
    })

    await act(async () => {
      await result.current.handleSubmit({
        email: 'test@example.com',
        password: 'password123',
      })
    })

    expect(notifications.show).toHaveBeenCalledWith({
      title: 'Error',
      message: 'An unexpected error occurred',
      color: 'red',
    })
  })
})

describe('signInSchema', () => {
  describe('email validation', () => {
    it('accepts valid email', () => {
      const result = signInSchema.safeParse({
        email: 'test@example.com',
        password: 'password123',
      })
      expect(result.success).toBe(true)
    })

    it('rejects invalid email format', () => {
      const result = signInSchema.safeParse({
        email: 'invalid-email',
        password: 'password123',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid email')
      }
    })

    it('rejects empty email', () => {
      const result = signInSchema.safeParse({
        email: '',
        password: 'password123',
      })
      expect(result.success).toBe(false)
    })
  })

  describe('password validation', () => {
    it('accepts password with at least 8 characters', () => {
      const result = signInSchema.safeParse({
        email: 'test@example.com',
        password: 'password123',
      })
      expect(result.success).toBe(true)
    })

    it('rejects password with less than 8 characters', () => {
      const result = signInSchema.safeParse({
        email: 'test@example.com',
        password: 'short',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Password must be at least 8 characters'
        )
      }
    })

    it('rejects empty password', () => {
      const result = signInSchema.safeParse({
        email: 'test@example.com',
        password: '',
      })
      expect(result.success).toBe(false)
    })
  })

  describe('complete form validation', () => {
    it('accepts valid email and password', () => {
      const result = signInSchema.safeParse({
        email: 'user@domain.com',
        password: 'securepassword',
      })
      expect(result.success).toBe(true)
    })

    it('rejects when both fields are invalid', () => {
      const result = signInSchema.safeParse({
        email: 'not-an-email',
        password: 'short',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toHaveLength(2)
      }
    })
  })
})
