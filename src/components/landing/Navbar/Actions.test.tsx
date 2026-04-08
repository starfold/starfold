import { render, within } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { MantineWrapper } from '@/test'
import { Actions } from './Actions'

describe('Actions', () => {
  let container: HTMLElement

  beforeEach(() => {
    const result = render(<Actions mode="desktop" />, {
      wrapper: MantineWrapper,
    })
    container = result.container
  })

  it('renders color scheme segmented control', () => {
    const segmentedControl = within(container).getByLabelText(
      'Select color scheme'
    )
    expect(segmentedControl).toBeInTheDocument()
  })

  it('renders GitHub link button', () => {
    const githubButton = within(container).getByTestId('icon-github')
    expect(githubButton).toBeInTheDocument()
  })

  it('renders language switch button', () => {
    const languageButton = within(container).getByTestId('icon-language')
    expect(languageButton).toBeInTheDocument()
  })
})
