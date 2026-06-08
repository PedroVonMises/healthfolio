import { z } from 'zod';

/* ------------------------------------------------------------------ */
/* Reusable primitives (mirrors src/lib/validations.ts conventions)    */
/* ------------------------------------------------------------------ */

/** CSS hex color, e.g. `#C8102E` or `#fff`. */
const HexColor = z
  .string()
  .regex(/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Cor deve ser um hex válido (ex.: #C8102E)');

/** E.164 phone, digits only (no `+`, spaces or punctuation), e.g. `5527999990000`. */
const E164Digits = z
  .string()
  .regex(/^\d{10,15}$/, 'Telefone deve estar em formato E.164 só-dígitos (ex.: 5527999990000)');

const Slug = z
  .string()
  .min(1)
  .regex(/^[a-z0-9-]+$/, 'Slug deve conter apenas letras minúsculas, números e hífen');

/* ------------------------------------------------------------------ */
/* ClinicConfig                                                        */
/* ------------------------------------------------------------------ */

const SpecialtySchema = z.object({
  id: Slug,
  name: z.string().min(2).max(80).trim(),
  icon: z.string().min(1).optional(),
  description: z.string().max(280).trim().optional(),
});

const DoctorSchema = z.object({
  id: Slug,
  name: z.string().min(2).max(120).trim(),
  /** Conselho Regional de Medicina id, e.g. `CRM-ES 12345`. */
  crm: z
    .string()
    .regex(/^CRM-[A-Z]{2}\s?\d{3,6}$/, 'CRM inválido (ex.: CRM-ES 12345)'),
  specialtyId: Slug,
  photoUrl: z.string().optional(),
  bio: z.string().max(400).trim().optional(),
});

export const ClinicConfigSchema = z
  .object({
    slug: Slug,
    brand: z.object({
      name: z.string().min(2).max(120).trim(),
      logoUrl: z.string().optional(),
      tagline: z.string().min(2).max(160).trim(),
      theme: z.object({
        primary: HexColor,
        accent: HexColor,
        /** Optional display font family applied at the template root. */
        font: z.string().min(1).optional(),
      }),
    }),
    contact: z.object({
      phone: z.string().min(8).max(20),
      whatsapp: E164Digits,
      email: z.string().email().optional(),
      address: z.string().min(4).max(200).trim(),
      geo: z.object({
        lat: z.number().min(-90).max(90),
        lng: z.number().min(-180).max(180),
      }),
      hours: z.string().min(2).max(120).trim(),
    }),
    specialties: z.array(SpecialtySchema).min(1, 'Informe ao menos uma especialidade'),
    doctors: z.array(DoctorSchema).min(1, 'Informe ao menos um médico'),
    seo: z.object({
      title: z.string().min(4).max(70),
      description: z.string().min(10).max(180),
      city: z.string().min(2).max(80).trim(),
      bairro: z.string().min(2).max(80).trim().optional(),
      /** UF (two-letter Brazilian state). Defaults to ES for back-compat. */
      state: z.string().length(2).toUpperCase().default('ES'),
      keywords: z.array(z.string().min(2)).min(1),
    }),
    booking: z.object({
      provider: z.enum(['whatsappLead', 'mock']),
      options: z.record(z.string(), z.unknown()).optional(),
    }),
    compliance: z.object({
      lgpdConsentText: z.string().min(10).max(400).trim(),
      privacyPolicyHref: z.string().min(1),
    }),
    content: z.object({
      hero: z.object({
        headline: z.string().min(4).max(120),
        sub: z.string().min(4).max(280),
        ctaLabel: z.string().min(2).max(40),
      }),
      about: z.string().max(800).trim().optional(),
      trust: z
        .object({
          reviews: z
            .array(
              z.object({
                author: z.string().min(2).max(80),
                text: z.string().min(4).max(400),
                rating: z.number().min(1).max(5).optional(),
              }),
            )
            .optional(),
          metrics: z
            .array(
              z.object({
                label: z.string().min(2).max(60),
                value: z.string().min(1).max(20),
              }),
            )
            .optional(),
        })
        .optional(),
    }),
  })
  // Referential integrity: every doctor must point at a declared specialty.
  .refine(
    (cfg) => cfg.doctors.every((d) => cfg.specialties.some((s) => s.id === d.specialtyId)),
    { message: 'Todo médico deve referenciar uma especialidade existente', path: ['doctors'] },
  );

/**
 * Input shape for authoring a config (before defaults are applied) — e.g.
 * `seo.state` is optional here but always present after parsing. Use this to
 * type raw config literals; `ClinicConfig` (output) is what `parseClinicConfig`
 * returns.
 */
export type ClinicConfigInput = z.input<typeof ClinicConfigSchema>;

/**
 * Parse + fail fast. Throws a clear error if the config is malformed, so a
 * half-configured clinic never renders.
 */
export function parseClinicConfig(input: unknown): import('./types').ClinicConfig {
  const result = ClinicConfigSchema.safeParse(input);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `${i.path.join('.') || '(root)'}: ${i.message}`)
      .join('; ');
    throw new Error(`ClinicConfig inválido — ${issues}`);
  }
  return result.data;
}

/* ------------------------------------------------------------------ */
/* Booking payload                                                     */
/* ------------------------------------------------------------------ */

export const BookingPayloadSchema = z.object({
  clinicSlug: Slug,
  specialtyId: Slug,
  doctorId: Slug,
  /** Requested datetime (local) as `YYYY-MM-DDTHH:mm`; not a confirmed slot. */
  requestedAt: z.string().min(1, 'Selecione uma data e horário desejados'),
  patientName: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres').max(120).trim(),
  patientPhone: z
    .string()
    .regex(/^\d{10,15}$/, 'Telefone deve conter apenas dígitos (DDD + número)'),
  /** LGPD: explicit consent is mandatory — `false` is rejected. */
  consent: z.literal(true, { message: 'É necessário aceitar os termos de privacidade (LGPD)' }),
});
