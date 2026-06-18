import About from '@/components/home/About';
import Compliance from '@/components/home/Compliance';
import CtaBanner from '@/components/home/CtaBanner';
import Hero from '@/components/home/Hero';
import HowItWorks from '@/components/home/HowItWorks';
import Services from '@/components/home/Services';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import ITRCalculator from '@/components/home/ITRCalculator';
import Pricing from '@/components/home/Pricing';
import Testimonials from '@/components/home/Testimonials';
import FAQ from '@/components/home/FAQ';
import CountdownBanner from '@/components/home/CountdownBanner';
import StatsStrip from '@/components/home/StatsStrip';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

export default function Home() {
  return (
    <main>
      <Navbar />
      <CountdownBanner />
      <Hero />
      <StatsStrip />
      <Services />
      <HowItWorks />
      <ITRCalculator />
      <Pricing />
      <Testimonials />
      <WhyChooseUs />
      <FAQ />
      <Compliance />
      <About />
      <CtaBanner />
      <Footer />
    </main>
  );
}
