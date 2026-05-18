# CLAUDE.md — Portfólio Pedro Augusto
> Instruções de projeto para o agente de IA. Este arquivo é a fonte única de verdade sobre
> arquitetura, padrões, CI/CD, testes, segurança e privacidade do projeto.

---

## 1. VISÃO GERAL DO PROJETO

**Nome:** Portfolio Pedro Augusto  
**Domínio-alvo:** pedroaugusto.dev (ou variação)  
**Stack principal:** React 19 + Next.js 15 (App Router) + TypeScript 5.x + Tailwind CSS v4  
**Deploy:** Vercel (produção) + branch previews automáticos  
**Objetivo estratégico:** Portfólio pessoal de dev front-end especializado em saúde digital,
direcionado a gestores e sócios-médicos de clínicas privadas na Grande Vitória – ES.  
**Audiência primária:** Gestores de saúde (B2B); linguagem de resultados, não de tecnologia.

---

## 2. ESTRUTURA DO REPOSITÓRIO

```
/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml            # lint + typecheck + testes em todo PR
│   │   ├── cd.yml            # deploy automático (main → prod, branches → preview)
│   │   ├── security.yml      # audit de dependências + SAST semanal
│   │   └── lighthouse.yml    # Core Web Vitals em cada PR
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── CODEOWNERS
├── app/                      # Next.js App Router
│   ├── layout.tsx            # RootLayout: metadados, fontes, CSP headers
│   ├── page.tsx              # Home: hero, especialização, projetos, sobre, contato
│   ├── projetos/
│   │   └── [slug]/
│   │       └── page.tsx      # Case study individual
│   ├── privacidade/
│   │   └── page.tsx          # Política de Privacidade (LGPD)
│   ├── sitemap.ts
│   ├── robots.ts
│   └── api/
│       └── contact/
│           └── route.ts      # POST /api/contact → Resend + rate limiting
├── components/
│   ├── ui/                   # Atômicos: Button, Badge, Card, Input…
│   ├── sections/             # Compostos: Hero, Projetos, Sobre, Contato…
│   ├── layout/               # Header, Footer, Nav
│   └── seo/                  # JsonLd, OpenGraph, MetaTags
├── content/
│   └── projetos/             # MDX — case studies
│       └── [slug].mdx
├── lib/
│   ├── validations.ts        # Schemas Zod para formulários e API
│   ├── rate-limit.ts         # Upstash Redis rate limiter /api/contact
│   ├── analytics.ts          # Wrapper Plausible (privacy-first, sem cookies)
│   └── seo.ts                # Helpers de metadados
├── public/
│   ├── fonts/                # Self-hosted (fallback de CDN)
│   └── og/                   # Imagens Open Graph estáticas
├── styles/
│   └── globals.css           # Tokens CSS, base.css, tema PA
├── tests/
│   ├── unit/                 # Vitest — lógica pura
│   ├── integration/          # Vitest + Testing Library — componentes
│   └── e2e/                  # Playwright — fluxos críticos
├── .env.example              # Variáveis obrigatórias (sem valores reais)
├── .env.local                # NÃO commitado — valores locais
├── next.config.ts            # Headers de segurança, redirects, CSP
├── tailwind.config.ts        # Tema customizado PA
├── vitest.config.ts
├── playwright.config.ts
├── eslint.config.ts          # ESLint flat config
├── .prettierrc
├── tsconfig.json             # strict: true
└── package.json
```

---

## 3. IDENTIDADE VISUAL — DESIGN SYSTEM

### 3.1 Paleta de Cores (tokens CSS obrigatórios)

