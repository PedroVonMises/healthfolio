# CLAUDE.md — Healthfolio (Portfólio Pedro Augusto)

Portfólio pessoal de dev front-end especializado em saúde digital, direcionado a gestores e sócios-médicos de clínicas privadas na Grande Vitória – ES. Audiência B2B — linguagem de resultados, não de tecnologia.

## Tech Stack

- **Framework:** Next.js 15+ (App Router) · React 19 · TypeScript 5 (`strict: true`)
- **Styling:** Tailwind CSS v4 via `@tailwindcss/postcss` — tokens customizados em `src/app/globals.css`
- **State:** Zustand (client) · `nuqs` (URL state sync)
- **Animation:** Framer Motion
- **Forms/Validation:** Zod · Server Actions + `useActionState`
- **API:** Resend (e-mail) · Upstash Redis (rate limiting)
- **Analytics:** Plausible (privacy-first, sem cookies)
- **Testing:** Vitest + Testing Library (unit/integration) · Playwright (e2e) · jest-axe (a11y)
- **CI/CD:** GitHub Actions → Vercel
- **NÃO usar:** jQuery, Lodash, class components, Google Analytics, Meta Pixel, Hotjar, Clarity, qualquer tracker com cookies

## Architecture

```
src/
├── app/              # Next.js App Router — rotas, layouts, API routes
│   ├── api/contact/  # POST rate-limited → Resend (sem persistência de PII)
│   ├── projetos/     # Case studies dinâmicos
│   └── privacidade/  # Política LGPD
├── components/
│   ├── ui/           # Atômicos — sem lógica de negócio, 100% testáveis
│   ├── sections/     # Compostos — dados via props, sem side-effects diretos
│   ├── layout/       # Header, Footer, Nav — estado de tema aqui
│   └── seo/          # JsonLd, OpenGraph
├── lib/              # Utilitários: validations, rate-limit, analytics, seo
└── store/            # Zustand stores
```

**Regra de decisão:** Novo arquivo vai no diretório que melhor descreve sua responsabilidade acima. Componentes reutilizáveis em `ui/`, composições de seção em `sections/`, lógica pura em `lib/`.

## Coding Conventions

### TypeScript
- `strict: true` — sem `any` sem justificativa explícita (comentário `// eslint-disable` + razão)
- Todas as props com tipos explícitos — `ComponentPropsWithoutRef` para extending HTML elements
- Prefer `interface` para props de componente, `type` para unions/intersections
- Named exports apenas — sem `export default` (exceto pages/layouts do Next.js)

### React / Next.js
- **Server Components por padrão** — `"use client"` somente para interatividade real (eventos, hooks de estado)
- Nenhum dado sensível em componentes client — PII só em `route.ts` / Server Actions
- `loading="lazy"` + `width` + `height` em todas as imagens off-screen
- `next/Image` para todas as imagens — formatos AVIF/WebP via config

### Acessibilidade (WCAG AA — obrigatório)
- `aria-label` em todos os botões sem texto visível e links de ícone
- `alt` descritivo em todas as `<img>` — decorativas: `alt=""`
- Skip link como primeiro elemento focável do layout
- Contraste ≥ 4.5:1 texto · ≥ 3:1 elementos grandes
- Focus visible ring: `2px solid var(--color-primary)`, offset `4px`

