# Requisição Técnica de Desenvolvimento (Backlog) — Healthfolio

Este documento atua como o backlog técnico oficial e guia de implementação para o portfólio B2B de saúde digital (Healthfolio). Ele foi gerado a partir de uma auditoria profunda da codebase atual e fundamentado nas melhores práticas de portfólios B2B e Healthtech de 2026.

As tarefas estão arquitetadas como épicos e histórias de usuário de alto nível, ordenadas por prioridade técnica e impacto na conversão de leads (gestores de clínicas e médicos).

---

## 🔴 Fase 1: Débito Técnico Crítico e Next.js 15 Compliance
**Objetivo:** Eliminar vulnerabilidades, resolver depreciações de framework e alinhar com as *hard conventions* do `CLAUDE.md`.

- [x] **Correção de Vazamento de PII (LGPD Compliance)**
  - **Arquivo:** `src/app/api/contact/route.ts` (linha 61).
  - **Contexto:** Há um `console.log` vazando dados sensíveis (nome, e-mail) no ambiente de desenvolvimento.
  - **Ação:** Remover ou ofuscar completamente o log para garantir adesão à regra "Nunca logar PII" do `CLAUDE.md`.
  - **Critério de Aceite:** Nenhum dado pessoal é retido na memória de logs sob nenhuma circunstância.

- [x] **Migração para Next.js 15 Dynamic Route Params**
  - **Arquivo:** `src/app/projetos/[slug]/page.tsx`.
  - **Contexto:** No Next.js 15, `params` e `searchParams` em rotas dinâmicas tornaram-se Promises.
  - **Ação:** Refatorar a desestruturação síncrona de `params` para usar `await params`.
  - **Critério de Aceite:** Warning de depreciação do Next.js eliminado no log de build.

- [x] **Erradicação de Tipagem `any` e TypeScript Strict**
  - **Arquivo:** `src/components/sections/Testimonials.tsx`.
  - **Ação:** Substituir as instâncias de `any` associadas aos dados do SWR por tipagens estritas (`Testimonial[]`) ou aplicar `unknown` com *type narrowing*.
  - **Critério de Aceite:** Codebase 100% `strict: true` sem *disables* de ESLint ou TypeScript injustificados.

- [x] **Correção de Memory Leak em Event Listeners**
  - **Arquivo:** `src/components/ui/BeforeAfterSlider.tsx`.
  - **Contexto:** Funções anônimas passadas diretamente para `addEventListener` no `useEffect` não estão sendo removidas no cleanup.
  - **Ação:** Refatorar os handlers para funções nomeadas com referência estável e garantir a remoção correta na desmontagem do componente. Adicionar suporte a interações via teclado.
  - **Critério de Aceite:** Componente *memory-leak free* e operável sem mouse (Acessibilidade WCAG).

---

## 🟠 Fase 2: Otimização de Performance e Infraestrutura SEO
**Objetivo:** Garantir LCP < 2.5s, TBT < 200ms e maximizar os sinais de E-E-A-T (Expertise, Authoritativeness, Trust) para o motor de busca.

- [x] **Implementação Universal do Componente `next/Image`**
  - **Arquivos impactados:** `Projects.tsx`, `BeforeAfterSlider.tsx` e qualquer arquivo utilizando `<img>` nativo.
  - **Ação:** Substituir instâncias de `<img />` por `<Image />`. Fornecer dimensões base (`width`/`height`) para evitar Cumulative Layout Shift (CLS) e definir `loading="lazy"` explicitamente fora da dobra.
  - **Critério de Aceite:** Zero tags `<img>` nativas. Todas as imagens processadas em formato WebP/AVIF com srcset.

- [x] **Otimização de Fontes (Render-Blocking Prevention)**
  - **Arquivo:** `src/app/layout.tsx`.
  - **Contexto:** O carregamento da fonte Fontshare via CDN causa bloqueio de renderização (render-blocking resource).
  - **Ação:** Migrar as famílias tipográficas (Zodiak e General Sans) para importação via pacote `next/font/local` com a estratégia `display: swap`.
  - **Critério de Aceite:** Aumento direto da pontuação de Performance do Lighthouse e eliminação de chamadas de rede encadeadas no pré-render.

