import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Work from "@/components/Work";
import Reach from "@/components/Reach";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import RevealFooter from "@/components/RevealFooter";

export default function Home() {
  return (
    <>
      <Nav />

      {/* Everything above the fold-out footer. Opaque, so it covers the
          contact panel held behind it. */}
      <div className="page-stack flex-1">
        <main>
          <Hero />
          <Services />
          <About />
          <Skills />
          <Work />
          <Reach />
          <Testimonials />
        </main>
      </div>

      <RevealFooter>
        <Contact />
        <Footer />
      </RevealFooter>
    </>
  );
}
