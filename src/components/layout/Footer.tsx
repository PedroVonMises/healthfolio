import React from 'react';
import Link from 'next/link';
import FadeIn from '@/components/ui/FadeIn';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-divider pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn delay={0.1}>
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            {/* Brand & Mission */}
            <div className="space-y-6 xl:col-span-1">
              <Link href="/" className="text-xl font-display font-bold text-text group">
                Pedro Augusto<span className="text-primary group-hover:animate-pulse">.</span>
              </Link>
              <p className="text-sm leading-6 text-text-muted max-w-xs">
                Especialista em desenvolvimento front-end para a saúde digital. 
                Transformando a jornada do paciente através de tecnologia e design na Grande Vitória.
              </p>
              <div className="flex space-x-5">
                {/* LinkedIn Icon */}
                <a href="https://linkedin.com/in/pedroaugusto" target="_blank" rel="noopener noreferrer" className="text-text-faint hover:text-primary transition-colors hover:-translate-y-1 transform duration-300">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>
                {/* GitHub Icon */}
                <a href="https://github.com/pedroaugusto" target="_blank" rel="noopener noreferrer" className="text-text-faint hover:text-text transition-colors hover:-translate-y-1 transform duration-300">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Navigation Links */}
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-text font-display">Navegação</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <Link href="#especializacao" className="group flex items-center text-sm leading-6 text-text-muted hover:text-primary transition-colors">
                        <span className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 mr-1 text-primary">›</span>
                        Especialização
                      </Link>
                    </li>
                    <li>
                      <Link href="#projetos" className="group flex items-center text-sm leading-6 text-text-muted hover:text-primary transition-colors">
                        <span className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 mr-1 text-primary">›</span>
                        Cases de Sucesso
                      </Link>
                    </li>
                    <li>
                      <Link href="#sobre" className="group flex items-center text-sm leading-6 text-text-muted hover:text-primary transition-colors">
                        <span className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 mr-1 text-primary">›</span>
                        Sobre Mim
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-text font-display">Contato</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <Link href="#contato" className="group flex items-center text-sm leading-6 text-text-muted hover:text-primary transition-colors">
                        <span className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 mr-1 text-primary">›</span>
                        Fale Comigo
                      </Link>
                    </li>
                    <li>
                      <a href="mailto:contato@pedroaugusto.dev" className="text-sm leading-6 text-text-muted hover:text-primary transition-colors hover:underline underline-offset-4">
                        contato@pedroaugusto.dev
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-1 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-text font-display">Legal</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <Link href="/privacidade" className="group flex items-center text-sm leading-6 text-text-muted hover:text-primary transition-colors">
                        <span className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 mr-1 text-primary">›</span>
                        Política de Privacidade
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Copyright */}
          <div className="mt-16 border-t border-divider pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs leading-5 text-text-faint">
              &copy; {new Date().getFullYear()} Pedro Augusto. Todos os direitos reservados.
            </p>
            <p className="text-xs leading-5 text-text-faint mt-2 md:mt-0 flex items-center gap-1">
              Desenvolvido com <span className="text-primary animate-pulse">❤</span> em React, Next.js e Tailwind CSS.
            </p>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
