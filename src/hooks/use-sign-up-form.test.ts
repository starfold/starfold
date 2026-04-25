import { notifications } from '@mantine/notifications'
import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { authClient } from '@/lib/client/auth-client'
import { MantineWrapper } from '@/test'
import { signUpSchema, useSignUpForm } from './use-sign-up-form'

// Mock the auth-client module
vi.mock('@/lib/client/auth-client', () => ({
  authClient: {
    signUp: {
      email: vi.fn(),
    },
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

describe('useSignUpForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('initializes with empty form values', () => {
    const { result } = renderHook(() => useSignUpForm(), {
      wrapper: MantineWrapper,
    })

    expect(result.current.form.values).toEqual({
      name: '',
      email: '',
      password: '',
    })
  })

  it('initializes with isLoading false', () => {
    const { result } = renderHook(() => useSignUpForm(), {
      wrapper: MantineWrapper,
    })

    expect(result.current.isLoading).toBe(false)
  })

  it('updates form values when setFieldValue is called', async () => {
    const { result } = renderHook(() => useSignUpForm(), {
      wrapper: MantineWrapper,
    })

    await act(async () => {
      result.current.form.setFieldValue('name', 'John Doe')
      result.current.form.setFieldValue('email', 'test@example.com')
      result.current.form.setFieldValue('password', 'password123')
    })

    expect(result.current.form.values.name).toBe('John Doe')
    expect(result.current.form.values.email).toBe('test@example.com')
    expect(result.current.form.values.password).toBe('password123')
  })

  it('handleSubmit is defined and callable', async () => {
    vi.mocked(authClient.signUp.email).mockResolvedValueOnce({
      data: { user: {} },
      error: null,
    } as never)
    vi.mocked(authClient.signIn.email).mockResolvedValueOnce({
      data: { user: {} },
      error: null,
    } as never)

    const { result } = renderHook(() => useSignUpForm(), {
      wrapper: MantineWrapper,
    })

    expect(typeof result.current.handleSubmit).toBe('function')

    let error: unknown
    try {
      await act(async () => {
        await result.current.handleSubmit({
          name: 'John Doe',
          email: 'test@example.com',
          password: 'password123',
        })
      })
    } catch (e) {
      error = e
    }

    expect(error).toBeUndefined()
  })

  it('shows success notification and signs in after successful sign up', async () => {
    const onSuccess = vi.fn()
    vi.mocked(authClient.signUp.email).mockResolvedValueOnce({
      data: { user: { id: '123', email: 'test@example.com' } },
      error: null,
    } as never)
    vi.mocked(authClient.signIn.email).mockResolvedValueOnce({
      data: { user: {} },
      error: null,
    } as never)

    const { result } = renderHook(() => useSignUpForm({ onSuccess }), {
      wrapper: MantineWrapper,
    })

    await act(async () => {
      await result.current.handleSubmit({
        name: 'John Doe',
        email: 'test@example.com',
        password: 'password123',
      })
    })

    expect(notifications.show).toHaveBeenCalledWith({
      title: 'Success',
      message: 'Account created successfully!',
      color: 'green',
    })
    expect(authClient.signIn.email).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    })
    expect(onSuccess).toHaveBeenCalled()
  })

  it('shows error notification when sign up returns an error', async () => {
    vi.mocked(authClient.signUp.email).mockResolvedValueOnce({
      data: null,
      error: { message: 'Email already exists' },
    } as never)

    const { result } = renderHook(() => useSignUpForm(), {
      wrapper: MantineWrapper,
    })

    await act(async () => {
      await result.current.handleSubmit({
        name: 'John Doe',
        email: 'existing@example.com',
        password: 'password123',
      })
    })

    expect(notifications.show).toHaveBeenCalledWith({
      title: 'Error',
      message: 'Email already exists',
      color: 'red',
    })
    expect(authClient.signIn.email).not.toHaveBeenCalled()
  })

  it('shows error notification with default message when sign up error has no message', async () => {
    vi.mocked(authClient.signUp.email).mockResolvedValueOnce({
      data: null,
      error: {},
    } as never)

    const { result } = renderHook(() => useSignUpForm(), {
      wrapper: MantineWrapper,
    })

    await act(async () => {
      await result.current.handleSubmit({
        name: 'John Doe',
        email: 'test@example.com',
        password: 'password123',
      })
    })

    expect(notifications.show).toHaveBeenCalledWith({
      title: 'Error',
      message: 'Failed to Create an account',
      color: 'red',
    })
  })

  it('shows error notification when an unexpected error occurs', async () => {
    vi.mocked(authClient.signUp.email).mockRejectedValueOnce(
      new Error('Network error')
    )

    const { result } = renderHook(() => useSignUpForm(), {
      wrapper: MantineWrapper,
    })

    await act(async () => {
      await result.current.handleSubmit({
        name: 'John Doe',
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

describe('signUpSchema', () => {
  describe('name validation', () => {
    it('accepts name with at least 2 characters', () => {
      const result = signUpSchema.safeParse({
        name: 'John',
        email: 'test@example.com',
        password: 'password123',
      })
      expect(result.success).toBe(true)
    })

    it('rejects name with less than 2 characters', () => {
      const result = signUpSchema.safeParse({
        name: 'J',
        email: 'test@example.com',
        password: 'password123',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Name must be at least 2 characters'
        )
      }
    })

    it('rejects empty name', () => {
      const result = signUpSchema.safeParse({
        name: '',
        email: 'test@example.com',
        password: 'password123',
      })
      expect(result.success).toBe(false)
    })
  })

  describe('email validation', () => {
    it('accepts valid email', () => {
      const result = signUpSchema.safeParse({
        name: 'John',
        email: 'test@example.com',
        password: 'password123',
      })
      expect(result.success).toBe(true)
    })

    it('rejects invalid email format', () => {
      const result = signUpSchema.safeParse({
        name: 'John',
        email: 'invalid-email',
        password: 'password123',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid email')
      }
    })

    it('rejects empty email', () => {
      const result = signUpSchema.safeParse({
        name: 'John',
        email: '',
        password: 'password123',
      })
      expect(result.success).toBe(false)
    })
  })

  describe('password validation', () => {
    it('accepts password with at least 8 characters', () => {
      const result = signUpSchema.safeParse({
        name: 'John',
        email: 'test@example.com',
        password: 'password123',
      })
      expect(result.success).toBe(true)
    })

    it('rejects password with less than 8 characters', () => {
      const result = signUpSchema.safeParse({
        name: 'John',
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
      const result = signUpSchema.safeParse({
        name: 'John',
        email: 'test@example.com',
        password: '',
      })
      expect(result.success).toBe(false)
    })
  })

  describe('complete form validation', () => {
    it('accepts valid form data', () => {
      const result = signUpSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'securepassword',
      })
      expect(result.success).toBe(true)
    })

    it('rejects when multiple fields are invalid', () => {
      const result = signUpSchema.safeParse({
        name: 'J',
        email: 'not-an-email',
        password: 'short',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(1)
      }
    })
  })
})
