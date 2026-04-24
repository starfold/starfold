import { ProfileForm } from '@/components/settings'
import { verifySession } from '@/lib/dal'

export default async function SettingsProfilePage() {
  const session = await verifySession()

  return <ProfileForm user={session.user} />
}
