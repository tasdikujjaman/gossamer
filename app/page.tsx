import Navbar from '@/components/site/navbar';
import HeroScene from '@/components/site/hero-scene';
import ProblemSection from '@/components/site/problem-section';
import FeatureSection from '@/components/site/features-section';
import HowItWorks from '@/components/site/how-it-works';
import LazySystemDiagram from '@/components/site/lazy-system-diagram';
import ImpactSection from '@/components/site/impact-section';
import Footer from '@/components/site/footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <HeroScene />
        <ProblemSection />
        <FeatureSection />
        <HowItWorks />
        <LazySystemDiagram />
        <ImpactSection />
      </main>
      <Footer />
    </>
  );
}
