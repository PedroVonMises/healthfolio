import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import React from 'react'

// Mock framer-motion para testes determinísticos
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual<typeof import('framer-motion')>('framer-motion')
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  }
})

describe('ThemeToggle', () => {
  let localStorageMock: Record<string, string>

  beforeEach(() => {
    // Reset localStorage mock
    localStorageMock = {}
    vi.stubGlobal('localStorage', {
      getItem: vi.fn((key: string) => localStorageMock[key] ?? null),
      setItem: vi.fn((key: string, value: string) => {
        localStorageMock[key] = value
      }),
      removeItem: vi.fn((key: string) => {
        delete localStorageMock[key]
      }),
    })

    // Reset document.documentElement attributes
    document.documentElement.removeAttribute('data-theme')
  })

  it('renderiza após montagem (placeholder → botão)', async () => {
    const { default: ThemeToggle } = await import('@/components/ui/ThemeToggle')

    const { container } = render(<ThemeToggle />)

    // Após mount, deve haver um botão com aria-label
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-label')
  })

  it('inicia em tema light quando não há preferência salva', async () => {
    const { default: ThemeToggle } = await import('@/components/ui/ThemeToggle')

    render(<ThemeToggle />)

    const button = screen.getByRole('button')
    // No tema light, aria-label deve indicar "Mudar para tema escuro"
    expect(button).toHaveAttribute('aria-label', 'Mudar para tema escuro')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('toggle muda data-theme e persiste em localStorage', async () => {
    const { default: ThemeToggle } = await import('@/components/ui/ThemeToggle')

    render(<ThemeToggle />)

    const button = screen.getByRole('button')

    // Click para mudar para dark
    await act(async () => {
      fireEvent.click(button)
    })

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark')

    // aria-label deve atualizar
    expect(button).toHaveAttribute('aria-label', 'Mudar para tema claro')
  })

  it('respeita tema dark salvo em localStorage', async () => {
    localStorageMock['theme'] = 'dark'

    // Re-import com estado limpo
    vi.resetModules()

    // Re-mock framer-motion after resetModules
    vi.doMock('framer-motion', async () => {
      const actual = await vi.importActual<typeof import('framer-motion')>('framer-motion')
      return {
        ...actual,
        AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
      }
    })

    const { default: ThemeToggle } = await import('@/components/ui/ThemeToggle')

    render(<ThemeToggle />)

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Mudar para tema claro')
  })

  it('toggle duplo retorna ao tema original', async () => {
    const { default: ThemeToggle } = await import('@/components/ui/ThemeToggle')

    render(<ThemeToggle />)

    const button = screen.getByRole('button')

    // Light → Dark
    await act(async () => {
      fireEvent.click(button)
    })
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')

    // Dark → Light
    await act(async () => {
      fireEvent.click(button)
    })
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    expect(button).toHaveAttribute('aria-label', 'Mudar para tema escuro')
  })

  it('possui atributo data-theme-toggle para seletores E2E', async () => {
    const { default: ThemeToggle } = await import('@/components/ui/ThemeToggle')

    render(<ThemeToggle />)

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('data-theme-toggle')
  })
})
