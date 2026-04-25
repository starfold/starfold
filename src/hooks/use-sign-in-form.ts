'use client'

import type { UseFormReturnType } from '@mantine/form'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { zod4Resolver } from 'mantine-form-zod-resolver'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'
import { authClient } from '@/lib/client'
import { getSafeRedirectUrl } from '@/lib/common/redirect'

export const signInSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export type SignInFormValues = z.infer<typeof signInSchema>

interface UseSignInFormOptions {
  onSuccess?: () => void
}

interface UseSignInFormReturn {
  form: UseFormReturnType<SignInFormValues>
  isLoading: boolean
  handleSubmit: (values: SignInFormValues) => Promise<void>
}

export function useSignInForm({
  onSuccess,
}: UseSignInFormOptions = {}): UseSignInFormReturn {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = getSafeRedirectUrl(searchParams.get('redirect'))

  const form = useForm<SignInFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: zod4Resolver(signInSchema),
  })

  const handleSubmit = async (values: SignInFormValues) => {
    setIsLoading(true)
    try {
      const result = await authClient.signIn.email({
        email: values.email,
        password: values.password,
      })

      if (result.error) {
        notifications.show({
          title: 'Error',
          message: result.error.message || 'Failed to sign in',
          color: 'red',
        })
      } else {
        router.push(redirectUrl)
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
    handleSubmit,
  }
}
