'use client'

import { Box, Button, PasswordInput, Stack, TextInput } from '@mantine/core'
import { sizes } from '@/app/(frontend)/design'
import type { SignUpFormValues } from './signUpSchema'

interface SignUpFormFieldsProps {
  form: {
    getInputProps: (field: keyof SignUpFormValues) => object
  }
  isLoading: boolean
}

export function SignUpFormFields({ form, isLoading }: SignUpFormFieldsProps) {
  return (
    <Stack gap="sm">
      <TextInput
        label="Name"
        placeholder="Your name"
        required
        {...form.getInputProps('name')}
      />

      <TextInput
        label="Email"
        placeholder="you@example.com"
        required
        {...form.getInputProps('email')}
      />

      <Box>
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          {...form.getInputProps('password')}
        />
      </Box>

      <Button
        type="submit"
        fullWidth
        loading={isLoading}
        loaderProps={{ type: 'dots' }}
        mt={sizes.x1}
      >
        Create an account
      </Button>
    </Stack>
  )
}
