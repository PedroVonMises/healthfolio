# Framer Motion — Tarefas de Nível Pleno
> Backlog de implementação para o agente de IA executar no projeto **healthfolio**.  
> Fonte de verdade: `CLAUDE.md`. Todas as tarefas seguem os padrões de arquitetura,
> design system, testes e CI/CD definidos nesse arquivo.

---

## Contexto

O portfólio já possui Framer Motion `^12.38.0` instalado e usa as features básicas
(`FadeIn`, `AnimatePresence` no menu mobile, `useScroll` no header, `MagneticButton`,
`useSpring` no ROICalculator). O objetivo deste backlog é adicionar as features
que diferenciam um desenvolvedor **pleno** de um júnior em entrevistas técnicas,
priorizando impacto alto com esforço baixo/médio.

**Regras gerais para todas as tarefas:**
- TypeScript `strict: true` — sem `any`
- Preferir Server Components; `"use client"` apenas onde há interatividade com FM
- Tokens CSS do design system (`--color-*`, `--space-*`, `--radius-*`) — zero valores hardcoded
- Criar ou atualizar testes para cada novo componente (Vitest + Testing Library)
- Verificar WCAG AA após cada entrega
- Branch: `feat/framer-motion-<nome-feature>`
- Checklist do CLAUDE.md antes de cada PR

---

## TAREFA 1 — `MotionConfig` global com `reducedMotion: "user"` ⬜

**Prioridade:** Alta | **Esforço:** Muito baixo (≈ 15 min) | **Impacto:** ⭐⭐⭐⭐

### O que fazer

Envolver o layout raiz com `<MotionConfig>` para que **todo** `motion.*` do projeto
respeite automaticamente `prefers-reduced-motion` do sistema operacional do usuário.

### Arquivo alvo

`app/layout.tsx`

### Implementação

```tsx
// app/layout.tsx
import { MotionConfig } from 'framer-motion'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <MotionConfig reducedMotion="user">
          {children}
        </MotionConfig>
      </body>
    </html>
  )
}
```

### Observação

`reducedMotion="user"` desativa automaticamente todas as animações quando o usuário
tem `prefers-reduced-motion: reduce` no SO — sem precisar checar em cada componente.
Complementa o `@media (prefers-reduced-motion: reduce)` já no `base.css`.

### Testes obrigatórios

```typescript
// tests/integration/MotionConfig.test.tsx
// Verificar que MotionConfig está presente no layout raiz
// (mock de matchMedia com prefers-reduced-motion: reduce e checar que variants
// não disparam animações — ou snapshot do componente)
```

### Checklist

- [ ] `MotionConfig` importado de `framer-motion`
- [ ] Envolvendo o `body` inteiro, não seções individuais
- [ ] Teste de integração criado
- [ ] `pnpm typecheck` sem erros
- [ ] `pnpm lint` sem warnings

---

## TAREFA 2 — `staggerChildren` + `whileInView` nas seções ⬜

**Prioridade:** Alta | **Esforço:** Baixo (≈ 45 min) | **Impacto:** ⭐⭐⭐⭐⭐

### O que fazer

Substituir o wrapper genérico `FadeIn` nas seções de lista por um padrão declarativo
com `variants` orquestrados via `staggerChildren`. Aplicar primeiro em
`TechStack.tsx` e `components/sections/Diferenciais` (ou equivalente), depois replicar
nas demais seções de cards.

### Arquivo alvo

`components/sections/TechStack.tsx` (e outras seções de lista)

### Implementação

```tsx
// components/ui/StaggerList.tsx
"use client"

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1], // cubic-bezier idêntico ao --transition-interactive do design system
    },
  },
}

interface StaggerListProps {
  children: ReactNode
  className?: string
  /** Margem de disparo antes do elemento entrar na viewport */
  margin?: string
}

export function StaggerList({ children, className, margin = '-80px' }: StaggerListProps) {
  return (
    <motion.ul
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin }}
    >
      {children}
    </motion.ul>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.li className={className} variants={itemVariants}>
      {children}
    </motion.li>
  )
}
```

