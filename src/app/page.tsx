import Hero from "@/components/sections/Hero";
import TechStack from "@/components/sections/TechStack";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <TechStack />
      <Services />
      <Projects />
      <About />
      <Contact />
    </>
  );
}
