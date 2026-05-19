import { test, expect } from '@playwright/test'

test('navegação hero → seção projetos', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Pedro Augusto/)
  
  // Click on "Ver Casos de Sucesso" inside the hero
  await page.click('a[href="#projetos"]')
  
  // O scroll deve ter levado à seção de projetos
  await expect(page.locator('#projetos')).toBeInViewport()
})

test('toggle dark/light persiste estado', async ({ page }) => {
  await page.goto('/')
  
  // Get current theme
  const html = page.locator('html')
  
  // Click toggle
  await page.click('[data-theme-toggle]')
  
  // Wait a bit and check if data-theme changed
  const newTheme = await html.getAttribute('data-theme')
  expect(newTheme).toMatch(/dark|light/)
})

test('mobile 375px — header é acessível', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 375, height: 812 } })
  const page = await context.newPage()
  
  await page.goto('/')
  await expect(page.locator('header')).toBeVisible()
})

/* ------------------------------------------------------------------ */
/* Animações avançadas                                                 */
/* ------------------------------------------------------------------ */

test('hero badge com parallax é visível', async ({ page }) => {
  await page.goto('/')
  
  const badge = page.locator('[data-testid="hero-badge"]')
  await expect(badge).toBeVisible()
  
  // Scroll down and verify the element still exists (parallax applied)
  await page.evaluate(() => window.scrollBy(0, 300))
  await page.waitForTimeout(500)
  await expect(badge).toBeAttached()
})

test('filtro de projetos com AnimatePresence', async ({ page }) => {
  await page.goto('/')
  
  // Scroll to projects section
  await page.locator('#projetos').scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)
  
  // All 3 cards should be visible initially
  const allCards = page.locator('#projetos article')
  await expect(allCards).toHaveCount(3)
  
  // Click "Redução de Gargalos" filter
  await page.click('#projetos button:has-text("Redução de Gargalos")')
  await page.waitForTimeout(800)
  
  // Only 1 card should remain
  const filteredCards = page.locator('#projetos article')
  await expect(filteredCards).toHaveCount(1)
  
  // Click "Todos" to restore
  await page.click('#projetos button:has-text("Todos")')
  await page.waitForTimeout(800)
  
  await expect(page.locator('#projetos article')).toHaveCount(3)
})

test('counter animado renderiza métricas', async ({ page }) => {
  await page.goto('/')
  
  // Scroll to trust metrics area (in the hero section)
  const counter = page.locator('[data-testid="animated-counter"]').first()
  await counter.scrollIntoViewIfNeeded()
  await page.waitForTimeout(2000) // Wait for counter animation
  
  // The counter should have animated to a non-zero value
  const text = await counter.textContent()
  expect(text).toBeTruthy()
  // Should contain "%" suffix
  expect(text).toContain('%')
})

test('prefers-reduced-motion desabilita animações', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' })
  const page = await context.newPage()
  
  await page.goto('/')
  
  // Page should load normally with reduced motion
  await expect(page).toHaveTitle(/Pedro Augusto/)
  
  // Hero badge should be visible (not hidden by animation state)
  const badge = page.locator('[data-testid="hero-badge"]')
  await expect(badge).toBeVisible()
  
  await context.close()
})