```css
/* styles/globals.css */
:root, [data-theme="light"] {
  /* Superfícies */
  --color-bg:              #FFFFFF;
  --color-surface:         #F8F9FA;
  --color-surface-2:       #F1F3F5;
  --color-surface-offset:  #E9ECEF;
  --color-divider:         oklch(0.2 0.01 80 / 0.10);
  --color-border:          oklch(0.2 0.01 80 / 0.12);

  /* Texto */
  --color-text:            #1C1C1E;
  --color-text-muted:      #6B7280;
  --color-text-faint:      #9CA3AF;
  --color-text-inverse:    #FFFFFF;

  /* Acento — Vermelho Médico (usar com EXTREMA contenção) */
  --color-primary:         #C8102E;
  --color-primary-hover:   #A50E26;
  --color-primary-active:  #84091E;
  --color-primary-highlight: #FCE4E8;

  /* Sombras warm-tinted */
  --shadow-sm: 0 1px 2px oklch(0.2 0.01 80 / 0.06);
  --shadow-md: 0 4px 12px oklch(0.2 0.01 80 / 0.08);
  --shadow-lg: 0 12px 32px oklch(0.2 0.01 80 / 0.12);

  /* Raios */
  --radius-sm:   0.375rem;   /* 6px  — badges, chips */
  --radius-md:   0.5rem;     /* 8px  — inputs, cards comuns */
  --radius-lg:   0.75rem;    /* 12px */
  --radius-xl:   1rem;       /* 16px — cards de destaque */
  --radius-full: 9999px;

  /* Transições */
  --transition-interactive: 180ms cubic-bezier(0.16, 1, 0.3, 1);

  /* Tipografia */
  --font-display: 'Zodiak', 'Georgia', serif;
  --font-body:    'General Sans', 'Helvetica Neue', sans-serif;

  /* Larguras de conteúdo */
  --content-narrow:  640px;
  --content-default: 960px;
  --content-wide:    1200px;
}

[data-theme="dark"] {
  --color-bg:              #111113;
  --color-surface:         #17171A;
  --color-surface-2:       #1E1E22;
  --color-surface-offset:  #26262B;
  --color-divider:         oklch(1 0 0 / 0.08);
  --color-border:          oklch(1 0 0 / 0.10);
  --color-text:            #E5E7EB;
  --color-text-muted:      #9CA3AF;
  --color-text-faint:      #6B7280;
  --color-primary:         #E8314A;
  --color-primary-hover:   #F04D63;
  --color-primary-active:  #C8102E;
  --color-primary-highlight: #3D1218;
  --shadow-sm: 0 1px 2px oklch(0 0 0 / 0.20);
  --shadow-md: 0 4px 12px oklch(0 0 0 / 0.30);
  --shadow-lg: 0 12px 32px oklch(0 0 0 / 0.40);
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    /* espelhar variáveis de [data-theme="dark"] aqui */
  }
}
```

### 3.2 Escala Tipográfica

```css
:root {
  --text-xs:   clamp(0.75rem,  0.7rem  + 0.25vw, 0.875rem);
  --text-sm:   clamp(0.875rem, 0.8rem  + 0.35vw, 1rem);
  --text-base: clamp(1rem,     0.95rem + 0.25vw, 1.125rem);
  --text-lg:   clamp(1.125rem, 1rem    + 0.75vw, 1.5rem);
  --text-xl:   clamp(1.5rem,   1.2rem  + 1.25vw, 2.25rem);
  --text-2xl:  clamp(2rem,     1.2rem  + 2.5vw,  3.5rem);
  --text-hero: clamp(3rem,     0.5rem  + 7vw,    8rem);
}
```

**Regras obrigatórias:**
- `--font-display` APENAS em `--text-xl` (24px) e acima
- Body em `--text-base` (16px) — nunca `--text-lg` para corpo de texto
- Máximo 4 tamanhos distintos por página
- Mínimo absoluto: `--text-xs` (12px)

### 3.3 Fontes

```html
<!-- Fontshare: Zodiak (display) + General Sans (body) -->
<link
  href="https://api.fontshare.com/v2/css?f[]=zodiak@400,500,700&f[]=general-sans@400,500,600&display=swap"
  rel="stylesheet"
/>
```

Alternativa Google Fonts: `Instrument Serif` (display) + `Work Sans` (body)

---

## 4. ARQUITETURA DE COMPONENTES

### 4.1 Hierarquia

```
ui/          → atômicos, sem lógica de negócio, 100% testáveis
sections/    → compostos, recebem dados via props/MDX, sem side-effects diretos
layout/      → Header, Footer, Nav — estado de tema aqui
```

### 4.2 Convenções obrigatórias

- **Todas as props com tipos explícitos** — sem `any`, sem `unknown` sem cast
- **Componentes de servidor por padrão** — `"use client"` somente para interatividade
- **Nenhum dado sensível em componentes client** — dados do formulário só em `route.ts`
- **`aria-label` obrigatório** em todos os botões sem texto visível e links de ícone
- **`alt` obrigatório e descritivo** em todas as `<img>` — decorativas: `alt=""`
- **`loading="lazy"` + `width` + `height`** em todas as imagens off-screen
- **Skip link** como primeiro elemento focável do layout

### 4.3 API de Contato — Segurança

