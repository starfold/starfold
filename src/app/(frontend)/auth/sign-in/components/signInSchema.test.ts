import { describe, expect, it } from 'vitest'
import { signInSchema } from './signInSchema'

describe('signInSchema', () => {
  describe('email validation', () => {
    it('accepts valid email', () => {
      const result = signInSchema.safeParse({
        email: 'test@example.com',
        password: 'password123',
      })
      expect(result.success).toBe(true)
    })

    it('rejects invalid email format', () => {
      const result = signInSchema.safeParse({
        email: 'invalid-email',
        password: 'password123',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid email')
      }
    })

    it('rejects empty email', () => {
      const result = signInSchema.safeParse({
        email: '',
        password: 'password123',
      })
      expect(result.success).toBe(false)
    })
  })

  describe('password validation', () => {
    it('accepts password with at least 8 characters', () => {
      const result = signInSchema.safeParse({
        email: 'test@example.com',
        password: 'password123',
      })
      expect(result.success).toBe(true)
    })

    it('rejects password with less than 8 characters', () => {
      const result = signInSchema.safeParse({
        email: 'test@example.com',
        password: 'short',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Password must be at least 8 characters'
        )
      }
    })

    it('rejects empty password', () => {
      const result = signInSchema.safeParse({
        email: 'test@example.com',
        password: '',
      })
      expect(result.success).toBe(false)
    })
  })

  describe('complete form validation', () => {
    it('accepts valid email and password', () => {
      const result = signInSchema.safeParse({
        email: 'user@domain.com',
        password: 'securepassword',
      })
      expect(result.success).toBe(true)
    })

    it('rejects when both fields are invalid', () => {
      const result = signInSchema.safeParse({
        email: 'not-an-email',
        password: 'short',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toHaveLength(2)
      }
    })
  })
})
