import { describe, expect, it } from 'vitest'
import { signUpSchema } from './signUpSchema'

describe('signUpSchema', () => {
  describe('name validation', () => {
    it('accepts name with at least 2 characters', () => {
      const result = signUpSchema.safeParse({
        name: 'John',
        email: 'test@example.com',
        password: 'password123',
      })
      expect(result.success).toBe(true)
    })

    it('rejects name with less than 2 characters', () => {
      const result = signUpSchema.safeParse({
        name: 'J',
        email: 'test@example.com',
        password: 'password123',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'Name must be at least 2 characters'
        )
      }
    })

    it('rejects empty name', () => {
      const result = signUpSchema.safeParse({
        name: '',
        email: 'test@example.com',
        password: 'password123',
      })
      expect(result.success).toBe(false)
    })
  })

  describe('email validation', () => {
    it('accepts valid email', () => {
      const result = signUpSchema.safeParse({
        name: 'John',
        email: 'test@example.com',
        password: 'password123',
      })
      expect(result.success).toBe(true)
    })

    it('rejects invalid email format', () => {
      const result = signUpSchema.safeParse({
        name: 'John',
        email: 'invalid-email',
        password: 'password123',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid email')
      }
    })

    it('rejects empty email', () => {
      const result = signUpSchema.safeParse({
        name: 'John',
        email: '',
        password: 'password123',
      })
      expect(result.success).toBe(false)
    })
  })

  describe('password validation', () => {
    it('accepts password with at least 8 characters', () => {
      const result = signUpSchema.safeParse({
        name: 'John',
        email: 'test@example.com',
        password: 'password123',
      })
      expect(result.success).toBe(true)
    })

    it('rejects password with less than 8 characters', () => {
      const result = signUpSchema.safeParse({
        name: 'John',
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
      const result = signUpSchema.safeParse({
        name: 'John',
        email: 'test@example.com',
        password: '',
      })
      expect(result.success).toBe(false)
    })
  })

  describe('complete form validation', () => {
    it('accepts valid form data', () => {
      const result = signUpSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'securepassword',
      })
      expect(result.success).toBe(true)
    })

    it('rejects when multiple fields are invalid', () => {
      const result = signUpSchema.safeParse({
        name: 'J',
        email: 'not-an-email',
        password: 'short',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(1)
      }
    })
  })
})
