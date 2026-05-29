import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { expect, it, describe, vi, beforeEach } from 'vitest'
import React from 'react'

expect.extend(toHaveNoViolations)

// ---------------------------------------------------------------------------
// Mocks globais para todos os testes de acessibilidade
// ---------------------------------------------------------------------------

// Mock next/image → <img> simples para evitar dependência de otimização
vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; sizes?: string; priority?: boolean }) => {
    const { fill, sizes, priority, ...rest } = props
    return <img {...rest} />
  },
}))

// Mock next/link → <a> simples
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

// Mock next/dynamic → renderiza o componente diretamente
vi.mock('next/dynamic', () => ({
  default: (loader: () => Promise<{ default: React.ComponentType }>) => {
    // Return a placeholder for dynamic components like BeforeAfterSlider
    const DynamicMock = (props: Record<string, unknown>) => (
      <div data-testid="dynamic-component" {...props} />
    )
    DynamicMock.displayName = 'DynamicMock'
    return DynamicMock
  },
}))

// Mock nuqs para Projects (useQueryState)
vi.mock('nuqs', () => ({
  useQueryState: (key: string, options?: { defaultValue: string }) => [
    options?.defaultValue ?? 'Todos',
    vi.fn(),
  ],
}))

// Mock server action para Contact
vi.mock('@/app/actions/contact', () => ({
  submitContactForm: vi.fn(),
}))

// Mock useActionState do React para Contact
const mockFormAction = vi.fn()
vi.mock('react', async () => {
  const actual = await vi.importActual<typeof import('react')>('react')
  return {
    ...actual,
    useActionState: () => [{ status: 'idle' }, mockFormAction, false],
  }
})

// Mock SWR para Testimonials
vi.mock('swr', () => ({
  default: () => ({
    data: [
      {
        id: '1',
        quote: 'Depoimento de teste para acessibilidade.',
        author: 'Dr. Teste',
        role: 'Sócio-Diretor',
        avatar: 'T',
      },
    ],
    isLoading: false,
    error: null,
  }),
}))

// ---------------------------------------------------------------------------
// Testes de Acessibilidade — WCAG AA
// ---------------------------------------------------------------------------

describe('Acessibilidade WCAG AA — jest-axe', () => {
  beforeEach(() => {
    // Limpa atributos anteriores do DOM entre testes
    document.body.innerHTML = ''
  })

  it('Hero não tem violações WCAG AA', async () => {
    const { default: HeroSection } = await import('@/components/sections/Hero')
    const { container } = render(<HeroSection />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('Services não tem violações WCAG AA', async () => {
    const { default: Services } = await import('@/components/sections/Services')
    const { container } = render(<Services />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('About não tem violações WCAG AA', async () => {
    // Mock LocalPresenceMap que contém iframe (OpenStreetMap) — axe-core não suporta iframes em jsdom
    vi.doMock('@/components/ui/LocalPresenceMap', () => ({
      default: () => <div data-testid="local-map-mock" aria-label="Mapa de cobertura da Grande Vitória">Mapa</div>,
    }))
    const { default: About } = await import('@/components/sections/About')
    const { container } = render(<About />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    vi.doUnmock('@/components/ui/LocalPresenceMap')
  })

  it('Projects não tem violações WCAG AA', async () => {
    const { default: Projects } = await import('@/components/sections/Projects')
    const { container } = render(<Projects />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('Contact não tem violações WCAG AA', async () => {
    const { default: Contact } = await import('@/components/sections/Contact')
    const { container } = render(<Contact />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('ROICalculator não tem violações WCAG AA', async () => {
    const { default: ROICalculator } = await import('@/components/sections/ROICalculator')
    const { container } = render(<ROICalculator />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('Testimonials não tem violações WCAG AA', async () => {
    const { default: Testimonials } = await import('@/components/sections/Testimonials')
    const { container } = render(<Testimonials />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('Header não tem violações WCAG AA', async () => {
    const { default: Header } = await import('@/components/layout/Header')
    const { container } = render(<Header />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('Footer não tem violações WCAG AA', async () => {
    const { default: Footer } = await import('@/components/layout/Footer')
    const { container } = render(<Footer />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
