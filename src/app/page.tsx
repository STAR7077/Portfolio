import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Stats from "@/components/Stats";
import About from "@/components/About";
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
          <Marquee />
          <Stats />
          <About />
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
