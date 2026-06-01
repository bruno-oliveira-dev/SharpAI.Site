import CustomCursor from '../components/CustomCursor';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Capabilities from '../components/Capabilities';
import Work from '../components/Work';
import Manifesto from '../components/Manifesto';
import InsightsSection from '../components/InsightsSection';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <Capabilities />
        <Work />
        <Manifesto />
        <InsightsSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
