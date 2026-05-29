import { test, expect } from '@playwright/test';

test.describe('Tipografia e Responsividade de Fontes', () => {
  test('deve aplicar tipografia fluida e espaçamentos adequados de leitura em desktop e mobile', async ({ page }) => {
    // 1. Testa no viewport Desktop (1280px)
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');

    const h1Desktop = page.locator('h1');
    const pDesktop = page.locator('#hero p');

    // Obter estilos computados em desktop
    const h1FontSizeDesktop = await h1Desktop.evaluate(el => window.getComputedStyle(el).fontSize);
    const pFontSizeDesktop = await pDesktop.evaluate(el => window.getComputedStyle(el).fontSize);
    const pLineHeightDesktop = await pDesktop.evaluate(el => window.getComputedStyle(el).lineHeight);
    const pLetterSpacingDesktop = await pDesktop.evaluate(el => window.getComputedStyle(el).letterSpacing);

    console.log(`Desktop H1 font-size: ${h1FontSizeDesktop}`);
    console.log(`Desktop Body font-size: ${pFontSizeDesktop}, line-height: ${pLineHeightDesktop}, letter-spacing: ${pLetterSpacingDesktop}`);

    // 2. Testa no viewport Mobile (375px)
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const h1Mobile = page.locator('h1');
    const pMobile = page.locator('#hero p');

    // Obter estilos computados em mobile
    const h1FontSizeMobile = await h1Mobile.evaluate(el => window.getComputedStyle(el).fontSize);
    const pFontSizeMobile = await pMobile.evaluate(el => window.getComputedStyle(el).fontSize);
    const pLineHeightMobile = await pMobile.evaluate(el => window.getComputedStyle(el).lineHeight);

    console.log(`Mobile H1 font-size: ${h1FontSizeMobile}`);
    console.log(`Mobile Body font-size: ${pFontSizeMobile}, line-height: ${pLineHeightMobile}`);

    // Verificações de responsividade (fluid typography)
    // O font-size no mobile deve ser significativamente menor que no desktop para h1
    const h1SizeD = parseFloat(h1FontSizeDesktop);
    const h1SizeM = parseFloat(h1FontSizeMobile);
    expect(h1SizeM).toBeLessThan(h1SizeD);

    // O font-size do body também deve ter uma variação
    const pSizeD = parseFloat(pFontSizeDesktop);
    const pSizeM = parseFloat(pFontSizeMobile);
    expect(pSizeM).toBeLessThanOrEqual(pSizeD);

    // Verificações de legibilidade (WCAG e FRONTEND-SPECIALIST guidelines)
    // Line height do body deve ser maior ou igual a 1.5 (ou equivalente em pixels, e.g. 24px para 16px font-size)
    const pLineHeightDVal = parseFloat(pLineHeightDesktop);
    expect(pLineHeightDVal / pSizeD).toBeGreaterThanOrEqual(1.5);

    // Letter spacing do body não deve ser excessivamente colado (deve ser normal ou ligeiramente positivo)
    if (pLetterSpacingDesktop !== 'normal') {
      const pSpacingVal = parseFloat(pLetterSpacingDesktop);
      expect(pSpacingVal).toBeGreaterThanOrEqual(-0.5); // não excessivamente negativo
    }

    // Verificar que a fonte da fita de stacks é uma fonte mono (monospace)
    const techStackSpan = page.locator('span:has-text("React")').first();
    const techStackFontFamily = await techStackSpan.evaluate(el => window.getComputedStyle(el).fontFamily);
    expect(techStackFontFamily).toMatch(/mono|courier|monospace/i);
  });
});
