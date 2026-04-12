'use client'

import { notifications } from '@mantine/notifications'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { siteLinks } from '@/config'
import { authClient } from '@/lib/auth-client'

interface UseSignOutReturn {
  isSigningOut: boolean
  signOut: () => Promise<void>
}

export function useSignOut(): UseSignOutReturn {
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const signOut = async () => {
    setIsSigningOut(true)
    const startTime = Date.now()
    try {
      await authClient.signOut()
      const elapsed = Date.now() - startTime
      const minDelay = 2000
      if (elapsed < minDelay) {
        await new Promise((resolve) => setTimeout(resolve, minDelay - elapsed))
      }
      setIsSigningOut(false)
      router.push(siteLinks.auth.signIn)
    } catch (_error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to sign out',
        color: 'red',
      })
      setIsSigningOut(false)
    }
  }

  return {
    isSigningOut,
    signOut,
  }
}
