import Benefits from "./comm/Benefits";
import FAQ from "./comm/FAQ";
import FeaturedSpaces from "./comm/FeaturedSpaces";
import FinalCTA from "./comm/FinalCTA";
import Footer from "./comm/Footer";
import Hero from "./comm/Hero";
import HowItWorks from "./comm/HowItWorks";
import Navbar from "./comm/Navbar";
import Testimonials from "./comm/Testimonials";
import TrustStrip from "./comm/TrustStrip";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <HowItWorks />
        <FeaturedSpaces />
        <Benefits />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
