import { render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { MantineWrapper } from '@/test'
import { LanguageSwitch } from './LanguageSwitch'

describe('LanguageSwitch', () => {
  let button: HTMLElement

  beforeEach(() => {
    const { container } = render(<LanguageSwitch />, {
      wrapper: MantineWrapper,
    })
    button = within(container).getByLabelText('Translation')
  })

  it('renders language button with correct aria-label', () => {
    expect(button).toBeInTheDocument()
  })

  it('renders language icon', () => {
    expect(screen.getByTestId('icon-language')).toBeInTheDocument()
  })
})
