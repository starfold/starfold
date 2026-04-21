'use client'

import type { User } from 'better-auth'
import { useUpdateProfileForm } from '@/hooks'
import { ProfileFormFields } from './ProfileFormFields'

interface ProfileFormProps {
  user: User
}

export function ProfileForm({ user }: ProfileFormProps) {
  const { form, isLoading, handleSubmit } = useUpdateProfileForm({
    initialName: user.name,
  })

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <ProfileFormFields form={form} isLoading={isLoading} email={user.email} />
    </form>
  )
}