```typescript
// app/api/contact/route.ts
import { z } from 'zod'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { headers } from 'next/headers'

const ContactSchema = z.object({
  name:    z.string().min(2).max(100).trim(),
  email:   z.string().email().max(254).toLowerCase().trim(),
  company: z.string().max(100).trim().optional(),
  message: z.string().min(10).max(2000).trim(),
})

// Rate limit: 3 requests por IP por hora
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, '1 h'),
})

export async function POST(req: Request) {
  const ip = (await headers()).get('x-forwarded-for') ?? 'anonymous'
  const { success } = await ratelimit.limit(ip)
  if (!success) return Response.json({ error: 'Too many requests' }, { status: 429 })

  const body = await req.json()
  const parsed = ContactSchema.safeParse(body)
  if (!parsed.success)
    return Response.json({ error: parsed.error.flatten() }, { status: 400 })

  // LGPD: nunca logar name/email — enviar via Resend sem persistência em DB
  // await resend.emails.send({ ... })
  return Response.json({ success: true }, { status: 200 })
}
```

---

## 5. CI/CD — GITHUB ACTIONS

### 5.1 CI — Pull Request (`ci.yml`)

```yaml
name: CI
on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  quality:
    name: Lint + Typecheck + Test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm

      - run: pnpm install --frozen-lockfile
      - name: Lint (ESLint)
        run: pnpm lint
      - name: Format check
        run: pnpm format:check
      - name: Typecheck
        run: pnpm typecheck
      - name: Unit + Integration tests
        run: pnpm test:unit --coverage
      - uses: codecov/codecov-action@v4
        with:
          token: ${{ secrets.CODECOV_TOKEN }}

  build:
    name: Build
    runs-on: ubuntu-latest
    needs: quality
    env:
      NEXT_PUBLIC_SITE_URL: https://pedroaugusto.dev
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - uses: actions/upload-artifact@v4
        with:
          name: build-output
          path: .next/
          retention-days: 1
```

### 5.2 CD — Deploy (`cd.yml`)

```yaml
name: CD
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    name: Deploy to Vercel
    runs-on: ubuntu-latest
    environment: ${{ github.ref == 'refs/heads/main' && 'production' || 'preview' }}
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: pnpm }
      - run: pnpm install --frozen-lockfile

      - name: Deploy Production
        if: github.ref == 'refs/heads/main'
        run: pnpm dlx vercel --token=${{ secrets.VERCEL_TOKEN }} --prod
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

      - name: Deploy Preview
        if: github.ref != 'refs/heads/main'
        run: pnpm dlx vercel --token=${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```

### 5.3 Segurança (`security.yml`)

```yaml
name: Security
on:
  schedule:
    - cron: '0 8 * * 1'   # toda segunda 08:00 UTC
  push:
    branches: [main]

jobs:
  audit:
    name: Dependency Audit
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 9 }
      - run: pnpm audit --audit-level=high

  sast:
    name: SAST — CodeQL
    runs-on: ubuntu-latest
    permissions:
      security-events: write
      actions: read
      contents: read
    steps:
      - uses: actions/checkout@v4
      - uses: github/codeql-action/init@v3
        with:
          languages: typescript, javascript
      - uses: github/codeql-action/autobuild@v3
      - uses: github/codeql-action/analyze@v3

  secrets-scan:
    name: Secret Scanning — Gitleaks
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### 5.4 Core Web Vitals (`lighthouse.yml`)

```yaml
name: Lighthouse CI
on:
  pull_request:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: pnpm }
      - run: pnpm install --frozen-lockfile && pnpm build
      - uses: treosh/lighthouse-ci-action@v12
        with:
          urls: |
            http://localhost:3000
          budgetPath: ./lighthouse-budget.json
          uploadArtifacts: true
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

**`lighthouse-budget.json`:**
```json
[{
  "path": "/",
  "resourceSizes": [{ "resourceType": "total", "budget": 800 }],
  "scores": [
    { "category": "performance",    "minScore": 0.90 },
    { "category": "accessibility",  "minScore": 0.95 },
    { "category": "best-practices", "minScore": 0.95 },
    { "category": "seo",            "minScore": 0.95 }
  ],
  "timings": [
    { "metric": "first-contentful-paint",   "budget": 1500 },
    { "metric": "largest-contentful-paint", "budget": 2500 },
    { "metric": "cumulative-layout-shift",  "budget": 0.1 },
    { "metric": "total-blocking-time",      "budget": 200 }
  ]
}]
```

---

## 6. TESTES

### 6.1 Estratégia de Cobertura

