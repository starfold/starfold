import { Center, Paper, Stack } from '@mantine/core'
import { sizes } from '@/app/(frontend)/design'
import { AuthHeader } from '@/components/common'
import { siteLinks } from '@/config'
import { SignInForm } from './components'

export default function SignInPage() {
  return (
    <Center mih={'100vh'}>
      <Stack miw={90 * sizes.x1i}>
        <AuthHeader
          title="Welcome back!"
          linkPrefix="New to Starfold?"
          linkText="Create an account"
          linkHref={siteLinks.auth.signUp}
        />
        <Paper p="lg" withBorder>
          <SignInForm />
        </Paper>
      </Stack>
    </Center>
  )
}
