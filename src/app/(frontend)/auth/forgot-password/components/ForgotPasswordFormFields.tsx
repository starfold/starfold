import { Button, TextInput } from '@mantine/core'
import { sizes } from '@/app/(frontend)/design'
import type { ForgotPasswordFormValues } from '@/hooks'

interface ForgotPasswordFormFieldsProps {
  form: {
    getInputProps: (field: keyof ForgotPasswordFormValues) => object
  }
  isLoading: boolean
}

export function ForgotPasswordFormFields({
  form,
  isLoading,
}: ForgotPasswordFormFieldsProps) {
  return (
    <>
      <TextInput
        label="Email"
        placeholder="you@example.com"
        type="email"
        required
        disabled={isLoading}
        {...form.getInputProps('email')}
      />
      <Button type="submit" loading={isLoading} fullWidth mt={sizes.x1}>
        Send password reset email
      </Button>
    </>
  )
}
