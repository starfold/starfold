import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MantineWrapper } from '@/test'
import { SignOutOverlay } from './SignOutOverlay'

describe('SignOutOverlay', () => {
  it('renders nothing when visible is false', () => {
    render(<SignOutOverlay visible={false} />, {
      wrapper: MantineWrapper,
    })
    // MantineWrapper adds style tags, so check for overlay-specific content
    expect(screen.queryByText('Signing out...')).not.toBeInTheDocument()
  })

  it('renders overlay when visible is true', () => {
    render(<SignOutOverlay visible={true} />, {
      wrapper: MantineWrapper,
    })
    expect(screen.getByText('Signing out...')).toBeInTheDocument()
  })

  it('renders Logo component', () => {
    render(<SignOutOverlay visible={true} />, {
      wrapper: MantineWrapper,
    })
    const logo = screen.getByAltText('Starfold')
    expect(logo).toBeInTheDocument()
  })

  it('renders Loader component', () => {
    render(<SignOutOverlay visible={true} />, {
      wrapper: MantineWrapper,
    })
    const loader = document.querySelector('.mantine-Loader-root')
    expect(loader).toBeInTheDocument()
  })

  it('hides overlay when visible changes to false', () => {
    const { rerender } = render(<SignOutOverlay visible={true} />, {
      wrapper: MantineWrapper,
    })

    expect(screen.getByText('Signing out...')).toBeInTheDocument()

    // Hide overlay
    rerender(<SignOutOverlay visible={false} />)

    // Component should be removed from DOM
    expect(screen.queryByText('Signing out...')).not.toBeInTheDocument()
  })

  it('has fixed positioning', () => {
    render(<SignOutOverlay visible={true} />, {
      wrapper: MantineWrapper,
    })

    const center = document.querySelector('.mantine-Center-root')
    expect(center).toBeInTheDocument()
    // Check for fixed position style
    expect(center).toHaveStyle({ position: 'fixed' })
  })

  it('has centered content layout', () => {
    render(<SignOutOverlay visible={true} />, {
      wrapper: MantineWrapper,
    })

    const stack = document.querySelector('.mantine-Stack-root')
    expect(stack).toBeInTheDocument()
  })
})
