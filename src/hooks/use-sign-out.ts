'use client'

import { notifications } from '@mantine/notifications'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { siteLinks } from '@/config'
import { authClient } from '@/lib/client'

interface UseSignOutReturn {
  isSigningOut: boolean
  signOut: () => Promise<void>
}

export function useSignOut(): UseSignOutReturn {
  const router = useRouter()
  const pathname = usePathname()
  const [isSigningOut, setIsSigningOut] = useState(false)

  useEffect(() => {
    // only reset signing out state if we're on the sign-in page, otherwise it
    // will cause a flash of the sign-out overlay if the user manually navigates
    // to another page while signing out
    if (isSigningOut && pathname === siteLinks.auth.signIn) {
      setIsSigningOut(false)
    }
  }, [pathname, isSigningOut])

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
