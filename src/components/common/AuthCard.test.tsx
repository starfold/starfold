import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MantineWrapper } from '@/test'
import { AuthCard } from './AuthCard'

describe('AuthCard', () => {
  it('renders header prop', () => {
    render(
      <AuthCard header={<div>Custom Header</div>}>
        <div>Form Content</div>
      </AuthCard>,
      { wrapper: MantineWrapper }
    )
    expect(screen.getByText('Custom Header')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(
      <AuthCard header={<div>Header</div>}>
        <div>Form Content</div>
      </AuthCard>,
      { wrapper: MantineWrapper }
    )
    expect(screen.getByText('Form Content')).toBeInTheDocument()
  })

  it('renders with AuthHeader component', () => {
    render(
      <AuthCard
        header={
          <div>
            <h1>Sign in</h1>
          </div>
        }
      >
        <form>Login Form</form>
      </AuthCard>,
      { wrapper: MantineWrapper }
    )
    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument()
    expect(screen.getByText('Login Form')).toBeInTheDocument()
  })

  it('renders with multiple header elements', () => {
    render(
      <AuthCard
        header={
          <div>
            <h1>Title</h1>
            <p>Subtitle</p>
          </div>
        }
      >
        <div>Content</div>
      </AuthCard>,
      { wrapper: MantineWrapper }
    )
    expect(screen.getByRole('heading', { name: 'Title' })).toBeInTheDocument()
    expect(screen.getByText('Subtitle')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders with form as children', () => {
    render(
      <AuthCard header={<div>Header</div>}>
        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
        </form>
      </AuthCard>,
      { wrapper: MantineWrapper }
    )
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
  })
})
