import type { User } from 'better-auth'

export const verifiedUser: User = {
  id: '1',
  name: 'Verified User',
  email: 'verified@example.com',
  emailVerified: true,
  image: 'https://example.com/avatar.jpg',
  createdAt: new Date(),
  updatedAt: new Date(),
}

export const unverifiedUser: User = {
  id: '2',
  name: 'Unverified User',
  email: 'unverified@example.com',
  emailVerified: false,
  image: 'https://example.com/avatar.jpg',
  createdAt: new Date(),
  updatedAt: new Date(),
}
