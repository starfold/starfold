import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MantineWrapper } from '@/test'
import { SettingsNavLink, SettingsShell } from './SettingsShell'

const mockUsePathname = vi.fn()

vi.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}))

describe('SettingsNavLink', () => {
  it('renders a link with the given label and href', () => {
    mockUsePathname.mockReturnValue('/other')

    render(
      <SettingsNavLink
        href="/settings"
        label="Profile"
        icon={<span data-testid="user-icon" />}
      />,
      { wrapper: MantineWrapper }
    )

    const link = screen.getByRole('link', { name: 'Profile' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/settings')
  })

  it('marks the link as active when pathname matches href', () => {
    mockUsePathname.mockReturnValue('/settings')

    render(
      <SettingsNavLink
        href="/settings"
        label="Profile"
        icon={<span data-testid="user-icon" />}
      />,
      { wrapper: MantineWrapper }
    )

    const link = screen.getByRole('link', { name: 'Profile' })
    expect(link).toHaveAttribute('data-active')
  })

  it('does not mark the link as active when pathname differs', () => {
    mockUsePathname.mockReturnValue('/settings/account')

    render(
      <SettingsNavLink
        href="/settings"
        label="Profile"
        icon={<span data-testid="user-icon" />}
      />,
      { wrapper: MantineWrapper }
    )

    const link = screen.getByRole('link', { name: 'Profile' })
    expect(link).not.toHaveAttribute('data-active')
  })
})

describe('SettingsShell', () => {
  it('renders Settings title', () => {
    mockUsePathname.mockReturnValue('/settings')

    render(
      <SettingsShell>
        <div data-testid="content">Profile Content</div>
      </SettingsShell>,
      { wrapper: MantineWrapper }
    )

    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByTestId('content')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    mockUsePathname.mockReturnValue('/settings')

    render(
      <SettingsShell>
        <div>Content</div>
      </SettingsShell>,
      { wrapper: MantineWrapper }
    )

    expect(screen.getByRole('link', { name: 'Profile' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Account' })).toBeInTheDocument()
  })

  it('marks Profile as active on /settings', () => {
    mockUsePathname.mockReturnValue('/settings')

    render(
      <SettingsShell>
        <div>Content</div>
      </SettingsShell>,
      { wrapper: MantineWrapper }
    )

    const profileLink = screen.getByRole('link', { name: 'Profile' })
    expect(profileLink).toHaveAttribute('href', '/settings')
    expect(profileLink).toHaveAttribute('data-active')
  })

  it('marks Account as active on /settings/account', () => {
    mockUsePathname.mockReturnValue('/settings/account')

    render(
      <SettingsShell>
        <div>Content</div>
      </SettingsShell>,
      { wrapper: MantineWrapper }
    )

    const accountLink = screen.getByRole('link', { name: 'Account' })
    expect(accountLink).toHaveAttribute('href', '/settings/account')
    expect(accountLink).toHaveAttribute('data-active')
  })
})
