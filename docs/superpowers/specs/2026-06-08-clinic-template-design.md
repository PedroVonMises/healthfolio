# Design — "Modelo Clínica": config-driven clinic site + booking funnel template

**Date:** 2026-06-08
**Status:** Approved (Pedro, 2026-06-08) — ready for implementation plan
**Repo:** PedroVonMises/healthfolio · branch `feat/clinic-template` (off `origin/main` @ f257323)
**Source:** Healthfolio offer #2 in the RMGV GTM offer shortlist (Growth Swarm research, vault `Projects/healthfolio/2026-06-08 — RMGV Private-Clinic Market & GTM Offer Shortlist.md`)

## For future Claude / context

This is offer #2 in Pedro's approved Healthfolio GTM sequence (#2 site+booking wedge → #1 WhatsApp suite → #3 LGPD stack). It is the cheap, fast **entry product** that lands a clinic logo and opens a retainer. The strategic intent: **build once, resell many** — one config-driven template that (a) renders a sample clinic as a live portfolio demo to sell the offer, and (b) deploys per real client by swapping config + theme. The booking funnel deliberately does **not** become an EMR/scheduling engine — it captures a booking *request* + LGPD consent and hands off to the clinic via WhatsApp, leaving real-time EMR/calendar sync as the upsell into offer #1.

The repo already has the right primitives — compose them, don't reinvent:
`src/lib/projects.ts` (centralized data) · `src/lib/validations.ts` (Zod) · `src/components/sections/*` (Hero, Services, Projects, ROICalculator, Testimonials, Contact) · `src/components/ui/*` (`WhatsappButton`, `LocalPresenceMap` (OpenStreetMap), `BeforeAfterSlider`, `TrustMetrics`, `FadeIn`, `MagneticButton`, `Button`) · `src/components/seo/JsonLd.tsx` · `src/app/actions/contact.ts` (server-action + rate-limit pattern) · `src/app/privacidade` (LGPD) · `src/app/sitemap.ts`, `robots.ts`.

Stack: Next.js 15 (App Router, typed routes) · React 19 · TypeScript strict · Tailwind v4 (design tokens) · Framer Motion · Vitest + Testing Library · Playwright. QA bar: WCAG AA, strict CSP, `lighthouse-budget.json`.

## 1. Architecture & placement

- **`src/templates/clinic/`** — the reusable template (page composition + booking funnel + types). Self-contained, one purpose.
- **`src/config/clinics/<slug>.config.ts`** — per-clinic config implementing a Zod-validated `ClinicConfig`. Ships a `demo` sample config.
- **Two render paths from one codebase:**
  - *Demo (portfolio):* `src/app/demo/clinica/page.tsx` renders the `demo` config as a live clinic site; linked from the `Projects`/`Services` section. This is what prospects see.
  - *Per client:* deploy with the client's config + theme tokens. Identical template code.
- **Theming:** the config's `theme` block (primary/accent colors, logo, font scale) maps to Tailwind v4 CSS variables applied at the template root — rebrand without touching component code.

## 2. `ClinicConfig` schema (Zod-validated, in `src/templates/clinic/types.ts` + `schema.ts`)

```
ClinicConfig {
  slug: string
  brand: { name; logoUrl?; tagline; theme: { primary; accent; font? } }
  contact: { phone; whatsapp (E.164 digits); email?; address; geo: { lat; lng }; hours }
  specialties: { id; name; icon?; description? }[]
  doctors: { id; name; crm; specialtyId; photoUrl?; bio? }[]
  seo: { title; description; city; bairro?; keywords: string[] }   // drives meta + JSON-LD areaServed
  booking: { provider: 'whatsappLead' | 'mock'; options?: Record<string, unknown> }
  compliance: { lgpdConsentText; privacyPolicyHref }
  content: { hero: { headline; sub; ctaLabel }; about?; trust?: { reviews?; metrics? } }
}
```
Validation reuses the `src/lib/validations.ts` Zod conventions. A config that fails validation throws at build/render with a clear message (fail fast, never render a half-configured clinic).

## 3. Booking funnel + `BookingProvider` adapter (the heart)

