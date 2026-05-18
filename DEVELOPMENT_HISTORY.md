# Histórico de Desenvolvimento e Versionamento

Este documento registra todas as implementações arquiteturais, escolhas de design e refinamentos técnicos aplicados ao **Portfólio Pedro Augusto (Saúde Digital)**. Todas as implementações seguiram rigorosamente as diretrizes descritas no `CLAUDE.md` e o tom persuasivo B2B ditado no `COPYWRITER.md` e `FRONTEND-SPECIALIST.md`.

---

## 1. Fundação e Design System
- **Paleta de Cores e Tokens**: Implementada a escala "Stone" em `globals.css` com variações para os modos *Light* e *Dark*, garantindo contraste acessível. O vermelho `primary` (`#C8102E`) foi reservado estritamente para CTAs e destaques focais ("Ponto Pulsante").
- **Escala Tipográfica Controlada**: Padronizamos o corpo de texto em `--text-base` (16px, General Sans). O uso da fonte serifada (`Zodiak`) foi bloqueado por regra de Design System para qualquer elemento inferior a `text-xl` (20px), mantendo a integridade visual corporativa.

## 2. Componentes e Micro-Interações (UI/UX)
- **Header Animado**: Implementado com barra de progresso baseada em scroll (`framer-motion`) e navegação que embute sublinhados vermelhos interativos e animados em hover nos itens do menu desktop.
- **Botão Magnético (`MagneticButton.tsx`)**: Arquitetura refinada no padrão *Awwwards*. Substituímos a detecção de mouse simples por uma **Hitbox Estendida Desproporcional** (`px-10 py-12 -mx-10 -my-12`), resolvendo o bug clássico de trepidação (Jitter Loop). A física foi sintonizada para fluidez premium (`stiffness: 100`, `damping: 20`, `mass: 0.5`).
- **Slider Antes/Depois (`BeforeAfterSlider.tsx`)**: Componente iterativo mostrando a transição de um "Caos & Papel" para a imagem oficial `dashboard.png`. O slider utiliza máscaras de recorte (`clip-path`) dinâmicas. Atributos de performance (`loading="lazy" decoding="async"`) foram adicionados às imagens off-screen.
- **Mapa de Cobertura (`LocalPresenceMap.tsx`)**: Substituiu SVGs estáticos por um `iframe` 100% funcional do *OpenStreetMap*. O foco da câmera (BBox) foi fechado estritamente no cinturão de alto padrão médico entre Vitória (Enseada do Suá) e Vila Velha (Praia da Costa). A paleta do mapa é ajustada dinamicamente via filtros CSS para se misturar ao Design System, com legendas em blocos "Glassmorphism" para garantir total legibilidade.
- **Testemunhos (`Testimonials.tsx`)**: Carrossel refinado. A tipografia das citações foi calibrada para `text-xl italic`, evitando conflitos com o título da seção e validando a regra do `CLAUDE.md` para fontes display.

## 3. Segurança, Infraestrutura e Performance
- **Content Security Policy (CSP)**: `next.config.ts` endurecido com regras estritas. Foi necessária a inclusão cirúrgica de `frame-src 'self' https://www.openstreetmap.org` para permitir a renderização do mapa de cobertura sem sacrificar a proteção global contra injeções.
- **Next.js 15+ Core Rules**: 
  - Alocação do roteamento fortemente tipado (`typedRoutes`) transferido da camada `experimental` para o escopo global.
  - Eliminação da regra nativa de CSS `scroll-behavior: smooth` por recomendação do framework, substituindo-a pela utilitária do Tailwind `className="scroll-smooth"` direto no nó `<html>` (`layout.tsx`).
- **Acessibilidade (WCAG)**: Adição do atributo `title` ao iframe do mapa e uso intenso de `aria-labels` nos botões do *ThemeToggle* e carrosséis de forma a não penalizar a nota no Lighthouse e blindar o portfólio contra reprovações técnicas.

## 4. Testes e Qualidade (QA)
- O arquivo `setup.ts` do Vitest foi reforçado para mockar classes como `IntersectionObserver` e `matchMedia`, garantindo a integridade dos testes de componentes do Framer Motion.
- Os testes de integração (como `ContactForm.test.tsx`) foram reescritos. Seus seletores (*getByLabelText*, *getByRole*) foram ajustados para testar o texto final renderizado em produção, e não protótipos de design, utilizando matchers Regex seguros e case-insensitive (Ex: `/quero/i`, `/travando/i`).
- **Aprovação**: 100% dos testes unitários, typechecks (TypeScript em strict mode), e regras de Linting do projeto estão passando livremente, configurando o ambiente perfeito para deploy em produção na Vercel via `.github/workflows/cd.yml`.

---
*Documento gerado em conformidade com as diretrizes do `CLAUDE.md` e arquivado para rastreabilidade de código.*
