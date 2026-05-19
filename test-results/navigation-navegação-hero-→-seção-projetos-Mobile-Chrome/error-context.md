# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.ts >> navegação hero → seção projetos
- Location: tests\e2e\navigation.spec.ts:3:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('a[href="#projetos"]')
    - locator resolved to 3 elements. Proceeding with the first one: <a href="#projetos" class="group relative text-sm font-semibold leading-6 text-text-muted hover:text-primary transition-colors">…</a>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
      - waiting 100ms
    51 × waiting for element to be visible, enabled and stable
       - element is not visible
     - retrying click action
       - waiting 500ms

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - link "Pedro Augusto." [ref=e5] [cursor=pointer]:
        - /url: /
      - generic [ref=e6]:
        - button "Mudar para tema escuro" [ref=e7]:
          - img [ref=e8]
        - button "Abrir menu principal" [ref=e10]:
          - img [ref=e11]
  - main [ref=e12]:
    - generic [ref=e15]:
      - generic [ref=e16]:
        - generic [ref=e19]: Desenvolvedor Front-end Especialista em Saúde
        - heading "Sua agenda cheia. Seu administrativo no piloto automático." [level=1] [ref=e21]
        - paragraph [ref=e23]: Reduza o no-show e pare de perder pacientes por gargalos no WhatsApp. Desenvolvo portais de paciente e sistemas de agendamento focados em clínicas privadas na Grande Vitória – ES.
        - generic [ref=e25]:
          - link "Quero uma análise gratuita 02:29" [ref=e27] [cursor=pointer]:
            - /url: "#contato"
            - generic [ref=e28]:
              - generic [ref=e29]: Quero uma análise gratuita
              - generic [ref=e30]:
                - img [ref=e31]
                - generic [ref=e34]: 02:29
          - link "Ver Casos de Sucesso" [ref=e39] [cursor=pointer]:
            - /url: "#projetos"
            - text: Ver Casos de Sucesso
            - generic [ref=e40]: →
      - generic [ref=e41]:
        - generic [ref=e43]:
          - generic [ref=e45]: +0%
          - generic [ref=e46]: Aumento na Conversão
        - generic [ref=e48]:
          - generic [ref=e50]: "-0%"
          - generic [ref=e51]: Redução de No-show
        - generic [ref=e53]:
          - generic [ref=e55]: 0%
          - generic [ref=e56]: Adequação LGPD
        - generic [ref=e58]:
          - generic [ref=e60]: 0%
          - generic [ref=e61]: Satisfação do Paciente
    - generic [ref=e63]:
      - generic [ref=e66]:
        - img [ref=e68]
        - generic [ref=e72]: React
      - generic [ref=e75]:
        - img [ref=e77]
        - generic [ref=e79]: Next.js
      - generic [ref=e82]:
        - img [ref=e84]
        - generic [ref=e88]: TypeScript
      - generic [ref=e91]:
        - img [ref=e93]
        - generic [ref=e97]: Tailwind CSS
      - generic [ref=e100]:
        - img [ref=e102]
        - generic [ref=e103]: Framer Motion
      - generic [ref=e106]:
        - img [ref=e108]
        - generic [ref=e111]: Node.js
      - generic [ref=e114]:
        - img [ref=e116]
        - generic [ref=e120]: PostgreSQL
      - generic [ref=e123]:
        - img [ref=e125]
        - generic [ref=e127]: Supabase
      - generic [ref=e130]:
        - img [ref=e132]
        - generic [ref=e136]: Prisma
      - generic [ref=e139]:
        - img [ref=e141]
        - generic [ref=e143]: Playwright
      - generic [ref=e146]:
        - img [ref=e148]
        - generic [ref=e152]: React
      - generic [ref=e155]:
        - img [ref=e157]
        - generic [ref=e159]: Next.js
      - generic [ref=e162]:
        - img [ref=e164]
        - generic [ref=e168]: TypeScript
      - generic [ref=e171]:
        - img [ref=e173]
        - generic [ref=e177]: Tailwind CSS
      - generic [ref=e180]:
        - img [ref=e182]
        - generic [ref=e183]: Framer Motion
      - generic [ref=e186]:
        - img [ref=e188]
        - generic [ref=e191]: Node.js
      - generic [ref=e194]:
        - img [ref=e196]
        - generic [ref=e200]: PostgreSQL
      - generic [ref=e203]:
        - img [ref=e205]
        - generic [ref=e207]: Supabase
      - generic [ref=e210]:
        - img [ref=e212]
        - generic [ref=e216]: Prisma
      - generic [ref=e219]:
        - img [ref=e221]
        - generic [ref=e223]: Playwright
    - generic [ref=e225]:
      - generic [ref=e227]:
        - heading "A solução para o caos administrativo" [level=2] [ref=e228]:
          - img [ref=e229]
          - text: A solução para o caos administrativo
        - paragraph [ref=e232]: A tecnologia deve trabalhar pela sua clínica, não o contrário.
        - paragraph [ref=e233]: Sistemas genéricos criam mais problemas do que resolvem. Projetos sob medida eliminam o atrito na jornada do paciente e devolvem o controle operacional para o sócio-médico.
      - generic [ref=e235]:
        - generic [ref=e237]:
          - term [ref=e238]:
            - img [ref=e240]
            - text: Agendamentos 24/7 sem depender da recepção
          - definition [ref=e244]:
            - paragraph [ref=e245]: Transforme o WhatsApp da clínica em uma máquina de conversão. Pacientes marcam e desmarcam consultas sozinhos, reduzindo em até 40% o tempo perdido pela sua equipe.
        - generic [ref=e247]:
          - term [ref=e248]:
            - img [ref=e250]
            - text: Segurança absoluta contra vazamentos (LGPD)
          - definition [ref=e253]:
            - paragraph [ref=e254]: Não arrisque a reputação da sua clínica. Toda a arquitetura digital é desenhada com criptografia de ponta a ponta, garantindo a privacidade total dos dados dos seus pacientes.
        - generic [ref=e256]:
          - term [ref=e257]:
            - img [ref=e259]
            - text: Controle total sobre o seu faturamento
          - definition [ref=e261]:
            - paragraph [ref=e262]: Substitua planilhas confusas por um painel gerencial em tempo real. Saiba exatamente qual convênio traz mais retorno e qual a taxa real de ocupação da sua agenda.
        - generic [ref=e264]:
          - term [ref=e265]:
            - img [ref=e267]
            - text: Uma experiência premium de ponta a ponta
          - definition [ref=e270]:
            - paragraph [ref=e271]: Diferencie-se da concorrência oferecendo um ambiente seguro onde o paciente acessa resultados de exames, laudos e histórico médico na palma da mão, aumentando a fidelização.
    - generic [ref=e273]:
      - generic [ref=e275]:
        - heading "Simulação de Retorno" [level=2] [ref=e276]:
          - img [ref=e277]
          - text: Simulação de Retorno
        - paragraph [ref=e279]: O custo invisível da agenda ociosa
        - paragraph [ref=e280]: Veja em tempo real o impacto financeiro que um sistema de agendamento inteligente e envio automatizado de lembretes via WhatsApp pode trazer para a sua clínica.
      - generic [ref=e281]:
        - generic [ref=e283]:
          - generic [ref=e284]:
            - generic [ref=e285]:
              - generic [ref=e286]: Consultas por Mês
              - generic [ref=e287]: 500 consultas
            - slider [ref=e288] [cursor=pointer]: "500"
          - generic [ref=e289]:
            - generic [ref=e290]:
              - generic [ref=e291]: Ticket Médio (R$)
              - generic [ref=e292]: R$ 300
            - slider [ref=e293] [cursor=pointer]: "300"
          - generic [ref=e294]:
            - img [ref=e295]
            - paragraph [ref=e297]: Cálculo baseado em uma taxa média de 20% de No-Show (pacientes que faltam sem avisar), comum em clínicas especializadas na Grande Vitória.
        - generic [ref=e299]:
          - generic [ref=e304]: Dashboard.exe
          - generic [ref=e305]:
            - generic [ref=e306]:
              - paragraph [ref=e307]: Faturamento Perdido Atual (Mês)
              - paragraph [ref=e308]: R$ 0
            - generic [ref=e309]:
              - generic [ref=e310]:
                - img [ref=e311]
                - text: Cenário Digital
              - paragraph [ref=e314]: Receita Recuperada Estimada
              - paragraph [ref=e315]: + R$ 0
              - paragraph [ref=e316]: Acrescida ao seu faturamento todo mês.
    - generic [ref=e318]:
      - generic [ref=e320]:
        - heading "Confiança Regional" [level=2] [ref=e321]:
          - img [ref=e322]
          - text: Confiança Regional
        - paragraph [ref=e325]: O que dizem os gestores capixabas
      - generic [ref=e326]:
        - img [ref=e328]
        - generic [ref=e332]:
          - paragraph [ref=e333]: "\"A integração do agendamento com nosso WhatsApp reduziu em 40% o tempo que a recepção passava no telefone. A agenda agora vive cheia e sem buracos.\""
          - generic [ref=e334]:
            - generic [ref=e336]: M
            - generic [ref=e337]:
              - generic [ref=e338]: Dr. Marcelo S.
              - generic [ref=e339]: Sócio-Diretor, Clínica de Ortopedia (Vitória)
        - generic [ref=e340]:
          - button "Depoimento anterior" [ref=e341]:
            - img [ref=e342]
          - generic [ref=e344]:
            - button "Ir para depoimento 1" [ref=e345]
            - button "Ir para depoimento 2" [ref=e346]
            - button "Ir para depoimento 3" [ref=e347]
          - button "Próximo depoimento" [ref=e348]:
            - img [ref=e349]
    - generic [ref=e352]:
      - generic [ref=e353]:
        - generic [ref=e355]:
          - heading "Estudos de Caso" [level=2] [ref=e356]:
            - img [ref=e357]
            - text: Estudos de Caso
          - paragraph [ref=e360]: Resultados reais para clínicas capixabas
          - paragraph [ref=e361]: Veja como investir na experiência digital certa transforma custos operacionais em lucro previsível e pacientes esporádicos em clientes fiéis.
        - generic [ref=e364]:
          - img "Antes" [ref=e366]
          - img "Depois" [ref=e368]
          - img [ref=e371]
          - generic [ref=e378]: Recepção (Caos & Papel)
          - generic [ref=e379]: Autoatendimento & Dashboard
      - generic [ref=e381]:
        - button "Todos" [ref=e382]: Todos
        - button "Redução de Gargalos" [ref=e384]
        - button "Visibilidade Financeira" [ref=e385]
        - button "Experiência Premium" [ref=e386]
      - generic [ref=e387]:
        - article [ref=e391]:
          - img [ref=e398]
          - generic [ref=e402]:
            - generic [ref=e404]: Redução de Gargalos
            - generic [ref=e405]:
              - heading "Portal do Paciente - Clínica de Especialidades" [level=3] [ref=e406]:
                - link "Portal do Paciente - Clínica de Especialidades" [ref=e407] [cursor=pointer]:
                  - /url: /projetos/portal-paciente
                  - text: Portal do Paciente - Clínica de Especialidades
                - img [ref=e409]
              - paragraph [ref=e411]: "Situação: Clínica perdia 15% dos agendamentos por demora no WhatsApp. Solução: Ambiente seguro integrado ao ERP. Resultado: Redução de 35% nas chamadas telefônicas e aumento de 22% em consultas efetivadas no primeiro mês."
            - generic [ref=e412]:
              - generic [ref=e413]: Next.js
              - generic [ref=e414]: Tailwind
              - generic [ref=e415]: Integração ERP
        - article [ref=e419]:
          - img [ref=e426]
          - generic [ref=e430]:
            - generic [ref=e432]: Visibilidade Financeira
            - generic [ref=e433]:
              - heading "Painel Gerencial para Sócios-Médicos" [level=3] [ref=e434]:
                - link "Painel Gerencial para Sócios-Médicos" [ref=e435] [cursor=pointer]:
                  - /url: /projetos/dashboard-gestao
                  - text: Painel Gerencial para Sócios-Médicos
                - img [ref=e437]
              - paragraph [ref=e439]: "Situação: Gestão às cegas com fechamento mensal demorado. Solução: Dashboard consolidando faturamento por convênio e métricas de no-show. Resultado: Substituiu 4 planilhas complexas e acelerou a tomada de decisão financeira."
            - generic [ref=e440]:
              - generic [ref=e441]: React
              - generic [ref=e442]: Data Viz
              - generic [ref=e443]: API REST
        - article [ref=e447]:
          - img [ref=e454]
          - generic [ref=e458]:
            - generic [ref=e460]: Experiência Premium
            - generic [ref=e461]:
              - heading "Autoatendimento Sincronizado" [level=3] [ref=e462]:
                - link "Autoatendimento Sincronizado" [ref=e463] [cursor=pointer]:
                  - /url: /projetos/agendamento-whatsapp
                  - text: Autoatendimento Sincronizado
                - img [ref=e465]
              - paragraph [ref=e467]: "Situação: Sala de espera lotada e pacientes insatisfeitos. Solução: Totem sincronizado com agendamento web e notificações ativas de WhatsApp. Resultado: Tempo de espera na recepção caiu pela metade."
            - generic [ref=e468]:
              - generic [ref=e469]: TypeScript
              - generic [ref=e470]: Integração WhatsApp
      - link "Ver como isso funciona na minha especialidade" [ref=e473] [cursor=pointer]:
        - /url: "#contato"
        - text: Ver como isso funciona na minha especialidade
        - img [ref=e474]
    - generic [ref=e478]:
      - generic [ref=e480]:
        - generic [ref=e481]:
          - heading "Sócio-técnico, não apenas fornecedor" [level=2] [ref=e482]:
            - img [ref=e483]
            - text: Sócio-técnico, não apenas fornecedor
          - paragraph [ref=e488]: Desenvolvedor focado em resultados reais para a saúde
        - paragraph [ref=e490]: Sou Pedro Augusto, dev front-end dedicado exclusivamente a digitalizar o setor de saúde na Grande Vitória.
        - paragraph [ref=e492]: "Ao observar o caos administrativo em recepções de clínicas, percebi que a tecnologia genérica falha com os médicos. Minha missão é traduzir código complexo em eficiência operacional: reduzindo faltas, protegendo dados (LGPD) e criando a experiência fluida que pacientes de alto ticket exigem. Atendimento presencial e consultivo para clínicas de Vitória, Vila Velha e região."
        - link "Marcar uma conversa sobre sua operação" [ref=e495] [cursor=pointer]:
          - /url: "#contato"
          - text: Marcar uma conversa sobre sua operação
          - generic [ref=e496]: →
      - generic [ref=e499]:
        - iframe [ref=e500]:
          - generic [ref=f1e2]:
            - img
            - region "Map" [ref=f1e3]
            - generic:
              - generic [ref=f1e4]:
                - button "Zoom In" [ref=f1e5] [cursor=pointer]
                - button "Zoom Out" [ref=f1e7] [cursor=pointer]
              - group [ref=f1e9]:
                - generic [ref=f1e10]:
                  - text: ©
                  - link "OpenStreetMap contributors" [ref=f1e11] [cursor=pointer]:
                    - /url: /copyright
                  - text: ♥️
                  - link "Make a Donation" [ref=f1e12] [cursor=pointer]:
                    - /url: https://supporting.openstreetmap.org
                  - text: .
                  - link "Website and API terms" [ref=f1e13] [cursor=pointer]:
                    - /url: https://wiki.osmfoundation.org/wiki/Terms_of_Use
        - generic [ref=e501]:
          - img [ref=e506]
          - paragraph [ref=e510]: Grande Vitória, ES
        - generic [ref=e511]:
          - heading "Atendimento Presencial" [level=3] [ref=e512]
          - paragraph [ref=e513]: Consultoria técnica direta na sua clínica para entender a operação de perto.
    - generic [ref=e515]:
      - generic [ref=e517]:
        - heading "Contato Direto" [level=2] [ref=e518]:
          - img [ref=e519]
          - text: Contato Direto
        - paragraph [ref=e521]: Vamos eliminar os gargalos da sua clínica?
        - paragraph [ref=e522]: Conte sobre a sua especialidade e os desafios atuais. Responderei em até 24 horas para agendarmos uma análise de viabilidade técnica gratuita.
      - generic [ref=e525]:
        - generic [ref=e526]:
          - generic [ref=e527]: Seu nome
          - textbox "Seu nome" [ref=e529]:
            - /placeholder: Dr. João Silva
        - generic [ref=e530]:
          - generic [ref=e531]: E-mail profissional
          - textbox "E-mail profissional" [ref=e533]:
            - /placeholder: joao@suaclinica.com.br
        - generic [ref=e534]:
          - generic [ref=e535]: Clínica / Especialidade (Opcional)
          - textbox "Clínica / Especialidade (Opcional)" [ref=e537]:
            - /placeholder: Clínica OrtoPédica — Vitória
        - generic [ref=e538]:
          - generic [ref=e539]: O que está travando sua clínica?
          - textbox "O que está travando sua clínica?" [ref=e541]:
            - /placeholder: Contamos com um sistema antigo...
        - generic [ref=e542]:
          - paragraph [ref=e543]:
            - text: Seus dados são usados apenas para responder ao seu contato.
            - link "Política de Privacidade" [ref=e544] [cursor=pointer]:
              - /url: /privacidade
          - button "Quero uma análise gratuita" [ref=e545]:
            - text: Quero uma análise gratuita
            - img [ref=e546]
  - contentinfo [ref=e549]:
    - generic [ref=e551]:
      - generic [ref=e552]:
        - generic [ref=e553]:
          - link "Pedro Augusto." [ref=e554] [cursor=pointer]:
            - /url: /
          - paragraph [ref=e555]: Especialista em desenvolvimento front-end para a saúde digital. Transformando a jornada do paciente através de tecnologia e design na Grande Vitória.
          - generic [ref=e556]:
            - link "LinkedIn" [ref=e557] [cursor=pointer]:
              - /url: https://linkedin.com/in/pedroaugusto
              - generic [ref=e558]: LinkedIn
              - img [ref=e559]
            - link "GitHub" [ref=e561] [cursor=pointer]:
              - /url: https://github.com/pedroaugusto
              - generic [ref=e562]: GitHub
              - img [ref=e563]
        - generic [ref=e565]:
          - generic [ref=e566]:
            - generic [ref=e567]:
              - heading "Navegação" [level=3] [ref=e568]
              - list [ref=e569]:
                - listitem [ref=e570]:
                  - link "› Especialização" [ref=e571] [cursor=pointer]:
                    - /url: "#especializacao"
                    - generic [ref=e572]: ›
                    - text: Especialização
                - listitem [ref=e573]:
                  - link "› Cases de Sucesso" [ref=e574] [cursor=pointer]:
                    - /url: "#projetos"
                    - generic [ref=e575]: ›
                    - text: Cases de Sucesso
                - listitem [ref=e576]:
                  - link "› Sobre Mim" [ref=e577] [cursor=pointer]:
                    - /url: "#sobre"
                    - generic [ref=e578]: ›
                    - text: Sobre Mim
            - generic [ref=e579]:
              - heading "Contato" [level=3] [ref=e580]
              - list [ref=e581]:
                - listitem [ref=e582]:
                  - link "› Fale Comigo" [ref=e583] [cursor=pointer]:
                    - /url: "#contato"
                    - generic [ref=e584]: ›
                    - text: Fale Comigo
                - listitem [ref=e585]:
                  - link "contato@pedroaugusto.dev" [ref=e586] [cursor=pointer]:
                    - /url: mailto:contato@pedroaugusto.dev
          - generic [ref=e588]:
            - heading "Legal" [level=3] [ref=e589]
            - list [ref=e590]:
              - listitem [ref=e591]:
                - link "› Política de Privacidade" [ref=e592] [cursor=pointer]:
                  - /url: /privacidade
                  - generic [ref=e593]: ›
                  - text: Política de Privacidade
      - generic [ref=e594]:
        - paragraph [ref=e595]: © 2026 Pedro Augusto. Todos os direitos reservados.
        - paragraph [ref=e596]:
          - text: Desenvolvido com
          - generic [ref=e597]: ❤
          - text: em React, Next.js e Tailwind CSS.
  - button "Open Next.js Dev Tools" [ref=e603] [cursor=pointer]:
    - img [ref=e604]
  - alert [ref=e607]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test'
  2   | 
  3   | test('navegação hero → seção projetos', async ({ page }) => {
  4   |   await page.goto('/')
  5   |   await expect(page).toHaveTitle(/Pedro Augusto/)
  6   |   
  7   |   // Click on "Ver Casos de Sucesso" inside the hero
> 8   |   await page.click('a[href="#projetos"]')
      |              ^ Error: page.click: Test timeout of 30000ms exceeded.
  9   |   
  10  |   // O scroll deve ter levado à seção de projetos
  11  |   await expect(page.locator('#projetos')).toBeInViewport()
  12  | })
  13  | 
  14  | test('toggle dark/light persiste estado', async ({ page }) => {
  15  |   await page.goto('/')
  16  |   
  17  |   // Get current theme
  18  |   const html = page.locator('html')
  19  |   
  20  |   // Click toggle
  21  |   await page.click('[data-theme-toggle]')
  22  |   
  23  |   // Wait a bit and check if data-theme changed
  24  |   const newTheme = await html.getAttribute('data-theme')
  25  |   expect(newTheme).toMatch(/dark|light/)
  26  | })
  27  | 
  28  | test('mobile 375px — header é acessível', async ({ browser }) => {
  29  |   const context = await browser.newContext({ viewport: { width: 375, height: 812 } })
  30  |   const page = await context.newPage()
  31  |   
  32  |   await page.goto('/')
  33  |   await expect(page.locator('header')).toBeVisible()
  34  | })
  35  | 
  36  | /* ------------------------------------------------------------------ */
  37  | /* Animações avançadas                                                 */
  38  | /* ------------------------------------------------------------------ */
  39  | 
  40  | test('hero badge com parallax é visível', async ({ page }) => {
  41  |   await page.goto('/')
  42  |   
  43  |   const badge = page.locator('[data-testid="hero-badge"]')
  44  |   await expect(badge).toBeVisible()
  45  |   
  46  |   // Scroll down and verify the element still exists (parallax applied)
  47  |   await page.evaluate(() => window.scrollBy(0, 300))
  48  |   await page.waitForTimeout(500)
  49  |   await expect(badge).toBeAttached()
  50  | })
  51  | 
  52  | test('filtro de projetos com AnimatePresence', async ({ page }) => {
  53  |   await page.goto('/')
  54  |   
  55  |   // Scroll to projects section
  56  |   await page.locator('#projetos').scrollIntoViewIfNeeded()
  57  |   await page.waitForTimeout(500)
  58  |   
  59  |   // All 3 cards should be visible initially
  60  |   const allCards = page.locator('#projetos article')
  61  |   await expect(allCards).toHaveCount(3)
  62  |   
  63  |   // Click "Redução de Gargalos" filter
  64  |   await page.click('#projetos button:has-text("Redução de Gargalos")')
  65  |   await page.waitForTimeout(800)
  66  |   
  67  |   // Only 1 card should remain
  68  |   const filteredCards = page.locator('#projetos article')
  69  |   await expect(filteredCards).toHaveCount(1)
  70  |   
  71  |   // Click "Todos" to restore
  72  |   await page.click('#projetos button:has-text("Todos")')
  73  |   await page.waitForTimeout(800)
  74  |   
  75  |   await expect(page.locator('#projetos article')).toHaveCount(3)
  76  | })
  77  | 
  78  | test('counter animado renderiza métricas', async ({ page }) => {
  79  |   await page.goto('/')
  80  |   
  81  |   // Scroll to trust metrics area (in the hero section)
  82  |   const counter = page.locator('[data-testid="animated-counter"]').first()
  83  |   await counter.scrollIntoViewIfNeeded()
  84  |   await page.waitForTimeout(2000) // Wait for counter animation
  85  |   
  86  |   // The counter should have animated to a non-zero value
  87  |   const text = await counter.textContent()
  88  |   expect(text).toBeTruthy()
  89  |   // Should contain "%" suffix
  90  |   expect(text).toContain('%')
  91  | })
  92  | 
  93  | test('prefers-reduced-motion desabilita animações', async ({ browser }) => {
  94  |   const context = await browser.newContext({ reducedMotion: 'reduce' })
  95  |   const page = await context.newPage()
  96  |   
  97  |   await page.goto('/')
  98  |   
  99  |   // Page should load normally with reduced motion
  100 |   await expect(page).toHaveTitle(/Pedro Augusto/)
  101 |   
  102 |   // Hero badge should be visible (not hidden by animation state)
  103 |   const badge = page.locator('[data-testid="hero-badge"]')
  104 |   await expect(badge).toBeVisible()
  105 |   
  106 |   await context.close()
  107 | })
  108 | 
```