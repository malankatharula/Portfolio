import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Achievements } from "@/components/portfolio/Achievements";
import { Education } from "@/components/portfolio/Education";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { Game } from "@/components/portfolio/Game";
import { ArcadeFab } from "@/components/portfolio/ArcadeFab";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Malanka Tharula" },
      {
        name: "description",
        content:
          "Portfolio of Malanka Tharula, Backend Developer & Deep Learning Enthusiast. CS undergrad at USJ with projects in systems programming, ASL recognition, and competitive programming.",
      },
      { property: "og:title", content: "Malanka Tharula " },
      { property: "og:description", content: "Selected projects, experience, achievements, and contact." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  useRevealOnScroll();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    // Konami easter egg
    const seq = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
    let i = 0;
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === seq[i].toLowerCase()) {
        i++;
        if (i === seq.length) {
          document.body.classList.toggle("matrix-mode");
          i = 0;
        }
      } else { i = 0; }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="relative min-h-screen fx-scanlines fx-grain">
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Education />
        <Game />
        <Contact />
      </main>
      <Footer />
      <ArcadeFab />
    </div>
  );
}
