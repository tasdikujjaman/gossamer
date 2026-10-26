'use client';

import { motion, useReducedMotion } from 'motion/react';
import { SectionHeader } from './section-header';
import { useGsapContext, gsap, ScrollTrigger } from '@/lib/gsap';

export default function ReuseProcess() {
  const scope = useGsapContext((self) => {
    const s = self.selector!;
    const path = (s('.reuse-flow') as unknown as Element[])[0] as SVGPathElement | undefined;
    if (path) {
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: s('.reuse-wrap') as unknown as HTMLElement,
          start: 'top 65%',
          end: 'bottom 40%',
          scrub: 1.2,
        },
      });
    }
  }, []);

  const reduce = useReducedMotion();

  return (
    <section
      id="reuse"
      ref={scope}
      className="reuse-wrap section-shell bg-section-deep py-24 md:py-32"
    >
      <div className="container-prose">
        <SectionHeader
          label="Check and reuse"
          dark
          title={
            <>
              Assessed, treated when needed,
              <span className="text-aqua2-600"> returned to work.</span>
            </>
          }
        />

        <p className="-mt-6 mb-12 max-w-2xl leading-relaxed text-muted-slate text-pretty">
          Test collected water and treat it when required before returning
          suitable water to an appropriate industrial use.
        </p>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-xl border border-fine-border bg-deep-teal">
              <ReuseSVG reduce={reduce} />
            </div>
            <p className="mt-4 mono-label normal-case tracking-normal text-muted-slate">
              Water quality and treatment requirements are determined by
              testing.
            </p>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <ReuseStage n="01" title="Holding & assessment" text="Water accumulates in a holding tank for quality checks before a reuse decision." />
            <ReuseStage n="02" title="Treatment when required" text="If assessment indicates it, appropriate treatment is applied. No water is returned without a suitability determination." />
            <ReuseStage n="03" title="Industrial reuse" text="Suitable water is routed back to an industrial use — potentially, but not automatically, the cooling tower." />
          </div>
        </div>
      </div>
    </section>
  );
}

function ReuseStage({ n, title, text }: { n: string; title: string; text: string }) {
  return (
    <div className="reuse-stage rounded-lg border border-fine-border bg-deep-teal p-5">
      <div className="flex items-baseline gap-3">
        <span className="mono-label text-aqua2-600">{n}</span>
        <h3 className="font-display text-base font-medium text-warm-white">{title}</h3>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted-slate text-pretty">{text}</p>
    </div>
  );
}

function ReuseSVG({ reduce }: { reduce: boolean | null }) {
  return (
    <svg viewBox="0 0 720 440" className="h-full w-full bg-deep-teal" role="img" aria-label="Water route from reservoir through assessment and treatment to industrial reuse">
      <defs>
        <linearGradient id="reuseFlow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#80D9F2" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#42E6C4" stopOpacity="0.9" />
        </linearGradient>
        <radialGradient id="reuseDrop" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#80D9F2" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#2bc7a8" stopOpacity="0.8" />
        </radialGradient>
      </defs>

      {/* Reservoir (left) */}
      <g transform="translate(80 200)">
        <rect x="-40" y="0" width="80" height="90" rx="6" fill="#123B42" opacity="0.9" />
        <rect x="-36" y="20" width="72" height="66" rx="4" fill="#42E6C4" opacity="0.45" />
        <text x="0" y="108" textAnchor="middle" className="fill-warm-white font-mono text-[10px] uppercase">Reservoir</text>
      </g>

      {/* Assessment unit */}
      <g transform="translate(260 200)">
        <rect x="-40" y="0" width="80" height="90" rx="6" fill="#0B2C33" stroke="#24444A" strokeWidth="1.5" />
        {/* sensor icon */}
        <circle cx="0" cy="40" r="16" fill="none" stroke="#42E6C4" strokeWidth="1.5" />
        <circle cx="0" cy="40" r="6" fill="#42E6C4" opacity="0.5" />
        {!reduce && (
          <motion.circle
            cx="0"
            cy="40"
            r="6"
            fill="none"
            stroke="#42E6C4"
            strokeWidth="1"
            animate={{ r: [6, 20], opacity: [0.8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
        <text x="0" y="108" textAnchor="middle" className="fill-warm-white font-mono text-[10px] uppercase">Assess</text>
      </g>

      {/* Treatment unit */}
      <g transform="translate(440 200)">
        <rect x="-40" y="0" width="80" height="90" rx="6" fill="#0B2C33" stroke="#24444A" strokeWidth="1.5" />
        {/* filter layers */}
        <rect x="-30" y="15" width="60" height="10" fill="#80D9F2" opacity="0.3" />
        <rect x="-30" y="30" width="60" height="10" fill="#42E6C4" opacity="0.4" />
        <rect x="-30" y="45" width="60" height="10" fill="#2bc7a8" opacity="0.3" />
        <text x="0" y="108" textAnchor="middle" className="fill-warm-white font-mono text-[10px] uppercase">Treat</text>
      </g>

      {/* Cooling tower / reuse (right) */}
      <g transform="translate(620 200)">
        <path d="M -30 90 Q -20 30 -14 0 L 14 0 Q 20 30 30 90 Z" fill="#123B42" stroke="#1a4a52" strokeWidth="1" />
        <ellipse cx="0" cy="0" rx="14" ry="4" fill="#061A20" stroke="#24444A" strokeWidth="1" />
        <text x="0" y="108" textAnchor="middle" className="fill-warm-white font-mono text-[10px] uppercase">Reuse</text>
      </g>

      {/* flow path through all stages */}
      <path
        className="reuse-flow"
        d="M 80 245 L 220 245 L 220 245 L 400 245 L 400 245 L 580 245"
        stroke="url(#reuseFlow)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* animated water droplet along path */}
      {!reduce && (
        <motion.circle
          r="4"
          fill="url(#reuseDrop)"
          animate={{ cx: [80, 220, 400, 580], cy: [245, 245, 245, 245] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* stage labels above */}
      {[80, 260, 440, 620].map((x, i) => (
        <text key={i} x={x} y="160" textAnchor="middle" className="fill-muted-slate font-mono text-[9px] uppercase tracking-wider">
          {['Hold', 'Assess', 'Treat', 'Reuse'][i]}
        </text>
      ))}
    </svg>
  );
}
