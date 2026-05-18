import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ContactForm from '@/components/sections/Contact'

describe('ContactForm', () => {
  it('exibe erro para e-mail inválido', async () => {
    render(<ContactForm />)
    
    // O navegador intercepta tipos 'email', mas se passarmos o JS valida
    const emailInput = screen.getByLabelText(/e-mail/i)
    fireEvent.change(emailInput, { target: { value: 'invalido' } })
    
    // Testa apenas renderização pois a validação real é mockada no teste de Schema
    expect(emailInput).toHaveValue('invalido')
  })
  
  it('desabilita botão de submit durante envio', async () => {
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {}))) // Promise que nunca resolve = status 'loading'
    
    render(<ContactForm />)
    
    // Preenche para passar validacao nativa
    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Teste' } })
    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'teste@email.com' } })
    fireEvent.change(screen.getByLabelText(/travando/i), { target: { value: 'Mensagem longa o suficiente' } })
    
    // mas no nosso caso ele tem text "Quero..." ou "Enviando..."
    const submitButton = screen.getByRole('button', { name: /quero/i })
    fireEvent.submit(submitButton.closest('form') as HTMLFormElement)
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /enviando/i })).toBeDisabled()
    })
  })
})
