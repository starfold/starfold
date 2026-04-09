'use client'

import { SignUpFormFields } from './SignUpFormFields'
import { useSignUpForm } from './useSignUpForm'

interface SignUpFormProps {
  onSuccess?: () => void
}

export function SignUpForm({ onSuccess }: SignUpFormProps) {
  const { form, isLoading, handleSubmit } = useSignUpForm({ onSuccess })

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <SignUpFormFields form={form} isLoading={isLoading} />
    </form>
  )
}
