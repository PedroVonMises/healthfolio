import { z } from 'zod';

export const ContactSchema = z.object({
  name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres").max(100).trim(),
  email: z.string().email("E-mail inválido").max(254).toLowerCase().trim(),
  company: z.string().max(100).trim().optional(),
  message: z.string().min(10, "Mensagem deve ter no mínimo 10 caracteres").max(2000).trim(),
});

export type ContactFormData = z.infer<typeof ContactSchema>;
