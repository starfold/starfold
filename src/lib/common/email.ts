export function getResetPasswordEmailTemplates(url: string) {
  return {
    html: `
      <p>Click the link below to reset your password:</p>
      <a href="${url}">Reset Password</a>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `,
    text: `Reset your password: ${url}\n\nThis link will expire in 1 hour.`,
  }
}