- [x] **Arquitetura SEO Completa e Dinâmica**
  - **Arquivos:** `app/sitemap.ts`, `app/robots.ts`, `projetos/[slug]/page.tsx`, `layout.tsx`.
  - **Ação:**
    1. Criar e configurar `sitemap.ts` para indexar dinamicamente os *slugs* de projetos.
    2. Definir as regras de rastreamento no `robots.ts`.
    3. Implementar o método assíncrono `generateMetadata` na rota `[slug]` para injeção programática de `<title>` e `<meta name="description">`.
    4. Prover as imagens de OpenGraph referenciadas (`/og/default.png`, `/og-image.jpg`) dentro do diretório `public/`.
  - **Critério de Aceite:** Semáforos verdes e nota 100 em SEO no Lighthouse CI Pipeline.

- [x] **Ajuste de CSP (Content Security Policy)**
  - **Arquivo:** `Testimonials.tsx` / `next.config.ts`.
  - **Contexto:** Os avatares de mock da API buscam imagens de `pravatar.cc`, o que é bloqueado pelas atuais e estritas políticas de CSP.
  - **Ação:** Servir imagens de avatar via `public/` ou expandir a política `img-src` de forma consciente (`// SECURITY:`).

---

## 🟡 Fase 3: Modernização React 19 e UX B2B/Healthtech
**Objetivo:** Alavancar padrões de 2026 e adequar o conteúdo para gerar conversão em tomadores de decisão clínicos.

- [x] **Refatoração do Contact Form para React 19 Server Actions**
  - **Arquivo:** `src/components/sections/Contact.tsx`.
  - **Ação:** Substituir o `fetch` HTTP assíncrono tradicional por Next.js Server Actions nativas.
  - **Implementação:** Orquestrar o status de submissão e o tratamento de erros em servidor através do hook `useActionState` (ou `useFormState` equivalente). Garantir *progressive enhancement*.
  - **Critério de Aceite:** Formulário processa chamadas no server side e lida com loading states sem `useState` e `useEffect` redundantes.

- [x] **Adequação B2B dos Case Studies (Framework CAR)**
  - **Arquivos:** Conteúdos MDX ou dados da página `/projetos/[slug]`.
  - **Diretriz de Conteúdo (Healthtech):** 
    1. **Challenge-Approach-Result (CAR):** Estruturar o layout para responder à dor do cliente.
    2. Focar na **Aderência HIPAA/LGPD** como arquitetura (segurança desde o design).
    3. Exibir Diagramas de **Workflow Antes/Depois** demonstrando eliminação de cliques administrativos e tempo poupado de secretárias/médicos.
    4. Integrar *Testimonials* em contexto cruzado, não isolados em uma página solitária.
  - **Critério de Aceite:** Páginas dinâmicas atuam como material de vendas focado no ROI do decisor, não em tutoriais de código.

- [x] **Saneamento de Estado Client-Side (Zustand)**
  - **Arquivo:** `src/store/appStore.ts`.
  - **Ação:** Remover propriedades de estado isoladas ou inúteis (ex: `hasSeenWelcomeToast` que é escrito mas nunca lido) mantendo o bundle JS mínimo.
  - **Critério de Aceite:** Store gerencia exclusivamente estado global que afeta múltiplos pontos da UI.

---

## 🟢 Fase 4: Engenharia de Qualidade (Testes e A11y)
**Objetivo:** Escalar a resiliência da aplicação garantindo fluxos testados ponta a ponta.

- [x] **Acessibilidade Escalonada (jest-axe)**
  - **Arquivo:** `tests/unit/accessibility.test.tsx`.
  - **Ação:** Ampliar a suíte do `jest-axe` (atualmente fixada apenas na section *Hero*) para auditar todos os grandes blocos semânticos da UI (*Services*, *About*, *Projects*, *Contact*).
  - **Critério de Aceite:** 0 Violações da WCAG AA processadas nas pipelines de CI em todas as páginas principais.

- [x] **Reforço E2E & Component Testing**
  - **Ação:**
    1. **Playwright:** Mapear e testar o fluxo de ponta a ponta crítico: *Scroll até contato -> Preenchimento Form (Erros de Zod) -> Sucesso (MSW handler)*.
    2. **Vitest:** Fechar lacunas nos componentes de layout (ThemeToggle state) e interativos complexos (ROICalculator).
  - **Critério de Aceite:** O limite (Threshold) de >80% de cobertura de código definido no `vitest.config.ts` é quebrado com sucesso na pipeline.