import { Center, Paper, Stack } from '@mantine/core'
import { sizes } from '@/app/(frontend)/design'
import { SignInForm, SignInHeader } from './components'

export default function SignInPage() {
  return (
    <Center mih={'100vh'}>
      <Stack miw={90 * sizes.x1i}>
        <SignInHeader />
        <Paper p="lg" withBorder>
          <SignInForm />
        </Paper>
      </Stack>
    </Center>
  )
}
