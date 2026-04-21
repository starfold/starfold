'use client'

import { useChangePasswordForm } from '@/hooks'
import { PasswordFormFields } from './PasswordFormFields'

export function PasswordForm() {
  const { form, isLoading, handleSubmit } = useChangePasswordForm()

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <PasswordFormFields form={form} isLoading={isLoading} />
    </form>
  )
}
