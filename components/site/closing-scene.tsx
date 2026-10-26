'use client';

import { motion, useReducedMotion } from 'motion/react';
import { siteConfig } from '@/lib/site-config';
import { useGsapContext, gsap, ScrollTrigger } from '@/lib/gsap';

export default function ClosingScene() {
  const reduce = useReducedMotion();
  const scope = useGsapContext((self) => {
    const s = self.selector!;
    // pinned closing replay
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: s('.closing-wrap') as unknown as HTMLElement,
        start: 'top top',
        end: '+=80%',
        scrub: 1.2,
        pin: true,
        pinSpacing: true,
      },
    });
    tl.fromTo(s('.stage-cap'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' })
      .to(s('.stage-cap'), { opacity: 0, y: -20, duration: 0.2, ease: 'power2.in' }, '+=0.1')
      .fromTo(s('.stage-collect'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' })
      .to(s('.stage-collect'), { opacity: 0, y: -20, duration: 0.2, ease: 'power2.in' }, '+=0.1')
      .fromTo(s('.stage-check'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' })
      .to(s('.stage-check'), { opacity: 0, y: -20, duration: 0.2, ease: 'power2.in' }, '+=0.1')
      .fromTo(s('.stage-reuse'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' })
      .fromTo(s('.closing-statement'), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
  }, []);

  return (
    <section
      ref={scope}
      className="closing-wrap relative h-screen w-full overflow-hidden bg-hero-vignette"
    >
      <div className="absolute inset-0 bg-grid-fine bg-grid-fine opacity-[0.05] [mask-image:radial-gradient(70%_60%_at_50%_50%,black,transparent)]" />

      {/* replay sequence */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-40 w-72 sm:h-48 sm:w-96">
          <ClosingWeb reduce={reduce} />

          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="stage-cap absolute">
              <StageLabel n="01" label="Capture" />
            </div>
            <div className="stage-collect absolute">
              <StageLabel n="02" label="Collect" />
            </div>
            <div className="stage-check absolute">
              <StageLabel n="03" label="Check" />
            </div>
            <div className="stage-reuse absolute">
              <StageLabel n="04" label="Reuse" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 pb-20">
        <div className="container-prose text-center">
          <motion.h2
            className="closing-statement font-display text-2xl font-medium leading-tight tracking-tight text-warm-white sm:text-3xl md:text-4xl text-balance"
            initial={reduce ? false : { opacity: 0, y: 24 }}
          >
            Recovering the water
            <span className="text-aqua"> that would otherwise be lost.</span>
          </motion.h2>
          <p className="mt-6 mono-label normal-case tracking-normal text-muted-slate">
            {siteConfig.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}

function StageLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="mono-label text-aqua/80">{n}</span>
      <span className="font-display text-2xl font-medium text-warm-white sm:text-3xl">
        {label}
      </span>
    </div>
  );
}

function ClosingWeb({ reduce }: { reduce: boolean | null }) {
  return (
    <svg viewBox="0 0 400 200" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="closDrop" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#80D9F2" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#2bc7a8" stopOpacity="0.8" />
        </radialGradient>
      </defs>
      <g transform="translate(200 100)">
        <rect x="-130" y="-70" width="260" height="140" rx="6" fill="none" stroke="#24444A" strokeWidth="1.5" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
          const r = (deg * Math.PI) / 180;
          return (
            <line
              key={i}
              x1="0"
              y1="0"
              x2={Math.cos(r) * 128}
              y2={Math.sin(r) * 68}
              stroke="#80D9F2"
              strokeWidth="0.5"
              opacity="0.5"
            />
          );
        })}
        {[20, 40, 60].map((r, i) => (
          <ellipse key={i} cx="0" cy="0" rx={r * 1.85} ry={r} fill="none" stroke="#42E6C4" strokeWidth="0.4" opacity="0.5" />
        ))}
        {/* falling droplets */}
        {!reduce &&
          [-60, -20, 20, 60].map((x, i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={-50}
              r="3"
              fill="url(#closDrop)"
              animate={{ cy: [-50, 70], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.4, ease: 'easeIn' }}
            />
          ))}
        <circle cx="0" cy="0" r="4" fill="#42E6C4" opacity="0.8" />
      </g>
    </svg>
  );
}
