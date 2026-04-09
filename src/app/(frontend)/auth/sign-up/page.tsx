import { Center, Paper, Stack } from '@mantine/core'
import { sizes } from '@/app/(frontend)/design'
import { SignUpForm, SignUpHeader } from './components'

export default function SignUpPage() {
  return (
    <Center mih={'100vh'}>
      <Stack miw={90 * sizes.x1i}>
        <SignUpHeader />
        <Paper p="lg" withBorder>
          <SignUpForm />
        </Paper>
      </Stack>
    </Center>
  )
}
