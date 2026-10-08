import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/hero/Hero";
import { StackBand } from "@/components/StackBand";
import { Stats } from "@/components/Stats";
import { About } from "@/components/About";
import { Gallery } from "@/components/work/Gallery";
import { MoreBuilds } from "@/components/MoreBuilds";
import { Principles } from "@/components/Principles";
import { Experience } from "@/components/Experience";
import { Education } from "@/components/Education";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { SummaryModal } from "@/components/summary/SummaryModal";
import { ProjectModal } from "@/components/work/ProjectModal";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { PointerVars } from "@/components/interactions/PointerVars";
import { ConsoleHello } from "@/components/interactions/ConsoleHello";

/*
  Home — composes the page top → bottom, matching index.html:
    Nav · Hero · Stack band · Stats · About · Featured work · More builds ·
    How I work · Experience · Education · Skills · Contact + footer.
  The chat widget is added in Phase 4.
*/
export default function Home() {
  return (
    <>
      <a className="sr-only" href="#work">
        Skip to projects
      </a>

      {/* Decorative: scroll progress line + cursor bubble */}
      <div className="progress" aria-hidden="true" />
      <div className="cursor" aria-hidden="true">
        Open ↗
      </div>

      <PointerVars />
      <ConsoleHello />

      <Nav />

      <main id="top">
        <Hero />
        <StackBand />
        <Stats />
        <About />
        <Gallery />
        <MoreBuilds />
        <Principles />
        <Experience />
        <Education />
        <Skills />
        <Contact />
      </main>

      <SummaryModal />
      <ProjectModal />
      <ChatWidget />
    </>
  );
}
