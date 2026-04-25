'use client'

import type { UseFormReturnType } from '@mantine/form'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { zod4Resolver } from 'mantine-form-zod-resolver'
import { useState } from 'react'
import { z } from 'zod'
import { siteLinks } from '@/config'
import { authClient } from '@/lib/client'

export const forgotPasswordSchema = z.object({
  email: z.email('Please enter a valid email address'),
})

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

interface UseForgotPasswordFormReturn {
  form: UseFormReturnType<ForgotPasswordFormValues>
  isLoading: boolean
  isSuccess: boolean
  handleSubmit: (values: ForgotPasswordFormValues) => Promise<void>
}

export function useForgotPasswordForm(): UseForgotPasswordFormReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<ForgotPasswordFormValues>({
    initialValues: {
      email: '',
    },
    validate: zod4Resolver(forgotPasswordSchema),
  })

  const handleSubmit = async (values: ForgotPasswordFormValues) => {
    setIsLoading(true)
    try {
      await authClient.requestPasswordReset({
        email: values.email,
        redirectTo: siteLinks.auth.resetPassword,
      })
      setIsSuccess(true)
    } catch {
      notifications.show({
        title: 'Error',
        message: 'Failed to send reset email. Please try again.',
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
