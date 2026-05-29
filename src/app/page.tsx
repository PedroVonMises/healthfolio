import { Suspense } from "react";
import Hero from "@/components/sections/Hero";
import TrustMetrics from "@/components/ui/TrustMetrics";
import TechStack from "@/components/sections/TechStack";
import Services from "@/components/sections/Services";
import ROICalculator from "@/components/sections/ROICalculator";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      {/* Trust metrics below hero — social proof section */}
      <section className="bg-bg py-12 sm:py-16 border-b border-divider">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <TrustMetrics />
        </div>
      </section>
      <TechStack />
      <Services />
      <ROICalculator />
      <Testimonials />
      <Suspense fallback={<div className="h-96 w-full flex items-center justify-center">Carregando Projetos...</div>}>
        <Projects />
      </Suspense>
      <About />
      <Contact />
    </>
  );
}
