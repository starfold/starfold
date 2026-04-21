'use client'

import { Button, Stack, Text, TextInput, Title } from '@mantine/core'
import { sizes } from '@/app/(frontend)/design'
import type { UpdateProfileFormValues } from '@/hooks'

interface ProfileFormFieldsProps {
  form: {
    getInputProps: (field: keyof UpdateProfileFormValues) => object
  }
  isLoading: boolean
  email: string
}

export function ProfileFormFields({
  form,
  isLoading,
  email,
}: ProfileFormFieldsProps) {
  return (
    <Stack>
      <div>
        <Title order={2}>Profile</Title>
        <Text c="dimmed" size="sm" mt={4}>
          Manage your public profile information
        </Text>
      </div>

      <Stack maw={120 * sizes.x1i}>
        <TextInput
          label="Name"
          placeholder="Your name"
          description="Your name appears on your profile and across the site."
          required
          {...form.getInputProps('name')}
        />

        <TextInput
          label="Email"
          value={email}
          disabled
          description="Your email address is used for sign-in and notifications."
        />

        <Button
          type="submit"
          loading={isLoading}
          loaderProps={{ type: 'dots' }}
          style={{ alignSelf: 'flex-start' }}
        >
          Update profile
        </Button>
      </Stack>
    </Stack>
  )
}
