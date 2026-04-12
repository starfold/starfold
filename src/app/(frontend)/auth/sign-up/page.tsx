import { Center, Paper, Stack } from '@mantine/core'
import { sizes } from '@/app/(frontend)/design'
import { AuthHeader } from '@/components/common'
import { siteLinks } from '@/config'
import { SignUpForm } from './components'

export default function SignUpPage() {
  return (
    <Center mih={'100vh'}>
      <Stack miw={90 * sizes.x1i}>
        <AuthHeader
          title="Create an account"
          linkPrefix="Already have an account?"
          linkText="Sign in"
          linkHref={siteLinks.auth.signIn}
        />
        <Paper p="lg" withBorder>
          <SignUpForm />
        </Paper>
      </Stack>
    </Center>
  )
}
