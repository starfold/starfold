'use client'

import type { UseFormReturnType } from '@mantine/form'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { zod4Resolver } from 'mantine-form-zod-resolver'
import { useState } from 'react'
import { z } from 'zod'
import { authClient } from '@/lib/auth-client'

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>

interface UseChangePasswordFormOptions {
  onSuccess?: () => void
}

interface UseChangePasswordFormReturn {
  form: UseFormReturnType<ChangePasswordFormValues>
  isLoading: boolean
  isSuccess: boolean
  handleSubmit: (values: ChangePasswordFormValues) => Promise<void>
}

export function useChangePasswordForm({
  onSuccess,
}: UseChangePasswordFormOptions = {}): UseChangePasswordFormReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<ChangePasswordFormValues>({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validate: zod4Resolver(changePasswordSchema),
  })

  const handleSubmit = async (values: ChangePasswordFormValues) => {
    setIsLoading(true)
    setIsSuccess(false)
    try {
      const result = await authClient.changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      })

      if (result.error) {
        notifications.show({
          title: 'Error',
          message: result.error.message || 'Failed to change password',
          color: 'red',
        })
      } else {
        setIsSuccess(true)
        form.reset()
        notifications.show({
          title: 'Success',
          message: 'Password changed successfully',
          color: 'green',
        })
        onSuccess?.()
      }
    } catch {
      notifications.show({
        title: 'Error',
        message: 'An unexpected error occurred',
        color: 'red',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    form,
    isLoading,
    isSuccess,
    handleSubmit,
  }
}
