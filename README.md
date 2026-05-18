# Pedro Augusto — Software Engineer | Digital Health Specialist

![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)

## 🏥 A Intersecção entre Tecnologia e Saúde Digital

Clínicas médicas perdem até 15% dos agendamentos por gargalos operacionais e dependência de fluxos analógicos. Como Software Engineer especializado no setor de saúde, meu foco é desenvolver **portais de pacientes, dashboards gerenciais e fluxos de autoatendimento** que transformam custos operacionais em lucro previsível.

Este portfólio não é apenas uma landing page estática; é um produto B2B arquitetado com rigor corporativo para demonstrar aos Tech Recruiters e Engineering Managers como a engenharia de front-end avançada pode impactar o ciclo de receita de clínicas de alto padrão na Grande Vitória.

---

## 🛠️ Decisões Arquiteturais e Tech Stack
*Justificativas técnicas focadas em performance, manutenibilidade e escalabilidade empresarial.*

- **Core & SSR**: `React 19` + `Next.js 15` (App Router). Roteamento fortemente tipado (`typedRoutes`) e foco no tempo de resposta e Core Web Vitals, essenciais para clínicas que dependem de aquisição de pacientes via busca orgânica.
- **Tipagem Estrita**: `TypeScript` em Strict Mode total. O ecossistema de saúde digital não tolera erros em tempo de execução; a previsibilidade dos dados é mandatória.
- **Design System Modular**: `Tailwind CSS v4`. Abstenção do uso de *magic numbers* em favor de *Design Tokens* rigorosos (escala de cor padronizada e restrições tipográficas), garantindo que a base de código possa escalar em times multifuncionais mantendo o padrão visual.
- **Micro-interações Premium**: `Framer Motion`. Implementação de animações baseadas em física (como botões magnéticos com *Awwwards-style physics* de inércia e repulsão) para engajamento visual. A arquitetura dos eventos foi projetada para prevenir bugs de UX como *jitter loops*.

---

## 🛡️ Pilares Sênior: QA, Segurança e Acessibilidade
Diferenciais de engenharia implementados no código-fonte em alinhamento aos requisitos *Enterprise*:

- **Segurança (Privacy by Design & Compliance)**: Em conformidade orgânica com os princípios da LGPD, o projeto implementa regras estritas de `Content-Security-Policy (CSP)` nas configurações do framework. Integrações externas (como a renderização dinâmica do *OpenStreetMap*) ocorrem de forma encapsulada sem abrir a superfície de ataque para injeções XSS.
- **Test-Driven & QA**: Ambiente validado através de rotinas de qualidade (`npm run typecheck`, linting estrito). Testes unitários e de integração desenvolvidos com `Vitest` e `@testing-library`, com infraestrutura de *mocks* avançada (IntersectionObservers e APIs de MediaQuery). Preparado para testes E2E (*Playwright*).
- **Acessibilidade (WCAG AA)**: Navegação completamente validada por teclado, hierarquia semântica de `<header>`, `<main>` e heading tags, além de suporte extensivo a *Screen Readers* através de `aria-labels` assertivos.

---

## 🤝 Soft Skills & Contexto Clínico
O desenvolvimento de software para o nicho de saúde exige competências interpessoais maduras, amplamente valorizadas por Tech Managers do setor (em alinhamento com metodologias de mercado e requisitos mapeados na indústria tecnológica de saúde):

- **Comunicação Tradutória**: Habilidade de simplificar e traduzir desafios sistêmicos (ex: integrações ERPs legados) para gestores não-técnicos e *staff* de atendimento de forma transparente.
- **Empatia e Patient-Centricity**: Design orientado a reduzir a carga cognitiva do usuário final. Ambientes de saúde operam sob alta pressão; o fluxo digital deve mitigar o estresse e a vulnerabilidade do paciente.
- **Manejo de Riscos e Detalhe Extremo**: Ação diligente na prevenção de bugs de UX que poderiam corromper dados de agendamento ou informações sensíveis.
- **Gestão de Mudança Organizacional**: Visão orientada a negócio, produzindo UIs intuitivas que reduzem o atrito no *onboarding* das equipes clínicas na adoção de novas tecnologias (EHR/EMR).

---

## 🚀 Execução Local (Developer Experience)

Instruções padronizadas para rodar a aplicação em ambientes de triagem técnica.

```bash
# Clone o repositório
git clone https://github.com/pedro-augusto/healthfolio.git

# Acesse o diretório
cd healthfolio

# Instale as dependências (Node 20+ recomendado)
npm install

# Execute as verificações de Qualidade (Typecheck & Lint)
npm run typecheck
npm run lint

# Execute a suíte de testes de integração e componentes
npm run test:unit

# Inicie o servidor de desenvolvimento
npm run dev
```

*Acesse `http://localhost:3000` para visualizar a aplicação localmente.*

---
*Desenvolvido sob padrões arquiteturais escaláveis. Conecte-se comigo para explorarmos os próximos passos na transformação digital do setor de saúde.*
