import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import React from 'react'

// Mock framer-motion para testes determinísticos
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual<typeof import('framer-motion')>('framer-motion')
  return {
    ...actual,
    useInView: () => true,
    useMotionValue: (initial: number) => ({
      get: () => initial,
      set: vi.fn(),
      on: vi.fn(),
    }),
    useTransform: (_motionValue: unknown, transform: (v: number) => string) => {
      // For AnimatedNumber, the transform formats as BRL currency
      return typeof transform === 'function' ? transform(0) : '0'
    },
    animate: vi.fn(() => ({ stop: vi.fn() })),
  }
})

// Mock FadeIn para renderização direta dos children
vi.mock('@/components/ui/FadeIn', () => ({
  default: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
    <div {...props}>{children}</div>
  ),
  StaggerContainer: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
    <div {...props}>{children}</div>
  ),
}))

describe('ROICalculator', () => {
  it('renderiza todos os elementos de UI', async () => {
    const { default: ROICalculator } = await import('@/components/sections/ROICalculator')

    render(<ROICalculator />)

    // Título e subtítulo
    expect(screen.getByText('Simulação de Retorno')).toBeInTheDocument()
    expect(screen.getByText('O custo invisível da agenda ociosa')).toBeInTheDocument()

    // Labels dos sliders
    expect(screen.getByText('Consultas por Mês')).toBeInTheDocument()
    expect(screen.getByText('Ticket Médio (R$)')).toBeInTheDocument()

    // Dashboard labels
    expect(screen.getByText('Faturamento Perdido Atual (Mês)')).toBeInTheDocument()
    expect(screen.getByText('Receita Recuperada Estimada')).toBeInTheDocument()
  })

  it('renderiza os sliders com valores padrão', async () => {
    const { default: ROICalculator } = await import('@/components/sections/ROICalculator')

    render(<ROICalculator />)

    // Valor padrão de consultas (500)
    expect(screen.getByText('500 consultas')).toBeInTheDocument()

    // Valor padrão do ticket (R$ 300)
    expect(screen.getByText('R$ 300')).toBeInTheDocument()

    // Sliders devem estar presentes
    const sliders = screen.getAllByRole('slider')
    expect(sliders).toHaveLength(2)

    // Verificar atributos do slider de consultas
    expect(sliders[0]).toHaveAttribute('min', '100')
    expect(sliders[0]).toHaveAttribute('max', '2000')
    expect(sliders[0]).toHaveAttribute('step', '50')
    expect(sliders[0]).toHaveValue('500')

    // Verificar atributos do slider de ticket
    expect(sliders[1]).toHaveAttribute('min', '100')
    expect(sliders[1]).toHaveAttribute('max', '1000')
    expect(sliders[1]).toHaveAttribute('step', '50')
    expect(sliders[1]).toHaveValue('300')
  })

  it('atualiza o display ao mudar o slider de consultas', async () => {
    const { default: ROICalculator } = await import('@/components/sections/ROICalculator')

    render(<ROICalculator />)

    const sliders = screen.getAllByRole('slider')
    const consultasSlider = sliders[0]

    // Mudar consultas para 1000
    fireEvent.change(consultasSlider, { target: { value: '1000' } })

    expect(screen.getByText('1000 consultas')).toBeInTheDocument()
  })

  it('atualiza o display ao mudar o slider de ticket médio', async () => {
    const { default: ROICalculator } = await import('@/components/sections/ROICalculator')

    render(<ROICalculator />)

    const sliders = screen.getAllByRole('slider')
    const ticketSlider = sliders[1]

    // Mudar ticket para 500
    fireEvent.change(ticketSlider, { target: { value: '500' } })

    expect(screen.getByText('R$ 500')).toBeInTheDocument()
  })

  it('renderiza a nota informativa sobre taxa de No-Show', async () => {
    const { default: ROICalculator } = await import('@/components/sections/ROICalculator')

    render(<ROICalculator />)

    expect(
      screen.getByText(/taxa média de 20% de No-Show/i)
    ).toBeInTheDocument()
  })

  it('renderiza o badge de cenário digital', async () => {
    const { default: ROICalculator } = await import('@/components/sections/ROICalculator')

    render(<ROICalculator />)

    expect(screen.getByText('Cenário Digital')).toBeInTheDocument()
  })

  it('possui o id de seção correto para navegação por âncora', async () => {
    const { default: ROICalculator } = await import('@/components/sections/ROICalculator')

    const { container } = render(<ROICalculator />)

    const section = container.querySelector('#calculadora')
    expect(section).toBeInTheDocument()
  })
})
