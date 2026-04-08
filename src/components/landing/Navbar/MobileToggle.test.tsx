import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { MantineWrapper } from '@/test'
import { MobileToggle } from './MobileToggle'

describe('MobileToggle', () => {
  const onToggle = vi.fn()

  beforeEach(() => {
    onToggle.mockClear()
  })

  it('renders toggle button', () => {
    render(<MobileToggle opened={false} onToggle={onToggle} />, {
      wrapper: MantineWrapper,
    })
    expect(screen.getByLabelText('Toggle navigation')).toBeInTheDocument()
  })

  it('shows chevron down icon when closed', () => {
    render(<MobileToggle opened={false} onToggle={onToggle} />, {
      wrapper: MantineWrapper,
    })
    expect(screen.getByTestId('icon-chevron-down')).toBeInTheDocument()
    expect(screen.queryByTestId('icon-chevron-up')).not.toBeInTheDocument()
  })

  it('shows chevron up icon when opened', () => {
    render(<MobileToggle opened={true} onToggle={onToggle} />, {
      wrapper: MantineWrapper,
    })
    expect(screen.getByTestId('icon-chevron-up')).toBeInTheDocument()
    expect(screen.queryByTestId('icon-chevron-down')).not.toBeInTheDocument()
  })

  it('calls onToggle when clicked', () => {
    render(<MobileToggle opened={false} onToggle={onToggle} />, {
      wrapper: MantineWrapper,
    })
    screen.getByLabelText('Toggle navigation').click()
    expect(onToggle).toHaveBeenCalledTimes(1)
  })
})