- **Funnel UI** (`src/templates/clinic/booking/`): mobile-first multi-step — `specialty → doctor → date/time (requested) → patient details + LGPD consent → confirm`. Step state via a small reducer (pure, unit-testable). Built from existing UI primitives + Framer Motion. **Submit is disabled until the LGPD consent checkbox is checked.**
- **`BookingProvider` interface:**
  ```
  interface BookingProvider {
    id: string
    getAvailability?(doctorId, dateRange): Promise<Slot[]>   // optional; unused by MVP providers
    submitBooking(payload: BookingPayload): Promise<BookingResult>
  }
  BookingResult = { ok: boolean; whatsappUrl?: string; message: string }
  ```
- **Shipped providers (`src/templates/clinic/booking/providers/`):**
  1. **`whatsappLeadProvider` (DEFAULT, production)** — invoked via a server action (`src/app/actions/booking.ts`, mirroring `contact.ts`): Zod-validate payload → insert lead into **Supabase** table `booking_leads` (fields: clinic_slug, specialty, doctor, requested_at, patient_name, patient_phone, consent: true, consent_at, created_at) → build a prefilled `wa.me/<whatsapp>?text=<encoded summary>` URL → return `{ ok, whatsappUrl, message }`. **Fallback: if the Supabase insert fails, still return the WhatsApp URL — never lose the lead.** Supabase client reads `NEXT_PUBLIC_SUPABASE_URL` + a server-only key from env; if env is absent, provider degrades to WhatsApp-only (logs a warning), so the template runs with zero backend config.
  2. **`mockProvider` (DEMO)** — no network, no storage; returns `{ ok:true, message:'(demo) Solicitação recebida' }`. Used by the portfolio `demo` config so the live demo never writes real data.
- **Stubbed, NOT built (YAGNI — these are the offer-#1 upsell):** `googleCalendarProvider`, iClinic/Feegow EMR adapters. Leave an interface + a one-line `// TODO: per-client adapter` so the extension point is obvious.
- **Data flow:** funnel → `submitBooking` server action → provider → `BookingResult` → client opens `whatsappUrl` (new tab) and shows the confirmation message.

## 4. Local SEO (MVP scope)

- Per-config `seo` drives `<title>`/meta (city + bairro in title and H1) and a `JsonLd` `MedicalClinic`/`MedicalBusiness` block with `areaServed` = city/bairro, NAP (name/address/phone) consistent for Google Business Profile.
- Sitemap: the `demo` route is added to `src/app/sitemap.ts`.
- **Phase 2 (explicitly OUT of MVP):** dedicated geo-landing routes per city (Vitória/Serra/Vila Velha). MVP ships strong *on-page* local SEO only.

## 5. Error handling

- Zod validation client- and server-side; user-friendly PT-BR error messages.
- Consent required to enable submit (UI + server re-check).
- Graceful WhatsApp-link fallback on any backend failure (lead is never silently dropped).
- Rate-limit the booking server action (reuse the `contact.ts` rate-limit approach).
- CSP: ensure `wa.me`/`api.whatsapp.com` and the Supabase origin are allowed in `next.config.ts` without weakening existing rules.

## 6. Testing (must meet the repo's existing bar)

- **Vitest (unit):** `ClinicConfig` schema (valid + invalid fixtures), provider selection, `wa.me` URL builder (encoding, E.164), funnel step reducer transitions, consent gating logic.
- **Testing Library:** funnel renders each step; submit disabled until consent; error fallback path surfaces the WhatsApp link.
- **Playwright (E2E):** full funnel happy path on the `demo` config (uses `mockProvider`), mobile viewport, WCAG AA keyboard navigation through all steps.
- **Lighthouse:** the `demo` route passes `lighthouse-budget.json`.

## 7. Explicitly OUT of scope (YAGNI)

- No EMR / scheduling engine; no real-time availability in MVP (date/time is a *request*; clinic confirms via WhatsApp).
- No multi-tenant runtime (one deploy per clinic).
- No admin CMS (config is code, edited per deploy).
- Geo-landing pages beyond on-page SEO (Phase 2).
- EMR/Google-Calendar adapters (offer-#1 upsell; interface stub only).

## 8. Delivery

Implementation plan via `writing-plans` → TDD build on `feat/clinic-template` → demo renders in portfolio + green Vitest/Playwright/lighthouse → **draft PR to `main`, human merge** (governance: draft-only, never push to a default branch). QA pass by `qa-reviewer` before the PR is marked ready.