| Camada         | Ferramenta                   | Cobertura mínima | O que testar                                      |
|----------------|------------------------------|------------------|----------------------------------------------------|
| Unitário       | Vitest                       | 80%              | Validações Zod, helpers SEO, rate-limit logic      |
| Integração     | Vitest + Testing Library     | 70%              | Componentes UI, formulário, Nav, tema toggle       |
| E2E            | Playwright                   | Fluxos críticos  | Navegação, envio de formulário, dark/light mode    |
| Acessibilidade | axe-core (jest-axe)          | Todas as páginas | Violações WCAG AA por componente                   |
| Visual         | Playwright screenshots       | Hero, cards      | Regressão visual em 375px e 1280px                 |

### 6.2 Exemplos Obrigatórios

```typescript
// tests/unit/validations.test.ts
import { describe, it, expect } from 'vitest'
import { ContactSchema } from '@/lib/validations'

describe('ContactSchema', () => {
  it('rejeita e-mail inválido', () => {
    const r = ContactSchema.safeParse({ name: 'Pedro', email: 'nao-email', message: 'Mensagem ok aqui' })
    expect(r.success).toBe(false)
  })
  it('normaliza e-mail para lowercase e faz trim no nome', () => {
    const r = ContactSchema.safeParse({ name: '  Pedro  ', email: 'PEDRO@EXAMPLE.COM', message: 'Mensagem válida aqui ok' })
    expect(r.success).toBe(true)
    if (r.success) {
      expect(r.data.email).toBe('pedro@example.com')
      expect(r.data.name).toBe('Pedro')
    }
  })
  it('rejeita mensagem abaixo de 10 caracteres', () => {
    const r = ContactSchema.safeParse({ name: 'Pedro', email: 'p@ex.com', message: 'curto' })
    expect(r.success).toBe(false)
  })
})
```

```typescript
// tests/integration/ContactForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ContactForm from '@/components/sections/ContactForm'

describe('ContactForm', () => {
  it('exibe erro para e-mail inválido', async () => {
    render(<ContactForm />)
    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'invalido' } })
    fireEvent.submit(screen.getByRole('form'))
    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument())
  })
  it('desabilita botão de submit durante envio', async () => {
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})))
    render(<ContactForm />)
    // preencher campos válidos e submeter...
    expect(screen.getByRole('button', { name: /enviar/i })).toBeDisabled()
  })
})
```

```typescript
// tests/unit/accessibility.test.tsx
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { expect, it } from 'vitest'
import HeroSection from '@/components/sections/Hero'

expect.extend(toHaveNoViolations)

it('Hero não tem violações WCAG AA', async () => {
  const { container } = render(<HeroSection />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

```typescript
// tests/e2e/navigation.spec.ts — Playwright
import { test, expect } from '@playwright/test'

test('navegação hero → seção projetos', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Pedro Augusto/)
  await page.click('nav a[href="#projetos"]')
  await expect(page.locator('#projetos')).toBeInViewport()
})

test('formulário — validação client-side', async ({ page }) => {
  await page.goto('/#contato')
  await page.fill('[name="email"]', 'invalido')
  await page.click('[type="submit"]')
  await expect(page.locator('[role="alert"]')).toBeVisible()
})

test('toggle dark/light persiste estado', async ({ page }) => {
  await page.goto('/')
  await page.click('[data-theme-toggle]')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
})

test('mobile 375px — nav é acessível', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 375, height: 812 } })
  const page = await context.newPage()
  await page.goto('/')
  await expect(page.locator('nav')).toBeVisible()
})
```

### 6.3 vitest.config.ts

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      exclude: ['**/*.config.*', '**/tests/**', '**/.next/**'],
      thresholds: { lines: 80, functions: 80, branches: 70, statements: 80 },
    },
  },
  resolve: { alias: { '@': resolve(__dirname, './') } },
})
```

---

## 7. SEGURANÇA

### 7.1 Headers HTTP (`next.config.ts`)

```typescript
import type { NextConfig } from 'next'

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control',   value: 'on' },
  { key: 'X-Frame-Options',           value: 'DENY' },
  { key: 'X-Content-Type-Options',    value: 'nosniff' },
  { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://api.fontshare.com",
      "font-src 'self' https://api.fontshare.com",
      "img-src 'self' data: blob:",
      "connect-src 'self' https://plausible.io",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  headers: async () => [
    { source: '/(.*)', headers: securityHeaders },
  ],
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
  },
  experimental: { typedRoutes: true },
}

export default nextConfig
```

