'use server';

import { Resend } from 'resend';
import { ContactSchema } from '@/lib/validations';
import { headers } from 'next/headers';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy');
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

let ratelimit: Ratelimit | null = null;

if (redisUrl && redisToken) {
  ratelimit = new Ratelimit({
    redis: new Redis({ url: redisUrl, token: redisToken }),
    limiter: Ratelimit.slidingWindow(3, '1 h'),
  });
}

export type ActionState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function submitContactForm(prevState: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') ?? 'anonymous';
    
    if (ratelimit) {
      const { success } = await ratelimit.limit(ip);
      if (!success) {
        return { status: 'error', message: 'Muitas requisições. Tente novamente mais tarde.' };
      }
    }

    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      message: formData.get('message'),
    };

    const parsed = ContactSchema.safeParse(data);
    
    if (!parsed.success) {
      return { 
        status: 'error', 
        message: 'Dados inválidos.',
        fieldErrors: parsed.error.flatten().fieldErrors 
      };
    }

    const { name, email, company, message } = parsed.data;

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Portfolio <contato@pedroaugusto.dev>',
        to: process.env.CONTACT_EMAIL || 'contato@pedroaugusto.dev',
        subject: `Novo Contato: ${company ? `${name} da ${company}` : name}`,
        text: `Nome: ${name}\nE-mail: ${email}\nClínica: ${company || 'Não informada'}\n\nMensagem:\n${message}`,
        replyTo: email,
      });
    } else {
      console.warn('RESEND_API_KEY is not set. Email not sent. [PII Redacted for LGPD compliance]');
    }

    return { status: 'success' };
  } catch (error) {
    console.error('Error processing contact form:', error);
    return { status: 'error', message: 'Erro interno do servidor' };
  }
}
