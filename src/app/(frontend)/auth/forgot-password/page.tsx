import { AuthCard, AuthHeader } from '@/components/common'
import { siteLinks } from '@/config'
import { ForgotPasswordForm } from './components'

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      header={
        <AuthHeader
          title="Forgot password?"
          linkPrefix="Remember your password?"
          linkText="Sign in"
          linkHref={siteLinks.auth.signIn}
        />
      }
    >
      <ForgotPasswordForm />
    </AuthCard>
  )
}
