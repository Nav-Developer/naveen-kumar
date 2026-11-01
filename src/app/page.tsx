import HeroMotion from "@/components/sections/HeroMotion";
import AboutPage from "@/components/ui/AboutPage";
import ExperiencePage from "@/components/ui/ExperiencePage";
import { ProjectPage } from "@/components/ui/ProjectPage";
import ServicesPage from "@/components/ui/ServicesPage";
import SkillsPage from "@/components/ui/SkillsPage";

// import StoryScroll from "@/components/sections/StoryScroll";

export default function Home() {
  return (
    <>
      <HeroMotion />

      <section id="about">
        <AboutPage />
      </section>

      <section id="skills">
        <SkillsPage />
      </section>

      <section id="experience">
        <ExperiencePage />
      </section>

      <section id="projects">
        <ProjectPage />
      </section>

      <section id="services">
        <ServicesPage />
      </section>
    </>
  );
}
