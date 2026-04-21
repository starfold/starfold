'use client'

import { Button, PasswordInput, Stack, Text, Title } from '@mantine/core'
import { sizes } from '@/app/(frontend)/design'
import type { ChangePasswordFormValues } from '@/hooks'

interface PasswordFormFieldsProps {
  form: {
    getInputProps: (field: keyof ChangePasswordFormValues) => object
  }
  isLoading: boolean
}

export function PasswordFormFields({
  form,
  isLoading,
}: PasswordFormFieldsProps) {
  return (
    <Stack>
      <div>
        <Title order={2}>Account</Title>
        <Text c="dimmed" size="sm" mt={4}>
          Manage your account security and password
        </Text>
      </div>

      <Stack maw={120 * sizes.x1i}>
        <PasswordInput
          label="Current password"
          placeholder="Your current password"
          required
          {...form.getInputProps('currentPassword')}
        />

        <PasswordInput
          label="New password"
          placeholder="Your new password"
          required
          {...form.getInputProps('newPassword')}
        />

        <PasswordInput
          label="Confirm new password"
          placeholder="Confirm your new password"
          required
          {...form.getInputProps('confirmPassword')}
        />

        <Button
          type="submit"
          loading={isLoading}
          loaderProps={{ type: 'dots' }}
          style={{ alignSelf: 'flex-start' }}
        >
          Change password
        </Button>
      </Stack>
    </Stack>
  )
}
