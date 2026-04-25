import { headers } from 'next/headers'
import { Hero, Navbar } from '@/components/landing'
import { auth } from '@/lib/server'

export default async function HomePage() {
  const headersList = await headers()
  const session = await auth.api.getSession({ headers: headersList })

  return (
    <>
      <Navbar user={session?.user} landing />
      <Hero />
    </>
  )
}
