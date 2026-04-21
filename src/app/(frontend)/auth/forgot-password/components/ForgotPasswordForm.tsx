'use client'

import { Stack, Text } from '@mantine/core'
import { useForgotPasswordForm } from '@/hooks'
import { ForgotPasswordFormFields } from './ForgotPasswordFormFields'

export function ForgotPasswordForm() {
  const { form, isLoading, isSuccess, handleSubmit } = useForgotPasswordForm()

  if (isSuccess) {
    return (
      <Text ta="center">
        Check your email for a link to reset your password. If it doesn’t appear
        within a few minutes, check your spam folder.
      </Text>
    )
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="sm">
        <ForgotPasswordFormFields form={form} isLoading={isLoading} />
      </Stack>
    </form>
  )
}
