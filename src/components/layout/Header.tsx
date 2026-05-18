import React from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <div className="flex flex-1 items-center gap-x-6">
          <Link href="/" className="-m-1.5 p-1.5 text-lg font-display font-bold text-text">
            Pedro Augusto<span className="text-primary">.</span>
          </Link>
        </div>
        <nav className="hidden md:flex gap-x-8">
          <Link href="#especializacao" className="text-sm font-semibold leading-6 text-text-muted hover:text-text transition-colors">
            Especialização
          </Link>
          <Link href="#projetos" className="text-sm font-semibold leading-6 text-text-muted hover:text-text transition-colors">
            Cases de Sucesso
          </Link>
          <Link href="#sobre" className="text-sm font-semibold leading-6 text-text-muted hover:text-text transition-colors">
            Sobre Mim
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end gap-x-4">
          <ThemeToggle />
          <a
            href="#contato"
            className="hidden sm:inline-flex text-sm font-semibold leading-6 text-text hover:text-primary transition-colors"
          >
            Fale Comigo <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </header>
  );
}