```tsx
// Uso em TechStack.tsx
import { StaggerList, StaggerItem } from '@/components/ui/StaggerList'

// Substituir mapeamento existente por:
<StaggerList className="grid grid-cols-3 gap-[var(--space-4)] md:grid-cols-6">
  {techs.map((tech) => (
    <StaggerItem key={tech.name}>
      <TechCard tech={tech} />
    </StaggerItem>
  ))}
</StaggerList>
```

### Testes obrigatórios

```typescript
// tests/integration/StaggerList.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { StaggerList, StaggerItem } from '@/components/ui/StaggerList'

describe('StaggerList', () => {
  it('renderiza todos os filhos', () => {
    render(
      <StaggerList>
        <StaggerItem>Item 1</StaggerItem>
        <StaggerItem>Item 2</StaggerItem>
      </StaggerList>
    )
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('não tem violações WCAG', async () => {
    const { container } = render(
      <StaggerList>
        <StaggerItem>Item</StaggerItem>
      </StaggerList>
    )
    const { axe, toHaveNoViolations } = await import('jest-axe')
    expect.extend(toHaveNoViolations)
    expect(await axe(container)).toHaveNoViolations()
  })
})
```

### Checklist

- [ ] `StaggerList.tsx` e `StaggerItem.tsx` criados em `components/ui/`
- [ ] `"use client"` declarado (FM é client-side)
- [ ] `viewport={{ once: true }}` — anima apenas na primeira vez que entra na tela
- [ ] `ease` usando o mesmo cubic-bezier do `--transition-interactive` do design system
- [ ] Aplicado em `TechStack.tsx` e ao menos 1 outra seção
- [ ] Testes criados e passando
- [ ] `pnpm typecheck` sem erros

---

## TAREFA 3 — `layout` prop + `AnimatePresence` em lista com filtro ⬜

**Prioridade:** Alta | **Esforço:** Médio (≈ 1,5h) | **Impacto:** ⭐⭐⭐⭐⭐

### O que fazer

Adicionar filtro por categoria/especialidade nos cards de serviços (ou projetos),
com transições suaves quando itens entram e saem usando `layout` prop e
`AnimatePresence` com `mode="popLayout"`. Esta é a feature mais verificada por
recrutadores em portfólios de nível pleno.

### Arquivo alvo

`components/sections/Projetos.tsx` (ou seção de serviços/especialidades, se existir)

### Implementação

```tsx
// components/sections/Projetos.tsx
"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CATEGORIAS = ['Todos', 'Portal Paciente', 'Dashboard', 'Agendamento'] as const
type Categoria = (typeof CATEGORIAS)[number]

export function Projetos({ projetos }: { projetos: Projeto[] }) {
  const [categoria, setCategoria] = useState<Categoria>('Todos')

  const filtrados = categoria === 'Todos'
    ? projetos
    : projetos.filter((p) => p.categoria === categoria)

  return (
    <section id="projetos" aria-labelledby="projetos-heading">
      {/* Filtros */}
      <div role="group" aria-label="Filtrar projetos por categoria">
        {CATEGORIAS.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoria(cat)}
            aria-pressed={categoria === cat}
            className={/* tokens do design system */}
          >
            {cat}
            {/* Indicador ativo com layoutId para transição suave entre botões */}
            {categoria === cat && (
              <motion.span
                layoutId="categoria-ativa"
                className="absolute inset-0 rounded-[var(--radius-full)] bg-[var(--color-primary)]"
                style={{ zIndex: -1 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Grid de cards com AnimatePresence */}
      <motion.ul
        layout
        className="grid grid-cols-1 gap-[var(--space-6)] md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtrados.map((projeto) => (
            <motion.li
              key={projeto.slug}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjetoCard projeto={projeto} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </section>
  )
}
```

### Observações técnicas

- `mode="popLayout"` é preferível a `mode="wait"` para listas — remove o item
  do fluxo imediatamente antes de animar, evitando saltos de layout.
