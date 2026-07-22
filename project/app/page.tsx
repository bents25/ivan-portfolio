import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import TrustBadges from '@/components/TrustBadges';
import Projects from '@/components/Projects';
import AutomationProcess from '@/components/AutomationProcess';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import projectsData from '@/data/projects.json';
import type { Project } from '@/types/project';

export default function Home() {
  const projects = projectsData as Project[];

  return (
    <main>
      <Navigation />
      <Hero />
      <TrustBadges />
      <Projects projects={projects} />
      <AutomationProcess />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
