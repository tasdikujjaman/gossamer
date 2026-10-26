import { ArrowDown } from 'lucide-react';
import Navbar from '@/components/site/navbar';
import DropletCapture from '@/components/site/droplet-capture';
import WaterCollection from '@/components/site/water-collection';
import ReuseProcess from '@/components/site/reuse-process';
import Footer from '@/components/site/footer';

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <header className="section-shell bg-hero-vignette pb-12 pt-32 md:pb-16 md:pt-40">
          <div className="container-prose">
            <p className="mono-label mb-5 flex items-center gap-3 text-aqua">
              <span className="h-px w-8 bg-aqua/70" />
              THE PROCESS
            </p>
            <h1 className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-warm-white sm:text-5xl md:text-6xl text-balance">
              A clear route from
              <span className="text-aqua"> drift to reuse.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-slate md:text-lg text-pretty">
              Follow droplets as they meet the web, gather along its filaments,
              drain into a reservoir, and move through assessment before
              suitable water is reused.
            </p>
            <a
              href="#capture"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-aqua transition-colors hover:text-warm-white"
            >
              Explore the process
              <ArrowDown size={15} aria-hidden="true" />
            </a>
          </div>
        </header>
        <DropletCapture />
        <WaterCollection />
        <ReuseProcess />
      </main>
      <Footer />
    </>
  );
}
