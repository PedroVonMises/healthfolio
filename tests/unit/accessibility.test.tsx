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
