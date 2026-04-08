import { render, within } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { MantineWrapper } from '@/test'
import { ColorSchemeSwitch } from './ColorSchemeSwitch'

describe('ColorSchemeSwitch', () => {
  let container: HTMLElement

  beforeEach(() => {
    container = render(<ColorSchemeSwitch />, {
      wrapper: MantineWrapper,
    }).container
  })

  it('renders segmented control with aria-label', () => {
    const segmentedControl = within(container).getByLabelText(
      'Select color scheme'
    )
    expect(segmentedControl).toBeInTheDocument()
  })

  it('renders three options: light, dark, and auto', () => {
    expect(container.querySelectorAll('input')).toHaveLength(3)
  })

  it('renders icons for each color scheme option', () => {
    const svgs = container.querySelectorAll('svg')
    expect(svgs).toHaveLength(3)

    // Check for specific icons by their paths
    const html = container.innerHTML
    expect(html).toContain('tabler-icon-sun')
    expect(html).toContain('tabler-icon-moon')
    expect(html).toContain('tabler-icon-device-desktop')
  })

  it('renders Tooltip components wrapping each icon', () => {
    // Mantine Tooltip uses Floating UI and renders lazily on hover
    // We verify Tooltip is wrapping each icon by checking for Center wrapper
    const html = container.innerHTML

    // Tooltip wraps icons in mantine-Center component
    expect(html).toContain('mantine-Center-root')

    // Verify 3 iconwrappers exist (one for each option inside Tooltip)
    const centerRoots = html.match(/mantine-Center-root/g)
    expect(centerRoots).toHaveLength(3)
  })
})
