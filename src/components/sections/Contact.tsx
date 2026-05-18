"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';
import { Send, CheckCircle2, AlertCircle, MessageCircle } from 'lucide-react';

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
        <FadeIn delay={0.1}>
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-primary flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4" /> Contato Direto
            </h2>
            <p className="mt-2 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl text-balance">
              Vamos eliminar os gargalos da sua clínica?
            </p>
            <p className="mt-6 text-base leading-7 text-text-muted">
              Conte sobre a sua especialidade e os desafios atuais. Responderei em até 24 horas para agendarmos uma análise de viabilidade técnica gratuita.
            </p>
          </div>
        </FadeIn>

        <div className="mx-auto max-w-xl">
          {status === 'success' ? (
            <FadeIn>
              <div className="rounded-2xl bg-primary-highlight p-10 text-center ring-1 ring-inset ring-primary/20 shadow-lg shadow-primary/5">
                <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-6" strokeWidth={1.5} />
                <h3 className="font-display text-2xl font-semibold text-primary mb-2">Mensagem enviada!</h3>
                <p className="text-text-muted mb-8">Agradeço o contato. Retornarei o mais breve possível para entendermos os desafios da sua clínica.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-primary shadow-sm hover:bg-surface transition-all ring-1 ring-inset ring-primary/20"
                >
                  Enviar nova mensagem
                </button>
              </div>
            </FadeIn>
          ) : (
            <FadeIn delay={0.2}>
              <form onSubmit={handleSubmit} className="space-y-6 bg-bg p-8 rounded-2xl shadow-md shadow-black/5 ring-1 ring-border">
                {status === 'error' && (
                  <div role="alert" className="rounded-md bg-red-50 p-4 mb-6 ring-1 ring-red-200 flex gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
                    <p className="text-sm text-red-800">
                      Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.
                    </p>
                  </div>
                )}
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-text">
                  Seu nome
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="block w-full rounded-md border-0 py-2.5 px-4 text-text shadow-sm ring-1 ring-inset ring-border placeholder:text-text-faint focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-surface-2"
                    placeholder="Dr. João Silva"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-text">
                  E-mail profissional
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="block w-full rounded-md border-0 py-2.5 px-4 text-text shadow-sm ring-1 ring-inset ring-border placeholder:text-text-faint focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-surface-2"
                    placeholder="joao@suaclinica.com.br"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium leading-6 text-text">
                  Clínica / Especialidade <span className="text-text-faint font-normal">(Opcional)</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="company"
                    id="company"
                    className="block w-full rounded-md border-0 py-2.5 px-4 text-text shadow-sm ring-1 ring-inset ring-border placeholder:text-text-faint focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-surface-2"
                    placeholder="Clínica OrtoPédica — Vitória"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium leading-6 text-text">
                  O que está travando sua clínica?
                </label>
                <div className="mt-2">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="block w-full rounded-md border-0 py-2.5 px-4 text-text shadow-sm ring-1 ring-inset ring-border placeholder:text-text-faint focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-surface-2"
                    placeholder="Contamos com um sistema antigo..."
                  />
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <p className="text-xs text-text-muted leading-relaxed">
                  Seus dados são usados apenas para responder ao seu contato.{' '}
                  <Link href="/privacidade" className="underline hover:text-text transition-colors">
                    Política de Privacidade
                  </Link>
                </p>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="group flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-text-inverse shadow-md shadow-primary/20 hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5 w-full sm:w-auto"
                >
                  {status === 'loading' ? 'Enviando...' : (
                    <>
                      Quero uma análise gratuita
                      <Send className="h-4 w-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  );
}
