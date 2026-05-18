import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Política de privacidade e proteção de dados (LGPD) do portfólio de Pedro Augusto.',
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-bg py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8 prose prose-zinc dark:prose-invert">
        <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl mb-8">
          Política de Privacidade — Pedro Augusto Dev
        </h1>

        <p className="text-sm text-text-muted mb-8">
          <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
        </p>

        <h2 className="text-xl font-semibold text-text mt-8 mb-4">1. Dados coletados</h2>
        <p className="text-text-muted leading-7 mb-6">
          Apenas os dados fornecidos voluntariamente pelo formulário de contato: nome, e-mail e mensagem. 
          Não coletamos dados de navegação identificáveis.
        </p>

        <h2 className="text-xl font-semibold text-text mt-8 mb-4">2. Finalidade e base legal (LGPD Art. 7º)</h2>
        <p className="text-text-muted leading-7 mb-6">
          Responder à solicitação de contato (legítimo interesse, inciso IX).
        </p>

        <h2 className="text-xl font-semibold text-text mt-8 mb-4">3. Armazenamento</h2>
        <p className="text-text-muted leading-7 mb-6">
          Os dados são enviados por e-mail via serviço seguro e não são armazenados em banco de dados neste site.
        </p>

        <h2 className="text-xl font-semibold text-text mt-8 mb-4">4. Analytics</h2>
        <p className="text-text-muted leading-7 mb-6">
          Utilizamos Plausible Analytics: uma ferramenta orientada à privacidade. Trabalhamos apenas com dados agregados, 
          sem uso de cookies e sem identificação pessoal. Nenhum dado é compartilhado com terceiros para fins publicitários.
        </p>

        <h2 className="text-xl font-semibold text-text mt-8 mb-4">5. Direitos do titular (LGPD Art. 18)</h2>
        <p className="text-text-muted leading-7 mb-6">
          Para acesso, correção ou exclusão dos seus dados, entre em contato através do e-mail:{' '}
          <a href="mailto:contato@pedroaugusto.dev" className="text-primary hover:underline">
            contato@pedroaugusto.dev
          </a>
        </p>

        <h2 className="text-xl font-semibold text-text mt-8 mb-4">6. Cookies</h2>
        <p className="text-text-muted leading-7 mb-6">
          Este site não utiliza cookies de rastreamento.
        </p>
      </div>
    </div>
  );
}
