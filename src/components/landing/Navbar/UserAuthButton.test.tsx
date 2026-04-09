import { render, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MantineWrapper, verifiedUser } from '@/test'
import { UserAuthButton } from './UserAuthButton'

// Mock the dependencies
vi.mock('@/components/common', () => ({
  UserMenu: ({ user }: { user: { name: string; email: string } }) => (
    <div data-testid="user-menu">UserMenu: {user.name}</div>
  ),
}))

vi.mock('./SignInButton', () => ({
  SignInButton: () => <div data-testid="sign-in-button">SignInButton</div>,
}))

describe('UserAuthButton', () => {
  describe('when user is authenticated', () => {
    it('renders UserMenu component', () => {
      const { container } = render(<UserAuthButton user={verifiedUser} />, {
        wrapper: MantineWrapper,
      })
      const userMenu = within(container).getByTestId('user-menu')
      expect(userMenu).toBeInTheDocument()
      expect(userMenu).toHaveTextContent(verifiedUser.name)
    })
  })

  describe('when user is not authenticated', () => {
    it('renders SignInButton component when user is undefined', () => {
      const { container } = render(<UserAuthButton user={undefined} />, {
        wrapper: MantineWrapper,
      })
      const signInButton = within(container).getByTestId('sign-in-button')
      expect(signInButton).toBeInTheDocument()
    })

    it('renders SignInButton component when no user prop is provided', () => {
      const { container } = render(<UserAuthButton />, {
        wrapper: MantineWrapper,
      })
      const signInButton = within(container).getByTestId('sign-in-button')
      expect(signInButton).toBeInTheDocument()
    })
  })
})