### 7.2 Variáveis de Ambiente (`.env.example`)

```bash
RESEND_API_KEY=             # E-mail via Resend (formulário de contato)
UPSTASH_REDIS_REST_URL=     # Rate limiting da API
UPSTASH_REDIS_REST_TOKEN=
NEXT_PUBLIC_SITE_URL=       # https://pedroaugusto.dev
NEXT_PUBLIC_PLAUSIBLE_DOMAIN= # pedroaugusto.dev
```

**Regras:**
- `.env.local` no `.gitignore` — nunca commitado
- Variáveis `NEXT_PUBLIC_*` não contêm segredos
- Segredos de produção gerenciados via Vercel Environment Variables
- Rotação de `RESEND_API_KEY` a cada 90 dias (issue automática via Actions)
- Dependabot ativado para PRs automáticos de segurança

---

## 8. PRIVACIDADE E LGPD

### 8.1 Princípio de Minimização

Este site coleta apenas o mínimo necessário. O único dado pessoal coletado ativamente é o
submetido via formulário de contato (nome, e-mail, mensagem), com finalidade exclusiva de
responder ao solicitante.

**Base legal:** Legítimo interesse (Art. 7º, IX, LGPD).  
**Não é necessário** banner de consentimento para o formulário nesta base legal.

### 8.2 Analytics Privacy-First — Plausible

```tsx
// app/layout.tsx
<Script
  defer
  data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
  src="https://plausible.io/js/script.js"
  strategy="afterInteractive"
/>
```

**Proibido:** Google Analytics (UA/GA4), Meta Pixel, Hotjar, Clarity ou qualquer solução
que defina cookies de rastreamento sem consentimento explícito. Plausible é compliant LGPD/GDPR
por padrão — sem cookies, sem fingerprinting, sem dados pessoais.

### 8.3 Política de Privacidade (`/privacidade`)

A página deve conter em linguagem clara:

```markdown
## Política de Privacidade — Pedro Augusto Dev

**Última atualização:** [data]

### Dados coletados
Apenas os dados fornecidos voluntariamente pelo formulário de contato:
nome, e-mail e mensagem. Não coletamos dados de navegação identificáveis.

### Finalidade e base legal (LGPD Art. 7º)
Responder à solicitação de contato (legítimo interesse, inciso IX).

### Armazenamento
Os dados são enviados por e-mail via Resend e não são armazenados em banco de dados.

### Analytics
Utilizamos Plausible Analytics: dados agregados, sem cookies, sem identificação pessoal.
Nenhum dado é compartilhado com terceiros para fins publicitários.

### Direitos do titular (LGPD Art. 18)
Para acesso, correção ou exclusão dos seus dados: contato@pedroaugusto.dev

### Cookies
Este site não utiliza cookies de rastreamento.
```

### 8.4 Formulário de Contato — Aviso Obrigatório

```tsx
<p className="text-xs text-[var(--color-text-muted)]">
  Seus dados são usados apenas para responder ao seu contato.{' '}
  <a href="/privacidade" className="underline">Política de Privacidade</a>
</p>
```

### 8.5 Proibições de Código (LGPD)

```typescript
// NUNCA fazer:
console.log('Contact from:', email)        // logar dado pessoal
Sentry.captureMessage(JSON.stringify(body)) // enviar PII para observabilidade
await db.contacts.create({ email, name })   // persistir sem finalidade declarada

// SEMPRE fazer:
// LGPD: dados de contato não logados, enviados por e-mail e descartados
await resend.emails.send({ to: OWNER_EMAIL, subject: 'Novo contato', text: message })
```

---

## 9. SEO E METADADOS

### 9.1 Metadados Base

```typescript
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: {
    default: 'Pedro Augusto — Dev Front-end | Saúde Digital | React',
    template: '%s | Pedro Augusto Dev',
  },
  description: 'Desenvolvimento front-end especializado em saúde digital na Grande Vitória – ES. Portais de paciente, agendamento online e dashboards clínicos em React/Next.js.',
  keywords: ['dev front-end saúde', 'React saúde digital', 'portal paciente', 'Next.js Vitória ES'],
  authors: [{ name: 'Pedro Augusto', url: process.env.NEXT_PUBLIC_SITE_URL }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Pedro Augusto Dev',
    images: [{
      url: '/og/default.png',
      width: 1200,
      height: 630,
      alt: 'Pedro Augusto — Dev Front-end Saúde Digital',
    }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}
```

