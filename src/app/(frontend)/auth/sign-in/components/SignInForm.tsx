'use client'

import { useSignInForm } from '@/app/(frontend)/hooks'
import { SignInFormFields } from './SignInFormFields'

interface SignInFormProps {
  onSuccess?: () => void
}

export function SignInForm({ onSuccess }: SignInFormProps) {
  const { form, isLoading, handleSubmit } = useSignInForm({ onSuccess })

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <SignInFormFields form={form} isLoading={isLoading} />
    </form>
  )
}
