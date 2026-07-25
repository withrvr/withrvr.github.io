import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Achievements from "@/components/sections/Achievements";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import { GrainOverlay, DoodleField } from "@/components/ui/PageTexture";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="flex flex-col">
      <Hero />
      <GrainOverlay />
      <div className="relative">
        <DoodleField />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Education />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