### 9.2 JSON-LD (schema.org/Person)

```tsx
// components/seo/JsonLd.tsx
export function PersonJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Pedro Augusto',
        jobTitle: 'Desenvolvedor Front-end',
        description: 'Especialista em interfaces para saúde digital',
        url: process.env.NEXT_PUBLIC_SITE_URL,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Grande Vitória',
          addressRegion: 'ES',
          addressCountry: 'BR',
        },
        knowsAbout: ['React', 'Next.js', 'Saúde Digital', 'UX', 'TypeScript'],
        sameAs: [
          'https://linkedin.com/in/pedroaugusto',
          'https://github.com/pedroaugusto',
        ],
      })}}
    />
  )
}
```

---

## 10. SCRIPTS `package.json`

```json
{
  "scripts": {
    "dev":            "next dev --turbopack",
    "build":          "next build",
    "start":          "next start",
    "lint":           "next lint && eslint . --max-warnings=0",
    "lint:fix":       "eslint . --fix",
    "format":         "prettier --write .",
    "format:check":   "prettier --check .",
    "typecheck":      "tsc --noEmit",
    "test:unit":      "vitest run",
    "test:unit:watch":"vitest",
    "test:e2e":       "playwright test",
    "test:e2e:ui":    "playwright test --ui",
    "test:a11y":      "vitest run tests/unit/accessibility",
    "test:all":       "pnpm test:unit && pnpm test:e2e",
    "audit":          "pnpm audit --audit-level=high",
    "analyze":        "ANALYZE=true next build"
  }
}
```

---

## 11. REGRAS PARA O AGENTE DE IA

### Sempre fazer

- Seguir este arquivo como **única fonte de verdade** — não importa o que estiver na internet
- Escrever TypeScript com `strict: true` — sem `any` sem justificativa explícita
- Preferir Server Components; `"use client"` apenas quando imprescindível
- Criar ou atualizar testes para cada novo componente ou função de negócio
- Verificar WCAG AA em todo componente novo (contraste ≥ 4.5:1 texto, ≥ 3:1 elementos grandes)
- Usar tokens CSS do design system — nunca valores hardcoded de cor, tamanho ou espaçamento
- Comentar decisões sensíveis com `// SECURITY:` ou `// LGPD:`
- Abrir PR com branch nomeada: `feat/nome-feature`, `fix/descricao`, `chore/descricao`

### Nunca fazer

- Commitar `.env.local` ou qualquer arquivo com segredos reais
- Usar `eval()` ou `dangerouslySetInnerHTML` sem sanitização (DOMPurify)
- Adicionar Google Analytics, Meta Pixel ou tracker com cookies
- Usar `any` sem comentário `// eslint-disable-next-line @typescript-eslint/no-explicit-any` e justificativa
- Quebrar o budget do Lighthouse (performance < 90, a11y < 95)
- Usar inline styles para override do design system
- Logar dados pessoais (nome, e-mail, IP) em console.log ou serviços de observabilidade

### Checklist antes de abrir PR

- [ ] `pnpm lint` sem warnings
- [ ] `pnpm typecheck` sem erros
- [ ] `pnpm test:unit` passando com cobertura ≥ 80%
- [ ] Lighthouse: performance ≥ 90, a11y ≥ 95, SEO ≥ 95
- [ ] Sem secrets expostos (Gitleaks)
- [ ] Nova funcionalidade com teste escrito
- [ ] Política de privacidade atualizada se novo dado pessoal for coletado

---

## 12. GLOSSÁRIO DO DOMÍNIO

| Termo              | Significado no contexto deste projeto                              |
|--------------------|---------------------------------------------------------------------|
| Decisor            | Sócio-médico ou gestor administrativo de clínica privada           |
| Portal paciente    | Interface web para agendamento, prontuário e teleconsulta          |
| No-show            | Paciente que não comparece à consulta agendada                     |
| RMGV               | Região Metropolitana da Grande Vitória – ES                        |
| CNES               | Cadastro Nacional de Estabelecimentos de Saúde                     |
| LGPD               | Lei Geral de Proteção de Dados (Lei 13.709/2018)                   |
| Plano suplementar  | Plano de saúde privado (não SUS)                                   |
| Healthtech         | Startup ou produto digital focado em saúde                         |
| Base legal         | Fundamento jurídico que autoriza o tratamento de dados (LGPD Art. 7) |
| Titular            | Pessoa natural a quem os dados pessoais se referem (LGPD Art. 5)  |
