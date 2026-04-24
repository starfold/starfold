import { siteLinks } from '@/config'

/**
 * Validates a redirect URL to prevent open redirect vulnerabilities.
 *
 * Only allows relative paths starting with '/' (but not protocol-relative '//').
 * Falls back to the landing page for invalid or missing values.
 */
export function getSafeRedirectUrl(redirect: string | null): string {
  if (redirect?.startsWith('/') && !redirect.startsWith('//')) {
    return redirect
  }
  return siteLinks.landing
}
