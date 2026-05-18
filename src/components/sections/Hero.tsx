import Spotlight from '@/components/ui/Spotlight';
import FadeIn from '@/components/ui/FadeIn';
import MagneticButton from '@/components/ui/MagneticButton';
import DigitalClock from '@/components/ui/DigitalClock';
import TrustMetrics from '@/components/ui/TrustMetrics';

export default function Hero() {
  return (
    <section className="relative bg-bg pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pb-32">
      <Spotlight className="absolute inset-0 z-0" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn delay={0.1}>
            <div className="mb-8 flex justify-center">
              <span className="rounded-full bg-primary-highlight px-3 py-1 text-sm font-semibold leading-6 text-primary ring-1 ring-inset ring-primary/20 shadow-sm shadow-primary/10">
                Especialista em Saúde Digital na Grande Vitória
              </span>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <h1 className="font-display text-4xl font-bold tracking-tight text-text sm:text-6xl text-balance">
              Aumente a conversão de pacientes e reduza o no-show.
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <p className="mt-6 text-lg leading-8 text-text-muted text-balance">
              Desenvolvo portais de agendamento modernos e dashboards clínicos sob medida para clínicas privadas.
              Entregue uma experiência digital de ponta que seus pacientes esperam e sua clínica merece.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.4}>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <MagneticButton
                href="#contato"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-text-inverse shadow-md shadow-primary/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-300 ring-1 ring-primary-active/50 hover:ring-primary-highlight"
              >
                <span>Agendar Avaliação</span>
                <DigitalClock />
              </MagneticButton>
              <a
                href="#projetos"
                className="text-sm font-semibold leading-6 text-text hover:text-primary transition-colors duration-300 group flex items-center gap-2"
              >
                Ver Casos de Sucesso <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
            </div>
          </FadeIn>
          
          {/* Métricas de conversão para o público-alvo */}
          <TrustMetrics />
        </div>
      </div>
    </section>
  );
}
