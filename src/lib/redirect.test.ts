import { describe, expect, it } from 'vitest'

import { getSafeRedirectUrl } from './redirect'

describe('getSafeRedirectUrl', () => {
  it('returns redirect URL for valid relative paths', () => {
    expect(getSafeRedirectUrl('/dashboard')).toBe('/dashboard')
    expect(getSafeRedirectUrl('/settings/account')).toBe('/settings/account')
  })

  it('returns landing page for null redirect', () => {
    expect(getSafeRedirectUrl(null)).toBe('/')
  })

  it('returns landing page for empty redirect', () => {
    expect(getSafeRedirectUrl('')).toBe('/')
  })

  it('returns landing page for external URLs', () => {
    expect(getSafeRedirectUrl('https://evil.com')).toBe('/')
    expect(getSafeRedirectUrl('http://evil.com')).toBe('/')
  })

  it('returns landing page for protocol-relative URLs', () => {
    expect(getSafeRedirectUrl('//evil.com')).toBe('/')
  })
})
