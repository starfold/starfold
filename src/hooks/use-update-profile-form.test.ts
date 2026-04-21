import { notifications } from '@mantine/notifications'
import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { authClient } from '@/lib/auth-client'
import { MantineWrapper } from '@/test'
import {
  updateProfileSchema,
  useUpdateProfileForm,
} from './use-update-profile-form'

vi.mock('@/lib/auth-client', () => ({
  authClient: {
    updateUser: vi.fn(),
  },
}))

vi.mock('@mantine/notifications', () => ({
  notifications: {
    show: vi.fn(),
  },
}))

describe('useUpdateProfileForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('initializes with provided name', () => {
    const { result } = renderHook(
      () => useUpdateProfileForm({ initialName: 'John Doe' }),
      { wrapper: MantineWrapper }
    )

    expect(result.current.form.values).toEqual({
      name: 'John Doe',
    })
  })

  it('initializes with isLoading false', () => {
    const { result } = renderHook(
      () => useUpdateProfileForm({ initialName: 'John Doe' }),
      { wrapper: MantineWrapper }
    )

    expect(result.current.isLoading).toBe(false)
  })

  it('shows success notification on successful update', async () => {
    vi.mocked(authClient.updateUser).mockResolvedValueOnce({
      data: { user: { name: 'Jane Doe' } },
      error: null,
    } as never)

    const onSuccess = vi.fn()
    const { result } = renderHook(
      () => useUpdateProfileForm({ initialName: 'John Doe', onSuccess }),
      { wrapper: MantineWrapper }
    )

    await act(async () => {
      await result.current.handleSubmit({ name: 'Jane Doe' })
    })

    expect(authClient.updateUser).toHaveBeenCalledWith({ name: 'Jane Doe' })
    expect(notifications.show).toHaveBeenCalledWith({
      title: 'Success',
      message: 'Profile updated successfully',
      color: 'green',
    })
    expect(onSuccess).toHaveBeenCalled()
  })

  it('shows error notification when update returns an error', async () => {
    vi.mocked(authClient.updateUser).mockResolvedValueOnce({
      data: null,
      error: { message: 'Name already taken' },
    } as never)

    const { result } = renderHook(
      () => useUpdateProfileForm({ initialName: 'John Doe' }),
      { wrapper: MantineWrapper }
    )

    await act(async () => {
      await result.current.handleSubmit({ name: 'Jane Doe' })
    })

    expect(notifications.show).toHaveBeenCalledWith({
      title: 'Error',
      message: 'Name already taken',
      color: 'red',
    })
  })

  it('shows default error notification when error has no message', async () => {
    vi.mocked(authClient.updateUser).mockResolvedValueOnce({
      data: null,
      error: {},
    } as never)

    const { result } = renderHook(
      () => useUpdateProfileForm({ initialName: 'John Doe' }),
      { wrapper: MantineWrapper }
    )

    await act(async () => {
      await result.current.handleSubmit({ name: 'Jane Doe' })
    })

    expect(notifications.show).toHaveBeenCalledWith({
      title: 'Error',
      message: 'Failed to update profile',
      color: 'red',
    })
  })

  it('shows error notification on unexpected error', async () => {
    vi.mocked(authClient.updateUser).mockRejectedValueOnce(
      new Error('Network error')
    )

    const { result } = renderHook(
      () => useUpdateProfileForm({ initialName: 'John Doe' }),
      { wrapper: MantineWrapper }
    )

    await act(async () => {
      await result.current.handleSubmit({ name: 'Jane Doe' })
    })

    expect(notifications.show).toHaveBeenCalledWith({
      title: 'Error',
      message: 'An unexpected error occurred',
      color: 'red',
    })
  })
})

describe('updateProfileSchema', () => {
  it('accepts valid name', () => {
    const result = updateProfileSchema.safeParse({ name: 'John Doe' })
    expect(result.success).toBe(true)
  })

  it('rejects name with less than 2 characters', () => {
    const result = updateProfileSchema.safeParse({ name: 'J' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Name must be at least 2 characters'
      )
    }
  })

  it('rejects empty name', () => {
    const result = updateProfileSchema.safeParse({ name: '' })
    expect(result.success).toBe(false)
  })
})
