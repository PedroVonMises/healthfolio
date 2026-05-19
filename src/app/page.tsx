import { Suspense } from "react";
import Hero from "@/components/sections/Hero";
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
