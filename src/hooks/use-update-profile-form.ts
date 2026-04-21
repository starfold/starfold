'use client'

import type { UseFormReturnType } from '@mantine/form'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { zod4Resolver } from 'mantine-form-zod-resolver'
import { useState } from 'react'
import { z } from 'zod'
import { authClient } from '@/lib/auth-client'

export const updateProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
})

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>

interface UseUpdateProfileFormOptions {
  initialName: string
  onSuccess?: () => void
}

interface UseUpdateProfileFormReturn {
  form: UseFormReturnType<UpdateProfileFormValues>
  isLoading: boolean
  handleSubmit: (values: UpdateProfileFormValues) => Promise<void>
}

export function useUpdateProfileForm({
  initialName,
  onSuccess,
}: UseUpdateProfileFormOptions): UseUpdateProfileFormReturn {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<UpdateProfileFormValues>({
    initialValues: {
      name: initialName,
    },
    validate: zod4Resolver(updateProfileSchema),
  })

  const handleSubmit = async (values: UpdateProfileFormValues) => {
    setIsLoading(true)
    try {
      const result = await authClient.updateUser({
        name: values.name,
      })

      if (result.error) {
        notifications.show({
          title: 'Error',
          message: result.error.message || 'Failed to update profile',
          color: 'red',
        })
      } else {
        notifications.show({
          title: 'Success',
          message: 'Profile updated successfully',
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
    handleSubmit,
  }
}
