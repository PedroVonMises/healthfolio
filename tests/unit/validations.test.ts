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