- A `motion.span` com `layoutId="categoria-ativa"` cria a animação de "pill deslizante"
  nos filtros — feature de detalhe que impressiona revisores.
- `layout` no `motion.ul` pai garante que o grid se reorganiza suavemente.

### Testes obrigatórios

```typescript
// tests/integration/Projetos.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Projetos } from '@/components/sections/Projetos'
import { mockProjetos } from '@/tests/mocks/projetos'

describe('Projetos — filtro com AnimatePresence', () => {
  it('exibe todos os projetos por padrão', () => {
    render(<Projetos projetos={mockProjetos} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(mockProjetos.length)
  })

  it('filtra corretamente ao clicar em categoria', async () => {
    render(<Projetos projetos={mockProjetos} />)
    fireEvent.click(screen.getByRole('button', { name: 'Dashboard' }))
    const dashboards = mockProjetos.filter((p) => p.categoria === 'Dashboard')
    expect(screen.getAllByRole('listitem')).toHaveLength(dashboards.length)
  })

  it('botão ativo tem aria-pressed=true', () => {
    render(<Projetos projetos={mockProjetos} />)
    fireEvent.click(screen.getByRole('button', { name: 'Portal Paciente' }))
    expect(screen.getByRole('button', { name: 'Portal Paciente' }))
      .toHaveAttribute('aria-pressed', 'true')
  })
})
```

### Checklist

- [ ] `AnimatePresence mode="popLayout"` envolvendo o map de cards
- [ ] `layout` prop em `motion.ul` pai e em cada `motion.li`
- [ ] `key` único e estável em cada item (usar `slug`, nunca `index`)
- [ ] Filtros com `aria-pressed` para acessibilidade
- [ ] `layoutId` no indicador de filtro ativo
- [ ] Testes cobrindo: render inicial, filtro, acessibilidade
- [ ] `pnpm typecheck` sem erros

---

## TAREFA 4 — Contador animado com `useInView` + `animate` ⬜

**Prioridade:** Média-Alta | **Esforço:** Baixo (≈ 40 min) | **Impacto:** ⭐⭐⭐⭐

### O que fazer

Criar um componente `AnimatedCounter` que anima números (métricas, stats, KPIs)
quando entram na viewport. Aplicar na seção de prova social / stats do portfólio
(ex: "98% satisfação", "1.200 consultas", "3 clínicas atendidas").

### Arquivo alvo

Novo: `components/ui/AnimatedCounter.tsx`  
Uso: seção de stats/métricas em `components/sections/Stats.tsx` (criar se não existir)

### Implementação

```tsx
// components/ui/AnimatedCounter.tsx
"use client"

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring, animate, motion } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 1.5,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 })
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  useEffect(() => {
    if (isInView) {
      animate(motionValue, value, { duration, ease: 'easeOut' })
    }
  }, [isInView, motionValue, value, duration])

  useEffect(() => {
    return springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(latest).toLocaleString('pt-BR')}${suffix}`
      }
    })
  }, [springValue, prefix, suffix])

  return (
    <span
      ref={ref}
      className={className}
      aria-label={`${prefix}${value.toLocaleString('pt-BR')}${suffix}`}
    >
      {prefix}0{suffix}
    </span>
  )
}
```

```tsx
// Uso em Stats.tsx
const stats = [
  { value: 98,   suffix: '%', label: 'Satisfação dos clientes' },
  { value: 1200, suffix: '+', label: 'Consultas processadas' },
  { value: 3,    suffix: '',  label: 'Clínicas atendidas na RMGV' },
]

<dl className="grid grid-cols-1 gap-[var(--space-8)] sm:grid-cols-3">
  {stats.map((stat) => (
    <div key={stat.label}>
      <dt className="text-[var(--color-text-muted)] text-[var(--text-sm)]">{stat.label}</dt>
      <dd>
        <AnimatedCounter
          value={stat.value}
          suffix={stat.suffix}
          className="font-display text-[var(--text-2xl)] font-bold text-[var(--color-text)]"
        />
      </dd>
    </div>
  ))}
