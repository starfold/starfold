'use client'

import {
  Button,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { sizes } from '@/app/(frontend)/design'
import { Logo } from '@/components/common'
import { siteLinks } from '@/config'
import { authClient } from '@/lib/auth-client'

export default function SignOutPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      await authClient.signOut()
      notifications.show({
        title: 'Success',
        message: 'Signed out successfully!',
        color: 'green',
      })
      router.push(siteLinks.auth.signIn)
    } catch (_error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to sign out',
        color: 'red',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <Container
      size={420}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Paper withBorder p={'lg'}>
        <Stack align="center">
          <Logo height={sizes.x16i} width={sizes.x16i} />
          <Title order={2} ta="center">
            Sign Out
          </Title>
          <Text c="dimmed" ta="center">
            Are you sure you want to sign out?
          </Text>

          <Group justify="center" mt="md">
            <Button
              variant="outline"
              onClick={handleCancel}
              style={{
                borderColor: 'var(--app-border)',
                color: 'var(--app-text)',
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSignOut}
              loading={isLoading}
              style={{
                backgroundColor: 'var(--app-text)',
                color: 'var(--app-bg)',
              }}
            >
              Sign Out
            </Button>
          </Group>
        </Stack>
      </Paper>
    </Container>
  )
}
