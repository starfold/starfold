'use client'

import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { zod4Resolver } from 'mantine-form-zod-resolver'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { siteLinks } from '@/config'
import { authClient } from '@/lib/auth-client'
import { type SignInFormValues, signInSchema } from './signInSchema'

interface UseSignInFormOptions {
  onSuccess?: () => void
}

import type { UseFormReturnType } from '@mantine/form'

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
        notifications.show({
          title: 'Success',
          message: 'Signed in successfully!',
          color: 'green',
        })
        router.push(siteLinks.landing)
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