### CSS / Design System
- Usar **somente** tokens do design system — nunca hardcoded (`globals.css` é fonte de verdade)
- `--font-display` (Zodiak) APENAS em `--text-xl` (24px+) — body sempre `--font-body` (General Sans)
- Máximo 4 tamanhos tipográficos distintos por página
- Sem inline styles para override do design system
- Vermelho `--color-primary` (#C8102E) com **extrema contenção** — apenas CTAs e destaques focais

> Referência completa de tokens: `src/app/globals.css`

## Security

### Headers HTTP
Gerenciados em `next.config.ts` — CSP, HSTS, X-Frame-Options, Permissions-Policy. Nunca relaxar sem justificativa documentada com `// SECURITY:`.

### LGPD — Regras Invioláveis
- **Nunca** logar PII (nome, e-mail, IP) em `console.log` ou serviços de observabilidade
- **Nunca** persistir dados de contato em DB — envio via Resend, descartado após
- **Nunca** adicionar tracker com cookies sem consentimento explícito
- Formulário de contato exibe link para `/privacidade` — base legal: legítimo interesse (Art. 7º, IX)
- Comentar decisões sensíveis com `// LGPD:` ou `// SECURITY:`

### Secrets
- `.env.local` no `.gitignore` — **nunca** commitado
- `NEXT_PUBLIC_*` não contêm segredos
- Segredos de produção via Vercel Environment Variables
- Variáveis obrigatórias documentadas em `.env.example`

## Testing

| Camada | Ferramenta | Threshold | Escopo |
|---|---|---|---|
| Unit | Vitest | ≥ 80% lines/functions/statements, ≥ 70% branches | Validações Zod, helpers, lógica pura |
| Integration | Vitest + Testing Library | ≥ 70% | Componentes UI, formulário, navegação |
| E2E | Playwright | Fluxos críticos cobertos | Nav, form submit, dark/light toggle |
| A11y | jest-axe | 0 violações WCAG AA | Todas as páginas/componentes |

### Eficiência de Testes
- Rodar `test:unit` antes de `test:e2e` — falha rápida, feedback em segundos
- Mock API com MSW handlers em `tests/mocks/` — sem chamadas reais em CI
- Playwright: `fullyParallel: true` local, `workers: 1` em CI (estabilidade)
- Nunca testar o que linters/type-checker já verificam (formatting, import order)
- Cada novo componente ou função de negócio **deve** ter teste correspondente

> Configs canônicas: `vitest.config.ts` · `playwright.config.ts`

## CI/CD

### Pipelines (GitHub Actions)
- **CI** (`ci.yml`): lint → typecheck → test:unit (com coverage) → build · Roda em PR + push to main
- **CD** (`cd.yml`): deploy Vercel — `main` → production, PR → preview
- **Security** (`security.yml`): `npm audit` + CodeQL SAST + Gitleaks · Semanal + push to main
- **Lighthouse** (`lighthouse.yml`): Core Web Vitals em cada PR

> Workflows canônicos: `.github/workflows/`

### Quality Gates — Budgets Inegociáveis
- Lighthouse: **performance ≥ 90 · a11y ≥ 95 · best-practices ≥ 95 · SEO ≥ 95**
- LCP ≤ 2500ms · FCP ≤ 1500ms · CLS ≤ 0.1 · TBT ≤ 200ms
- Bundle total ≤ 800KB
- 0 warnings ESLint · 0 erros TypeScript

### Otimização de Recursos CI
- `concurrency` com `cancel-in-progress: true` — nunca duplicar runs
- Cache de `node_modules` via `actions/setup-node` cache
- Build artifacts com `retention-days: 1` — não acumular storage
- Job `build` depende de `quality` (`needs`) — não buildar se quality falhar

## Commands

```bash
npm run dev          # Dev server (Turbopack)
npm run build        # Production build
npm run lint         # ESLint (0 warnings)
npm run lint:fix     # ESLint autofix
npm run typecheck    # tsc --noEmit
npm run test:unit    # Vitest run
npm run test:e2e     # Playwright
npm run test:a11y    # Vitest — accessibility subset
npm run test:all     # Unit + E2E sequencial
```

## SEO

- `generateMetadata()` por rota — título, description, OG image
- JSON-LD `schema.org/Person` no layout raiz
- `sitemap.ts` + `robots.ts` dinâmicos
- Locale: `pt_BR` · Keywords: saúde digital, React, Next.js, Grande Vitória
- 1 `<h1>` por página · hierarquia semântica `h1 > h2 > h3`

## Git Workflow

- Branches: `feat/nome`, `fix/descricao`, `chore/descricao`
- PR para `main` — nunca push direto
- Commits em português ou inglês — consistente dentro do PR

## Checklist Pré-PR

- [ ] `npm run lint` — 0 warnings
- [ ] `npm run typecheck` — 0 erros
- [ ] `npm run test:unit` — passing, coverage ≥ 80%
- [ ] Lighthouse local: perf ≥ 90, a11y ≥ 95
- [ ] Sem secrets expostos
- [ ] Funcionalidade nova → teste escrito
- [ ] Se novo dado pessoal coletado → atualizar `/privacidade`

## Safe-Change Rules

- **Nunca modificar** `next.config.ts` security headers sem justificativa `// SECURITY:`
- **Nunca modificar** `.env*` em commits
- **Nunca usar** `eval()` ou `dangerouslySetInnerHTML` sem sanitização (DOMPurify)
- **Nunca remover** testes existentes sem substituição equivalente

## External Docs

| Documento | Propósito |
|---|---|
| `COPYWRITER.md` | Tom de voz, copy persuasivo B2B, diretrizes de texto |
| `FRONTEND-SPECIALIST.md` | Padrões visuais avançados, micro-interações, UX |
| `LOCALDATA.md` | Dados de mercado da RMGV, estatísticas do setor de saúde |
| `DEVELOPMENT_HISTORY.md` | Histórico de decisões arquiteturais e refinamentos |
| `todo.md` | Roadmap de features por prioridade (carreira dev pleno) |
| `lighthouse-budget.json` | Budgets de performance declarativos |

## Domain Glossary

| Termo | Significado |
|---|---|
| Decisor | Sócio-médico ou gestor administrativo de clínica privada |
| Portal paciente | Interface web para agendamento, prontuário, teleconsulta |
| No-show | Paciente que não comparece à consulta agendada |
| RMGV | Região Metropolitana da Grande Vitória – ES |
| LGPD | Lei Geral de Proteção de Dados (Lei 13.709/2018) |
| Titular | Pessoa natural a quem os dados pessoais se referem |
