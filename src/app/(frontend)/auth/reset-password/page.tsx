import { Center, Loader } from '@mantine/core'
import { Suspense } from 'react'
import { AuthCard, AuthHeader } from '@/components/common'
import { siteLinks } from '@/config'
import { sizes } from '../../design'
import { ResetPasswordForm } from './components'

export default function ResetPasswordPage() {
  return (
    <AuthCard
      header={
        <AuthHeader
          title="Reset password"
          linkPrefix="Remember your password?"
          linkText="Sign in"
          linkHref={siteLinks.auth.signIn}
        />
      }
    >
      <Suspense
        fallback={
          <Center h={60 * sizes.x1i}>
            <Loader color="dark" type="dots" />
          </Center>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </AuthCard>
  )
}