</dl>
```

### Observações técnicas

- `aria-label` com o valor final garante que leitores de tela anunciem o número correto,
  não "0" (o valor inicial da animação).
- `useSpring` com `damping: 60` cria uma desaceleração suave — mais natural que linear.
- `toLocaleString('pt-BR')` formata números como "1.200" (padrão brasileiro).

### Testes obrigatórios

```typescript
// tests/integration/AnimatedCounter.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

describe('AnimatedCounter', () => {
  it('renderiza com aria-label correto para acessibilidade', () => {
    render(<AnimatedCounter value={98} suffix="%" />)
    expect(screen.getByLabelText('98%')).toBeInTheDocument()
  })

  it('exibe prefixo e sufixo corretamente no aria-label', () => {
    render(<AnimatedCounter value={1200} prefix="R$ " suffix="+" />)
    expect(screen.getByLabelText('R$ 1.200+')).toBeInTheDocument()
  })
})
```

### Checklist

- [ ] `aria-label` com valor final no `<span>` (acessibilidade de leitores de tela)
- [ ] `toLocaleString('pt-BR')` para formatação brasileira
- [ ] `useInView` com `once: true` — anima só uma vez
- [ ] `useSpring` com parâmetros de damping para suavidade
- [ ] Testes cobrindo acessibilidade e formatação
- [ ] `pnpm typecheck` sem erros

---

## TAREFA 5 — `useScroll` + `useTransform` na Hero Section ⬜

**Prioridade:** Média | **Esforço:** Médio (≈ 1h) | **Impacto:** ⭐⭐⭐

### O que fazer

Adicionar efeito de parallax na hero section usando `useScroll` e `useTransform`.
O conteúdo sobe levemente e some enquanto o usuário rola — cria profundidade e
fluidez premium sem custo de performance (CSS `transform`, não `top`/`height`).

### Arquivo alvo

`components/sections/Hero.tsx`

### Implementação

```tsx
// components/sections/Hero.tsx
"use client"

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'], // do topo da seção até sair da viewport
  })

  // Spring suaviza o progresso do scroll — evita jank em scrolls rápidos
  const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 100 })

  const y       = useTransform(smoothProgress, [0, 1], ['0%', '-30%'])
  const opacity = useTransform(smoothProgress, [0, 0.6], [1, 0])
  const scale   = useTransform(smoothProgress, [0, 1], [1, 0.95])

  return (
    <section ref={containerRef} id="hero" className="relative min-h-[100svh] overflow-hidden">
      <motion.div
        style={{ y, opacity, scale }}
        className="flex h-full flex-col items-start justify-center px-[var(--space-6)] py-[var(--space-24)]"
      >
        {/* conteúdo existente da hero */}
      </motion.div>
    </section>
  )
}
```

### Observações técnicas

- `useScroll` com `target` + `offset` faz o progresso ir de 0→1 apenas enquanto
  a hero está visível, não durante a página inteira.
- `useSpring` no `scrollYProgress` elimina o "jank" em touchpads e mouses com
  scrolls irregulares.
- `min-h-[100svh]` usa `svh` (small viewport height) — corrige o bug do Chrome mobile
  onde `100vh` inclui a barra do browser.
- Animar apenas `transform` (y, scale) e `opacity` — não propriedades que disparam
  reflow/repaint (`top`, `height`, `width`).

### Testes obrigatórios

```typescript
// tests/integration/Hero.test.tsx
// Snapshot test + axe para verificar que o refactor não quebrou a estrutura semântica
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { expect, it } from 'vitest'
import { Hero } from '@/components/sections/Hero'

expect.extend(toHaveNoViolations)

