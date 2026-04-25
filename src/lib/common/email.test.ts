import { describe, expect, it } from 'vitest'
import { getResetPasswordEmailTemplates } from './email'

describe('getResetPasswordEmailTemplates', () => {
  it('includes the provided URL in the HTML reset link', () => {
    const url = 'https://example.com/reset?token=abc123'
    const { html } = getResetPasswordEmailTemplates(url)

    expect(html).toContain('Click the link below to reset your password')
    expect(html).toContain(`href="${url}"`)
    expect(html).toContain('>Reset Password<')
    expect(html).toContain('This link will expire in 1 hour.')
    expect(html).toContain(
      "If you didn't request this, please ignore this email."
    )
  })

  it('returns the expected plain-text template', () => {
    const url = 'https://example.com/reset?token=abc123'
    const { text } = getResetPasswordEmailTemplates(url)

    expect(text).toBe(
      `Reset your password: ${url}\n\nThis link will expire in 1 hour.`
    )
  })

  it('handles URLs that include special characters', () => {
    const url = 'https://example.com/reset?token=a-b_c~d&e=1%202'
    const { html, text } = getResetPasswordEmailTemplates(url)

    expect(html).toContain(`href="${url}"`)
    expect(text).toContain(url)
  })
})
