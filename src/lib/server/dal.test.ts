import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock server-only before importing the module under test
vi.mock('server-only', () => ({}))

vi.mock('next/headers', () => ({
  headers: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}))

vi.mock('./auth', () => ({
  auth: {
    api: {
      getSession: vi.fn(),
    },
  },
}))

vi.mock('@/config', () => ({
  siteLinks: {
    landing: '/',
    auth: {
      signIn: '/auth/sign-in',
    },
  },
}))

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from './auth'
import { verifySession } from './dal'

const mockHeaders = new Headers()

function createMockSession() {
  return {
    session: {
      id: 'sess_123',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 'user_123',
      expiresAt: new Date(Date.now() + 3600_000),
      token: 'token_abc',
    },
    user: {
      id: 'user_123',
      createdAt: new Date(),
      updatedAt: new Date(),
      email: 'test@example.com',
      emailVerified: true,
      name: 'Test User',
    },
  }
}

describe('verifySession', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockHeaders.delete('next-url')
    mockHeaders.delete('referer')
    vi.mocked(headers).mockResolvedValue(mockHeaders)
  })

  it('returns the session when the user is authenticated', async () => {
    const mockSession = createMockSession()
    vi.mocked(auth.api.getSession).mockResolvedValue(mockSession)

    const session = await verifySession()

    expect(session).toBe(mockSession)
    expect(auth.api.getSession).toHaveBeenCalledTimes(1)
    expect(auth.api.getSession).toHaveBeenCalledWith({ headers: mockHeaders })
  })

  it('redirects to sign-in when the session is missing', async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue(null)

    await verifySession()

    expect(redirect).toHaveBeenCalledTimes(1)
    expect(redirect).toHaveBeenCalledWith('/auth/sign-in?redirect=%2F')
  })

  it('redirects to sign-in when the session is undefined', async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue(
      undefined as unknown as null
    )

    await verifySession()

    expect(redirect).toHaveBeenCalledTimes(1)
    expect(redirect).toHaveBeenCalledWith('/auth/sign-in?redirect=%2F')
  })

  it('includes the current path in redirect param when next-url header is present', async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue(null)
    mockHeaders.set('next-url', 'http://localhost:3000/settings')

    await verifySession()

    expect(redirect).toHaveBeenCalledTimes(1)
    expect(redirect).toHaveBeenCalledWith('/auth/sign-in?redirect=%2Fsettings')
  })

  it('includes the current path in redirect param when referer header is present', async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue(null)
    mockHeaders.set('referer', 'http://localhost:3000/dashboard')

    await verifySession()

    expect(redirect).toHaveBeenCalledTimes(1)
    expect(redirect).toHaveBeenCalledWith('/auth/sign-in?redirect=%2Fdashboard')
  })
})

describe('verifySession caching', () => {
  it('is wrapped with React.cache()', async () => {
    const cacheFn = vi.fn((fn) => fn)

    // Reset module registry so we can re-import dal.ts with a mocked react/cache
    vi.resetModules()

    vi.doMock('react', async () => {
      const actual = await vi.importActual<typeof import('react')>('react')
      return { ...actual, cache: cacheFn }
    })

    // Re-mock dependencies cleared by resetModules
    vi.doMock('server-only', () => ({}))
    vi.doMock('next/headers', () => ({ headers: vi.fn() }))
    vi.doMock('next/navigation', () => ({ redirect: vi.fn() }))
    vi.doMock('@/lib/auth', () => ({
      auth: { api: { getSession: vi.fn() } },
    }))
    vi.doMock('@/config', () => ({
      siteLinks: { auth: { signIn: '/auth/sign-in' } },
    }))

    await import('./dal')

    expect(cacheFn).toHaveBeenCalledTimes(1)
    expect(cacheFn).toHaveBeenCalledWith(expect.any(Function))
  })
})