it('Hero não tem violações WCAG após parallax', async () => {
  const { container } = render(<Hero />)
  expect(await axe(container)).toHaveNoViolations()
})
```

### Checklist

- [ ] `useScroll` com `target` apontando para o `ref` da seção (não `window`)
- [ ] `useSpring` no `scrollYProgress` para suavizar
- [ ] Apenas `transform` e `opacity` sendo animados (zero reflow)
- [ ] `min-h-[100svh]` (não `100vh`)
- [ ] `overflow-hidden` no container para evitar scroll horizontal
- [ ] Teste axe passando após refactor
- [ ] `pnpm typecheck` sem erros

---

## TAREFA 6 — Page Transitions com `AnimatePresence` no App Router ⬜

**Prioridade:** Média | **Esforço:** Alto (≈ 2h) | **Impacto:** ⭐⭐⭐

### O que fazer

Adicionar transições suaves entre páginas (home ↔ case studies) usando
`AnimatePresence` integrado ao Next.js App Router. É a feature mais complexa do
backlog — requer um Provider client-side e entendimento de como o App Router
gerencia o DOM de páginas.

### Arquivos alvo

- `app/layout.tsx` — adicionar Provider
- Novo: `components/ui/PageTransition.tsx` — wrapper de transição

### Implementação

```tsx
// components/ui/PageTransition.tsx
"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  enter:   { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.2,  ease: [0.7, 0, 0.84, 0] } },
}

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  )
}
```

```tsx
// app/layout.tsx — substituir <main> pelo wrapper
import { PageTransition } from '@/components/ui/PageTransition'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <MotionConfig reducedMotion="user"> {/* Tarefa 1 */}
          <Header />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </MotionConfig>
      </body>
    </html>
  )
}
```

### Cuidados com App Router

O Next.js App Router renderiza Server Components no layout e reidrata o
`PageTransition` (client) separadamente. O `key={pathname}` força o AnimatePresence
a reconhecer a mudança de página corretamente. `initial={false}` evita a animação
de entrada na primeira carga (melhor UX e Lighthouse).

### Testes obrigatórios

```typescript
// tests/e2e/page-transitions.spec.ts — Playwright
import { test, expect } from '@playwright/test'

test('transição home → projeto não causa layout shift', async ({ page }) => {
  await page.goto('/')
  await page.click('a[href^="/projetos/"]')
  // Verificar que não há CLS durante a transição
  const cls = await page.evaluate(() =>
    performance.getEntriesByType('layout-shift')
      .reduce((sum, e: any) => sum + e.value, 0)
  )
  expect(cls).toBeLessThan(0.1) // Budget do CLAUDE.md: CLS < 0.1
})
```

### Checklist

- [ ] `PageTransition` é `"use client"` — layout raiz permanece Server Component
- [ ] `initial={false}` no `AnimatePresence` — sem animação na primeira carga
- [ ] `key={pathname}` para detectar mudança de rota
- [ ] `mode="wait"` — espera a saída antes de animar a entrada
- [ ] Teste E2E verificando CLS < 0.1 (budget do Lighthouse)
- [ ] Verificar que `<main>` semântico está preservado (axe)
- [ ] `pnpm typecheck` sem erros

---

## Resumo e Ordem de Execução

| # | Tarefa | Esforço | Impacto | Ordem |
|---|--------|---------|---------|-------|
| 1 | `MotionConfig` global (`reducedMotion`) | Muito baixo | ⭐⭐⭐⭐ | **1ª — fazer agora** |
| 2 | `staggerChildren` + `whileInView` | Baixo | ⭐⭐⭐⭐⭐ | **2ª** |
| 3 | `layout` + `AnimatePresence` em filtro | Médio | ⭐⭐⭐⭐⭐ | **3ª** |
| 4 | Contador animado (`AnimatedCounter`) | Baixo | ⭐⭐⭐⭐ | **4ª** |
| 5 | Parallax na Hero (`useScroll`) | Médio | ⭐⭐⭐ | **5ª** |
| 6 | Page Transitions (App Router) | Alto | ⭐⭐⭐ | **6ª — por último** |

**Critério de "pronto" global:** todas as tarefas passando no CI
(`pnpm lint` + `pnpm typecheck` + `pnpm test:unit`) com Lighthouse ≥ 90 performance,
≥ 95 acessibilidade.
