'use client'

import { Stack, Text } from '@mantine/core'
import { useResetPasswordForm } from '@/hooks'
import { ResetPasswordFormFields } from './ResetPasswordFormFields'

export function ResetPasswordForm() {
  const { form, isLoading, isSuccess, handleSubmit } = useResetPasswordForm()

  if (isSuccess) {
    return (
      <Text ta="center">
        Your password has been reset. You can now sign in with your new
        password.
      </Text>
    )
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="sm">
        <ResetPasswordFormFields form={form} isLoading={isLoading} />
      </Stack>
    </form>
  )
}
