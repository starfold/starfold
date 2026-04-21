'use client'

import { Button, PasswordInput } from '@mantine/core'
import { sizes } from '@/app/(frontend)/design'
import type { ResetPasswordFormValues } from '@/hooks'

interface ResetPasswordFormFieldsProps {
  form: {
    getInputProps: (field: keyof ResetPasswordFormValues) => object
  }
  isLoading: boolean
}

export function ResetPasswordFormFields({
  form,
  isLoading,
}: ResetPasswordFormFieldsProps) {
  return (
    <>
      <PasswordInput
        label="New password"
        placeholder="Enter your new password"
        required
        disabled={isLoading}
        {...form.getInputProps('password')}
      />
      <PasswordInput
        label="Confirm password"
        placeholder="Confirm your new password"
        required
        disabled={isLoading}
        {...form.getInputProps('confirmPassword')}
      />
      <Button type="submit" loading={isLoading} fullWidth mt={sizes.x1}>
        Reset password
      </Button>
    </>
  )
}
