import type { Metadata } from "next";
import Script from "next/script";
import { PersonJsonLd } from "@/components/seo/JsonLd";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackgroundBlobs from "@/components/ui/BackgroundBlobs";
import MotionProvider from "@/components/ui/MotionProvider";
import { PageTransition } from "@/components/ui/PageTransition";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://pedroaugusto.dev"),
  title: {
    default: "Pedro Augusto — Dev Front-end | Saúde Digital | React",
    template: "%s | Pedro Augusto Dev",
  },
  description:
    "Desenvolvimento front-end especializado em saúde digital na Grande Vitória – ES. Portais de paciente, agendamento online e dashboards clínicos em React/Next.js.",
  keywords: [
    "dev front-end saúde",
    "React saúde digital",
    "portal paciente",
    "Next.js Vitória ES",
  ],
  authors: [{ name: "Pedro Augusto", url: process.env.NEXT_PUBLIC_SITE_URL }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Pedro Augusto Dev",
    images: [
      {
        url: "/og/default.png",
        width: 1200,
        height: 630,
        alt: "Pedro Augusto — Dev Front-end Saúde Digital",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=zodiak@400,500,700&f[]=general-sans@400,500,600&display=swap"
          rel="stylesheet"
        />
        <PersonJsonLd />
      </head>
      <body className="min-h-screen flex flex-col font-sans relative">
        <MotionProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Pular para o conteúdo principal
          </a>
          <BackgroundBlobs />
          <Header />
          <main id="main-content" className="flex-1 relative z-10 flex flex-col">
            <NuqsAdapter>
              <PageTransition>{children}</PageTransition>
            </NuqsAdapter>
          </main>
          <Footer />
        </MotionProvider>
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <Script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
