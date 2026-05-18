import { NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { headers } from 'next/headers';
import { Resend } from 'resend';
import { ContactSchema } from '@/lib/validations';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy');

// Initialize Redis only if tokens are provided (to prevent crashing in dev without env vars)
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

let ratelimit: Ratelimit | null = null;

if (redisUrl && redisToken) {
  ratelimit = new Ratelimit({
    redis: new Redis({
      url: redisUrl,
      token: redisToken,
    }),
    limiter: Ratelimit.slidingWindow(3, '1 h'),
  });
}

export async function POST(req: Request) {
  try {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') ?? 'anonymous';
    
    // Apply rate limiting if Redis is configured
    if (ratelimit) {
      const { success } = await ratelimit.limit(ip);
      if (!success) {
        return NextResponse.json({ error: 'Muitas requisições. Tente novamente mais tarde.' }, { status: 429 });
      }
    }

    const body = await req.json();
    const parsed = ContactSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { name, email, company, message } = parsed.data;

    // Send email via Resend
    // Skip if RESEND_API_KEY is not set (e.g., local development without env vars)
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Portfolio <contato@pedroaugusto.dev>',
        to: process.env.CONTACT_EMAIL || 'contato@pedroaugusto.dev',
        subject: `Novo Contato: ${company ? `${name} da ${company}` : name}`,
        text: `Nome: ${name}\nE-mail: ${email}\nClínica: ${company || 'Não informada'}\n\nMensagem:\n${message}`,
        replyTo: email,
      });
    } else {
      console.warn('RESEND_API_KEY is not set. Email not sent.');
      console.log('Would have sent:', { name, email, company, message });
    }

    // LGPD: Data is not persisted in any database, only sent via email
    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
