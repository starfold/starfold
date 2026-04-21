'use client'

import type { UseFormReturnType } from '@mantine/form'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { zod4Resolver } from 'mantine-form-zod-resolver'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'
import { authClient } from '@/lib/auth-client'

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

interface UseResetPasswordFormReturn {
  form: UseFormReturnType<ResetPasswordFormValues>
  isLoading: boolean
  isSuccess: boolean
  handleSubmit: (values: ResetPasswordFormValues) => Promise<void>
}

export function useResetPasswordForm(): UseResetPasswordFormReturn {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<ResetPasswordFormValues>({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validate: zod4Resolver(resetPasswordSchema),
  })

  const handleSubmit = async (values: ResetPasswordFormValues) => {
    if (!token) {
      notifications.show({
        title: 'Error',
        message: 'Invalid or missing reset token. Please request a new link.',
        color: 'red',
      })
      return
    }

    setIsLoading(true)
    try {
      await authClient.resetPassword({
        newPassword: values.password,
        token,
      })
      setIsSuccess(true)
    } catch {
      notifications.show({
        title: 'Error',
        message: 'Failed to reset password. The link may have expired.',
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
