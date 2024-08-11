import About from "./about";
import Contact from "./contact";
import Education from "./education";
import Hero from "./hero";
import Projects from "./projects";
import Skills from "./skills";
import Work from "./work";
import Certificates from "./certificates";

const HomeContainer: React.FC = () => {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <Hero />
      <About />
      <Work />
      <Education />
      <Skills />
      <Projects />
      <Certificates />
      <Contact />
    </main>
  );
};

export default HomeContainer;
