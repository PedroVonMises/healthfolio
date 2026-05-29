import React from "react";
import FadeIn from "@/components/ui/FadeIn";
import { StaggerContainer } from "@/components/ui/FadeIn";
import { CalendarClock, ShieldCheck, Activity, Lock } from "lucide-react";
import CyberneticGridShader from "@/components/ui/cybernetic-grid-shader";

const services = [
  {
    id: 1,
    title: "Agendamentos 24/7 sem depender da recepção",
    description:
      "Transforme o WhatsApp da clínica em uma máquina de conversão. Pacientes marcam e desmarcam consultas sozinhos, reduzindo em até 40% o tempo perdido pela sua equipe.",
    icon: <CalendarClock className="h-6 w-6 text-primary" strokeWidth={1.5} />,
    featured: true,
  },
  {
    id: 4,
    title: "Segurança absoluta contra vazamentos (LGPD)",
    description:
      "Toda a arquitetura digital é desenhada com criptografia de ponta a ponta, garantindo a privacidade total dos dados dos seus pacientes.",
    icon: <Lock className="h-6 w-6 text-primary" strokeWidth={1.5} />,
    featured: false,
  },
  {
    id: 3,
    title: "Controle total sobre o seu faturamento",
    description:
      "Substitua planilhas confusas por um painel gerencial em tempo real. Saiba exatamente qual convênio traz mais retorno e qual a taxa real de ocupação da sua agenda.",
    icon: <Activity className="h-6 w-6 text-primary" strokeWidth={1.5} />,
    featured: false,
  },
  {
    id: 2,
    title: "Uma experiência premium de ponta a ponta",
    description:
      "Diferencie-se da concorrência oferecendo um ambiente seguro onde o paciente acessa resultados de exames, laudos e histórico médico na palma da mão.",
    icon: <ShieldCheck className="h-6 w-6 text-primary" strokeWidth={1.5} />,
    featured: false,
  },
];

export default function Services() {
  const featured = services.find((s) => s.featured)!;
  const rest = services.filter((s) => !s.featured);

  return (
    <section
      id="especializacao"
      className="bg-surface py-24 sm:py-32 border-y border-divider relative overflow-hidden"
    >
      {/* CSS grid shader background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-30">
        <CyberneticGridShader />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="mx-auto max-w-2xl lg:text-center">
            <p className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl text-balance">
              A tecnologia deve trabalhar pela sua clínica, não o contrário.
            </p>
            <p className="mt-6 text-base leading-7 text-text-muted text-balance">
              Sistemas genéricos criam mais problemas do que resolvem. Projetos
              sob medida eliminam o atrito na jornada do paciente e devolvem o
              controle operacional para o sócio-médico.
            </p>
          </div>
        </FadeIn>

        {/* Asymmetric Bento Grid — 1 featured tile (large) + 3 supporting tiles */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto"
            staggerDelay={0.1}
          >
            {/* Featured tile — spans 2 columns on desktop */}
            <FadeIn className="md:col-span-2 md:row-span-2">
              <dl
                className="relative flex flex-col rounded-3xl bg-gradient-to-br from-bg via-bg to-primary-highlight/15 p-8 lg:p-10 shadow-sm ring-1 ring-border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:ring-primary/40 h-full overflow-hidden group"
              >
                {/* Glassmorphism subtle flare on hover */}
                <div className="absolute -inset-x-4 -inset-y-4 z-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full duration-1000 transform transition-all pointer-events-none" />

                <dt className="relative z-10 flex flex-col items-start gap-y-4 text-base font-semibold leading-7 text-text">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20 shadow-sm group-hover:scale-110 group-hover:bg-primary-highlight transition-all duration-300">
                    {featured.icon}
                  </div>
                  <span className="text-xl lg:text-2xl font-display font-bold tracking-tight">
                    {featured.title}
                  </span>
                </dt>
                <dd className="relative z-10 mt-4 flex flex-auto flex-col text-base leading-7 text-text-muted">
                  <p className="flex-auto max-w-prose">{featured.description}</p>
                </dd>

                {/* Decorative accent stripe */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/60 via-primary/30 to-transparent" />
              </dl>
            </FadeIn>

            {/* Supporting tiles — each 1 column */}
            {rest.map((service, idx) => (
              <FadeIn key={service.id}>
                <dl
                  className={`relative flex flex-col rounded-3xl p-8 shadow-sm ring-1 ring-border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:ring-primary/40 h-full overflow-hidden group ${
                    idx === 0
                      ? "bg-gradient-to-br from-bg to-primary-highlight/10"
                      : "bg-bg"
                  }`}
                >
                  <div className="absolute -inset-x-4 -inset-y-4 z-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full duration-1000 transform transition-all pointer-events-none" />

                  <dt className="relative z-10 flex flex-col items-start gap-y-4 text-base font-semibold leading-7 text-text">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-offset ring-1 ring-border shadow-sm group-hover:scale-110 group-hover:bg-primary-highlight transition-all duration-300">
                      {service.icon}
                    </div>
                    {service.title}
                  </dt>
                  <dd className="relative z-10 mt-4 flex flex-auto flex-col text-base leading-7 text-text-muted">
                    <p className="flex-auto">{service.description}</p>
                  </dd>
                </dl>
              </FadeIn>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
