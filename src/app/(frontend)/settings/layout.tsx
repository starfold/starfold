import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Navbar } from '@/components/landing'
import { SettingsShell } from '@/components/settings'
import { siteLinks } from '@/config'
import { auth } from '@/lib/auth'

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const session = await auth.api.getSession({ headers: headersList })

  if (!session) {
    redirect(siteLinks.auth.signIn)
  }

  return (
    <>
      <Navbar user={session.user} />
      <SettingsShell>{children}</SettingsShell>
    </>
  )
}
