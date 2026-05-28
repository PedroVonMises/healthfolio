import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import React from 'react'

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

// Mock server action module
vi.mock('@/app/actions/contact', () => ({
  submitContactForm: vi.fn(),
}))

// Track the useActionState mock state
let mockActionState = { status: 'idle' as string }
let mockIsPending = false
const mockFormAction = vi.fn()

vi.mock('react', async () => {
  const actual = await vi.importActual<typeof import('react')>('react')
  return {
    ...actual,
    useActionState: () => [mockActionState, mockFormAction, mockIsPending],
  }
})

// Mock FadeIn
vi.mock('@/components/ui/FadeIn', () => ({
  default: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
    const { delay, direction, fullWidth, ...validProps } = props as Record<string, unknown>;
    return <div {...validProps}>{children}</div>;
  },
}))

describe('ContactForm Integration', () => {
  beforeEach(() => {
    mockActionState = { status: 'idle' }
    mockIsPending = false
    vi.clearAllMocks()
  })

  it('exibe todos os campos de formulário com labels corretas', async () => {
    const { default: ContactForm } = await import('@/components/sections/Contact')
    render(<ContactForm />)
    
    const emailInput = screen.getByLabelText(/e-mail/i)
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(emailInput).toHaveAttribute('required')
    
    const nameInput = screen.getByLabelText(/nome/i)
    expect(nameInput).toHaveAttribute('type', 'text')
    expect(nameInput).toHaveAttribute('required')
    
    const messageInput = screen.getByLabelText(/travando/i)
    expect(messageInput.tagName.toLowerCase()).toBe('textarea')
    expect(messageInput).toHaveAttribute('required')
  })

  it('campo e-mail aceita entrada do usuário', async () => {
    const { default: ContactForm } = await import('@/components/sections/Contact')
    render(<ContactForm />)
    
    const emailInput = screen.getByLabelText(/e-mail/i)
    fireEvent.change(emailInput, { target: { value: 'invalido' } })
    expect(emailInput).toHaveValue('invalido')
  })
  
  it('desabilita botão de submit durante envio (isPending)', async () => {
    mockIsPending = true
    
    const { default: ContactForm } = await import('@/components/sections/Contact')
    render(<ContactForm />)
    
    const submitButton = screen.getByRole('button', { name: /enviando/i })
    expect(submitButton).toBeDisabled()
  })

  it('campo company é opcional (sem required)', async () => {
    const { default: ContactForm } = await import('@/components/sections/Contact')
    render(<ContactForm />)
    
    const companyInput = screen.getByLabelText(/Clínica \/ Especialidade/i)
    expect(companyInput).not.toHaveAttribute('required')
  })
})
