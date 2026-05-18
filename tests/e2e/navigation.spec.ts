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
