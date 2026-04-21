import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { ProfileForm } from '@/components/settings'
import { siteLinks } from '@/config'
import { auth } from '@/lib/auth'

export default async function SettingsProfilePage() {
  const headersList = await headers()
  const session = await auth.api.getSession({ headers: headersList })

  if (!session) {
    redirect(siteLinks.auth.signIn)
  }

  return <ProfileForm user={session.user} />
}
