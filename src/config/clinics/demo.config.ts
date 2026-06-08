import { parseClinicConfig, type ClinicConfigInput } from '@/templates/clinic/schema';
import type { ClinicConfig } from '@/templates/clinic/types';

/**
 * Demo / portfolio clinic — a fictional multi-specialty clinic in
 * Praia do Canto, Vitória/ES. Used by the live demo route to sell the
 * offer; the demo uses the `mock` provider so it never writes real data.
 *
 * To deploy for a real client: copy this file, swap the values + theme,
 * and point the route at the new config. The template code is identical.
 */
const config: ClinicConfigInput = {
  slug: 'demo',
  brand: {
    name: 'Clínica Vita Saúde',
    tagline: 'Cuidado médico de especialidades em Vitória, com agenda sob medida.',
    theme: {
      primary: '#0E7C7B',
      accent: '#F4A259',
      font: 'Plus Jakarta Sans',
    },
  },
  contact: {
    phone: '(27) 3322-1100',
    whatsapp: '5527999990000',
    email: 'contato@clinicavitasaude.com.br',
    address: 'Av. Nossa Senhora dos Navegantes, 955 — Praia do Canto, Vitória/ES, 29050-335',
    geo: { lat: -20.301, lng: -40.291 },
    hours: 'Seg a Sex, 8h às 19h · Sáb, 8h às 12h',
  },
  specialties: [
    {
      id: 'cardiologia',
      name: 'Cardiologia',
      icon: 'HeartPulse',
      description: 'Avaliação e acompanhamento de saúde cardiovascular, com exames no local.',
    },
    {
      id: 'dermatologia',
      name: 'Dermatologia',
      icon: 'Sparkles',
      description: 'Dermatologia clínica e estética, da prevenção ao tratamento.',
    },
    {
      id: 'endocrinologia',
      name: 'Endocrinologia',
      icon: 'Activity',
      description: 'Acompanhamento de diabetes, tireoide e distúrbios hormonais.',
    },
    {
      id: 'ortopedia',
      name: 'Ortopedia',
      icon: 'Bone',
      description: 'Diagnóstico e tratamento de lesões e dores articulares.',
    },
  ],
  doctors: [
    {
      id: 'dra-ana-ribeiro',
      name: 'Dra. Ana Ribeiro',
      crm: 'CRM-ES 12345',
      specialtyId: 'cardiologia',
      bio: 'Cardiologista com 12 anos de experiência em prevenção e reabilitação cardíaca.',
    },
    {
      id: 'dr-bruno-costa',
      name: 'Dr. Bruno Costa',
      crm: 'CRM-ES 23456',
      specialtyId: 'dermatologia',
      bio: 'Dermatologista clínico, foco em saúde da pele e procedimentos minimamente invasivos.',
    },
    {
      id: 'dra-carla-mendes',
      name: 'Dra. Carla Mendes',
      crm: 'CRM-ES 34567',
      specialtyId: 'endocrinologia',
      bio: 'Endocrinologista dedicada ao manejo de diabetes e saúde metabólica.',
    },
    {
      id: 'dr-diego-alves',
      name: 'Dr. Diego Alves',
      crm: 'CRM-ES 45678',
      specialtyId: 'ortopedia',
      bio: 'Ortopedista com atuação em medicina esportiva e cirurgia do joelho.',
    },
  ],
  seo: {
    title: 'Clínica de Especialidades na Praia do Canto, Vitória/ES',
    description:
      'Cardiologia, dermatologia, endocrinologia e ortopedia na Praia do Canto, Vitória/ES. Agende sua consulta pelo WhatsApp.',
    city: 'Vitória',
    bairro: 'Praia do Canto',
    keywords: [
      'clínica Vitória ES',
      'clínica Praia do Canto',
      'cardiologista Vitória',
      'dermatologista Vitória',
      'agendar consulta Vitória',
    ],
  },
  booking: {
    // Demo uses the mock provider so the live portfolio never writes real leads.
    provider: 'mock',
  },
  compliance: {
    lgpdConsentText:
      'Autorizo o contato da clínica via WhatsApp e o tratamento dos meus dados para agendamento, conforme a LGPD.',
    privacyPolicyHref: '/privacidade',
  },
  content: {
    hero: {
      headline: 'Sua consulta na Praia do Canto, sem fila e sem complicação',
      sub: 'Especialistas em cardiologia, dermatologia, endocrinologia e ortopedia. Solicite seu horário em menos de um minuto.',
      ctaLabel: 'Agendar consulta',
    },
    about:
      'A Clínica Vita Saúde reúne especialistas em um ambiente acolhedor no coração da Praia do Canto, em Vitória. Atendimento humano, agenda flexível e foco no que importa: o seu cuidado.',
    trust: {
      reviews: [
        {
          author: 'Patrícia G.',
          text: 'Atendimento rápido e atencioso. Consegui marcar pelo WhatsApp em minutos.',
          rating: 5,
        },
        {
          author: 'Rodrigo M.',
          text: 'Estrutura excelente e médicos muito competentes. Recomendo.',
          rating: 5,
        },
        {
          author: 'Letícia A.',
          text: 'Localização ótima na Praia do Canto e equipe super organizada.',
          rating: 5,
        },
      ],
      metrics: [
        { label: 'Pacientes atendidos', value: '12k+' },
        { label: 'Avaliação média', value: '4,9/5' },
        { label: 'Especialidades', value: '4' },
        { label: 'Anos em Vitória', value: '15' },
      ],
    },
  },
};

/** Validated at module load — fail fast if the demo config drifts. */
export const demoClinic: ClinicConfig = parseClinicConfig(config);
