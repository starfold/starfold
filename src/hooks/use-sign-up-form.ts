'use client'

import type { UseFormReturnType } from '@mantine/form'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { zod4Resolver } from 'mantine-form-zod-resolver'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'
import { siteLinks } from '@/config'
import { authClient } from '@/lib/client/auth-client'

export const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export type SignUpFormValues = z.infer<typeof signUpSchema>

interface UseSignUpFormOptions {
  onSuccess?: () => void
}

interface UseSignUpFormReturn {
  form: UseFormReturnType<SignUpFormValues>
  isLoading: boolean
  handleSubmit: (values: SignUpFormValues) => Promise<void>
}

export function useSignUpForm({
  onSuccess,
}: UseSignUpFormOptions = {}): UseSignUpFormReturn {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<SignUpFormValues>({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validate: zod4Resolver(signUpSchema),
  })

  const handleSubmit = async (values: SignUpFormValues) => {
    setIsLoading(true)
    try {
      const result = await authClient.signUp.email({
        email: values.email,
        password: values.password,
        name: values.name,
      })

      if (result.error) {
        notifications.show({
          title: 'Error',
          message: result.error.message || 'Failed to Create an account',
          color: 'red',
        })
      } else {
        notifications.show({
          title: 'Success',
          message: 'Account created successfully!',
          color: 'green',
        })
        await authClient.signIn.email({
          email: values.email,
          password: values.password,
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
