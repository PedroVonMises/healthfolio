"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        company: formData.get('company'),
        message: formData.get('message'),
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section id="contato" className="bg-surface py-24 sm:py-32 border-t border-divider">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-primary">Contato</h2>
          <p className="mt-2 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl text-balance">
            Pronto para transformar sua clínica?
          </p>
          <p className="mt-6 text-lg leading-8 text-text-muted">
            Preencha o formulário abaixo para agendarmos uma conversa sobre as necessidades tecnológicas do seu negócio.
          </p>
        </div>

        <div className="mx-auto max-w-xl">
          {status === 'success' ? (
            <div className="rounded-xl bg-primary-highlight p-8 text-center ring-1 ring-inset ring-primary/20">
              <h3 className="font-display text-2xl font-semibold text-primary mb-2">Mensagem enviada!</h3>
              <p className="text-text-muted mb-6">Agradeço o contato. Retornarei o mais breve possível.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="text-sm font-semibold text-primary hover:text-primary-hover"
              >
                Enviar nova mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 bg-bg p-8 rounded-2xl shadow-sm ring-1 ring-border">
              {status === 'error' && (
                <div role="alert" className="rounded-md bg-red-50 p-4 mb-6 ring-1 ring-red-200">
                  <p className="text-sm text-red-800">
                    Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.
                  </p>
                </div>
              )}
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-text">
                  Nome
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="block w-full rounded-md border-0 py-2.5 px-4 text-text shadow-sm ring-1 ring-inset ring-border placeholder:text-text-faint focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-surface-2"
                    placeholder="Seu nome"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-text">
                  E-mail
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="block w-full rounded-md border-0 py-2.5 px-4 text-text shadow-sm ring-1 ring-inset ring-border placeholder:text-text-faint focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-surface-2"
                    placeholder="voce@exemplo.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium leading-6 text-text">
                  Nome da Clínica <span className="text-text-faint font-normal">(Opcional)</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="company"
                    id="company"
                    className="block w-full rounded-md border-0 py-2.5 px-4 text-text shadow-sm ring-1 ring-inset ring-border placeholder:text-text-faint focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-surface-2"
                    placeholder="Sua Clínica"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium leading-6 text-text">
                  Mensagem
                </label>
                <div className="mt-2">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="block w-full rounded-md border-0 py-2.5 px-4 text-text shadow-sm ring-1 ring-inset ring-border placeholder:text-text-faint focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-surface-2"
                    placeholder="Como posso ajudar a sua clínica?"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-4">
                <p className="text-xs text-text-muted">
                  Seus dados são usados apenas para responder ao seu contato.{' '}
                  <Link href="/privacidade" className="underline hover:text-text transition-colors">
                    Política de Privacidade
                  </Link>
                </p>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-text-inverse shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {status === 'loading' ? 'Enviando...' : 'Enviar'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
