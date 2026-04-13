import {
  fireEvent,
  getByTestId,
  render,
  waitFor,
  within,
} from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { siteLinks } from '@/config'
import { MantineWrapper, verifiedUser } from '@/test'
import { UserMenu } from './UserMenu'

const mockPush = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: vi.fn(() => '/'),
}))

vi.mock('@mantine/notifications', () => ({
  notifications: {
    show: vi.fn(),
  },
}))

vi.mock('@/lib/auth-client', () => ({
  authClient: {
    signOut: vi.fn(),
  },
}))

describe('UserMenu', () => {
  beforeEach(() => {
    mockPush.mockClear()
  })

  describe('avatar rendering', () => {
    it('renders avatar with image when user has image', () => {
      const { container } = render(<UserMenu user={verifiedUser} />, {
        wrapper: MantineWrapper,
      })
      const avatarImage = container.querySelector('.mantine-Avatar-image')
      expect(avatarImage).toBeInTheDocument()
    })

    it('renders avatar with fallback when user has null image', () => {
      const userWithoutImage = { ...verifiedUser, image: null }
      const { container } = render(<UserMenu user={userWithoutImage} />, {
        wrapper: MantineWrapper,
      })
      const avatar = within(container).getByText('V')
      expect(avatar).toBeInTheDocument()
    })

    it('renders avatar with fallback when user image is undefined', () => {
      const userWithUndefinedImage = { ...verifiedUser, image: undefined }
      const { container } = render(<UserMenu user={userWithUndefinedImage} />, {
        wrapper: MantineWrapper,
      })
      const avatar = within(container).getByText('V')
      expect(avatar).toBeInTheDocument()
    })
  })

  describe('Menu component', () => {
    it('renders Menu.Target with aria attributes', () => {
      const { container } = render(<UserMenu user={verifiedUser} />, {
        wrapper: MantineWrapper,
      })
      const target = container.querySelector('[aria-haspopup="menu"]')
      expect(target).toBeInTheDocument()
    })

    it('renders Avatar component with correct root class', () => {
      const { container } = render(<UserMenu user={verifiedUser} />, {
        wrapper: MantineWrapper,
      })
      const avatarRoot = getByTestId(container, 'user-avatar')
      expect(avatarRoot).toBeInTheDocument()
    })

    it('renders user avatar with pointer cursor', () => {
      const { container } = render(<UserMenu user={verifiedUser} />, {
        wrapper: MantineWrapper,
      })
      const avatar = getByTestId(container, 'user-avatar')
      expect(avatar).toHaveStyle({ cursor: 'pointer' })
    })
  })

  describe('menu interactions', () => {
    it('opens menu and renders dropdown items', async () => {
      const { container } = render(<UserMenu user={verifiedUser} />, {
        wrapper: MantineWrapper,
      })

      // Click on the avatar to open the menu
      const avatar = getByTestId(container, 'user-avatar')
      expect(avatar).toBeInTheDocument()
      fireEvent.click(avatar as Element)

      // Wait for the menu dropdown to render in the portal
      await waitFor(() => {
        const dashboardItem = within(document.body).getByText('Dashboard')
        expect(dashboardItem).toBeInTheDocument()
      })

      expect(within(document.body).getByText('Settings')).toBeInTheDocument()
      expect(within(document.body).getByText('Sign Out')).toBeInTheDocument()
      expect(
        within(document.body).getByText(verifiedUser.name)
      ).toBeInTheDocument()
    })

    it('navigates to dashboard when Dashboard menu item is clicked', async () => {
      const { container } = render(<UserMenu user={verifiedUser} />, {
        wrapper: MantineWrapper,
      })

      // Click on the avatar to open the menu
      const avatar = getByTestId(container, 'user-avatar')
      expect(avatar).toBeInTheDocument()
      fireEvent.click(avatar as Element)

      // Wait for the menu dropdown to render and click Dashboard
      const dashboardItem = await waitFor(() =>
        within(document.body).getByText('Dashboard')
      )
      fireEvent.click(dashboardItem)
      expect(mockPush).toHaveBeenCalledWith(siteLinks.dashboard)
    })

    it('navigates to settings when Settings menu item is clicked', async () => {
      const { container } = render(<UserMenu user={verifiedUser} />, {
        wrapper: MantineWrapper,
      })

      // Click on the avatar to open the menu
      const avatar = getByTestId(container, 'user-avatar')

      expect(avatar).toBeInTheDocument()
      fireEvent.click(avatar as Element)

      // Wait for the menu dropdown to render and click Settings
      const settingsItem = await waitFor(() =>
        within(document.body).getByText('Settings')
      )
      fireEvent.click(settingsItem)
      expect(mockPush).toHaveBeenCalledWith(siteLinks.settings)
    })

    it('calls signOut and redirects to sign in when Sign Out is clicked', async () => {
      const { authClient } = await import('@/lib/auth-client')
      vi.mocked(authClient.signOut).mockResolvedValueOnce({} as never)

      const { container } = render(<UserMenu user={verifiedUser} />, {
        wrapper: MantineWrapper,
      })

      // Click on the avatar to open the menu
      const avatar = getByTestId(container, 'user-avatar')
      expect(avatar).toBeInTheDocument()
      fireEvent.click(avatar as Element)

      // Wait for the menu dropdown to render and click Sign Out
      const signOutItem = await waitFor(() =>
        within(document.body).getByText('Sign Out')
      )
      fireEvent.click(signOutItem)

      await waitFor(
        () => {
          expect(authClient.signOut).toHaveBeenCalled()
          expect(mockPush).toHaveBeenCalledWith(siteLinks.auth.signIn)
        },
        { timeout: 3000 }
      )
    })

    it('shows error notification when sign out fails', async () => {
      const { notifications } = await import('@mantine/notifications')
      const { authClient } = await import('@/lib/auth-client')
      vi.mocked(authClient.signOut).mockRejectedValueOnce(new Error('Failed'))

      const { container } = render(<UserMenu user={verifiedUser} />, {
        wrapper: MantineWrapper,
      })

      // Click on the avatar to open the menu
      const avatar = getByTestId(container, 'user-avatar')
      fireEvent.click(avatar as Element)

      // Wait for the menu dropdown to render and click Sign Out
      const signOutItem = await waitFor(() =>
        within(document.body).getByText('Sign Out')
      )
      fireEvent.click(signOutItem)

      await waitFor(() => {
        expect(vi.mocked(notifications.show)).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Error',
            message: 'Failed to sign out',
            color: 'red',
          })
        )
      })
    })
  })
})
