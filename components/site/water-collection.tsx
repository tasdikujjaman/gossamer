'use client';

import { motion, useReducedMotion } from 'motion/react';
import { SectionHeader } from './section-header';
import { useGsapContext, gsap, ScrollTrigger } from '@/lib/gsap';

export default function WaterCollection() {
  const scope = useGsapContext((self) => {
    const s = self.selector!;
    // draw the flow path as you scroll
    const path = (s('.flow-path') as unknown as Element[])[0] as SVGPathElement | undefined;
    if (path) {
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: s('.collect-wrap') as unknown as HTMLElement,
          start: 'top 65%',
          end: 'bottom 40%',
          scrub: 1.2,
        },
      });
    }
    // fill the reservoir as the path draws
    gsap.fromTo(
      s('.tank-fill'),
      { scaleY: 0, transformOrigin: 'bottom' },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: s('.collect-wrap') as unknown as HTMLElement,
          start: 'top 55%',
          end: 'bottom 35%',
          scrub: 1.2,
        },
      },
    );
  }, []);

  const reduce = useReducedMotion();

  return (
    <section
      id="collect"
      ref={scope}
      className="collect-wrap section-shell bg-section-deep py-24 md:py-32"
    >
      <div className="container-prose">
        <SectionHeader
          label="Collect the water"
          title={
            <>
              From filament to gutter,
              <span className="text-aqua"> to pipe, to tank.</span>
            </>
          }
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <div className="relative overflow-hidden rounded-xl border border-fine-border bg-surface-teal/40">
              <CollectSVG reduce={reduce} />
            </div>
            <p className="mt-4 mono-label normal-case tracking-normal text-muted-slate">
              Water collection route. Numbered markers match the process steps.
            </p>
          </div>

          <div className="lg:col-span-4">
            <div className="space-y-6">
              <FlowPoint n="01" title="Along filaments" text="Gravity guides captured drops along the filament toward the lower drainage edge." />
              <FlowPoint n="02" title="Into the gutter" text="A coated collection channel receives the water and prevents re-entrainment." />
              <FlowPoint n="03" title="Down the pipe" text="A dedicated pipe routes collected water away from the exhaust path." />
              <FlowPoint n="04" title="Into the reservoir" text="A holding tank accumulates the flow before the assessment stage." />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FlowPoint({ n, title, text }: { n: string; title: string; text: string }) {
  return (
    <div className="border-l border-fine-border pl-5">
      <div className="flex items-baseline gap-3">
        <span className="mono-label text-aqua/80">{n}</span>
        <h3 className="font-display text-base font-medium text-warm-white">{title}</h3>
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-slate text-pretty">{text}</p>
    </div>
  );
}

function CollectSVG({ reduce }: { reduce: boolean | null }) {
  return (
    <svg viewBox="0 0 800 500" className="h-full w-full" role="img" aria-label="Water route from web filaments to gutter, pipe, and reservoir">
      <defs>
        <linearGradient id="colFlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#80D9F2" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#42E6C4" stopOpacity="0.9" />
        </linearGradient>
        <radialGradient id="colDrop" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#80D9F2" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#2bc7a8" stopOpacity="0.8" />
        </radialGradient>
        <linearGradient id="tankWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#42E6C4" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#123B42" stopOpacity="0.9" />
        </linearGradient>
        <marker id="collectArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M 0 0 L 8 4 L 0 8 Z" fill="#42E6C4" />
        </marker>
      </defs>

      {/* collector web */}
      <g transform="translate(150 110)">
        <rect x="-70" y="-70" width="140" height="140" rx="6" fill="#0B2C33" fillOpacity="0.35" stroke="#24444A" strokeWidth="1.5" />
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const r = (deg * Math.PI) / 180;
          return (
            <line
              key={i}
              x1="0"
              y1="0"
              x2={Math.cos(r) * 65}
              y2={Math.sin(r) * 65}
              stroke="#80D9F2"
              strokeWidth="0.5"
              opacity="0.6"
            />
          );
        })}
        {[20, 40, 60].map((r, i) => (
          <ellipse key={i} cx="0" cy="0" rx={r * 0.9} ry={r} fill="none" stroke="#42E6C4" strokeWidth="0.4" opacity="0.5" />
        ))}
      </g>

      <g>
        <circle cx="80" cy="48" r="12" fill="#0B2C33" stroke="#42E6C4" />
        <text x="80" y="52" textAnchor="middle" className="fill-aqua font-mono text-[9px]">01</text>
        <text x="100" y="52" className="fill-warm-white font-mono text-[10px] uppercase tracking-wider">Filament web</text>
        <path d="M 145 58 L 165 70" fill="none" stroke="#80D9F2" strokeOpacity="0.6" strokeWidth="1" />
      </g>

      {/* droplets sliding to gutter */}
      {!reduce &&
        [-30, -10, 10, 30].map((x, i) => (
          <motion.circle
            key={i}
            cx={150 + x}
            cy={140}
            r="3"
            fill="url(#colDrop)"
            animate={{ cy: [140, 200] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.25, ease: 'easeIn' }}
          />
        ))}

      {/* drainage gutter */}
      <rect x="70" y="200" width="160" height="14" rx="6" fill="#0B2C33" stroke="#42E6C4" strokeWidth="1.5" />
      <circle cx="86" cy="240" r="12" fill="#0B2C33" stroke="#42E6C4" />
      <text x="86" y="244" textAnchor="middle" className="fill-aqua font-mono text-[9px]">02</text>
      <text x="106" y="244" className="fill-warm-white font-mono text-[10px] uppercase tracking-wider">Drainage gutter</text>

      {/* numbered collection path: gutter to pipe to reservoir */}
      <path
        className="flow-path"
        d="M 150 214 L 150 280 Q 150 300 170 300 L 540 300 Q 560 300 560 320 L 560 360"
        stroke="url(#colFlow)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        markerEnd="url(#collectArrow)"
      />
      <circle cx="340" cy="276" r="12" fill="#0B2C33" stroke="#42E6C4" />
      <text x="340" y="280" textAnchor="middle" className="fill-aqua font-mono text-[9px]">03</text>
      <text x="360" y="280" className="fill-warm-white font-mono text-[10px] uppercase tracking-wider">Collection pipe</text>

      {/* animated water along pipe */}
      {!reduce && (
        <motion.circle
          r="4"
          fill="url(#colDrop)"
          animate={{
            cx: [150, 150, 540, 560, 560],
            cy: [214, 280, 300, 300, 360],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* reservoir / holding tank */}
      <g transform="translate(560 360)">
        <rect x="-50" y="0" width="100" height="80" rx="6" fill="#0B2C33" stroke="#42E6C4" strokeOpacity="0.7" strokeWidth="1.5" />
        <rect className="tank-fill" x="-46" y="4" width="92" height="72" rx="4" fill="url(#tankWater)" />
        {/* water surface shimmer */}
        {!reduce && (
          <motion.line
            x1="-44"
            y1="20"
            x2="44"
            y2="20"
            stroke="#80D9F2"
            strokeWidth="1"
            opacity="0.6"
            animate={{ y: [14, 26, 14] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
        <circle cx="0" cy="92" r="12" fill="#0B2C33" stroke="#42E6C4" />
        <text x="0" y="96" textAnchor="middle" className="fill-aqua font-mono text-[9px]">04</text>
        <text x="0" y="116" textAnchor="middle" className="fill-warm-white font-mono text-[9px] uppercase tracking-wider">Reservoir</text>
      </g>
    </svg>
  );
}
