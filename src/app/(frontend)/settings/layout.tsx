import { Navbar } from '@/components/landing'
import { SettingsShell } from '@/components/settings'
import { verifySession } from '@/lib/dal'

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await verifySession()

  return (
    <>
      <Navbar user={session.user} />
      <SettingsShell>{children}</SettingsShell>
    </>
  )
}
