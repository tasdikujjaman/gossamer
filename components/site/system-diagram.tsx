'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { SectionHeader } from './section-header';
import { Play, RotateCcw } from 'lucide-react';

type ComponentId =
  | 'tower'
  | 'exhaust'
  | 'web'
  | 'filaments'
  | 'gutter'
  | 'pipe'
  | 'reservoir'
  | 'treatment'
  | 'return';

const components: {
  id: ComponentId;
  name: string;
  desc: string;
}[] = [
  { id: 'tower', name: 'Cooling tower', desc: 'Rejects heat by evaporating water. Liquid drift escapes with the exhaust.' },
  { id: 'exhaust', name: 'Exhaust plume', desc: 'Warm air carrying fine droplets upward and outward.' },
  { id: 'web', name: 'Modular web', desc: 'An open collector placed across the exhaust path.' },
  { id: 'filaments', name: 'Filaments', desc: 'Intercept liquid droplets while air passes through.' },
  { id: 'gutter', name: 'Drainage gutter', desc: 'Concentrates captured water and routes it away.' },
  { id: 'pipe', name: 'Collection pipe', desc: 'Carries collected water to the holding reservoir.' },
  { id: 'reservoir', name: 'Reservoir', desc: 'Accumulates water for quality assessment.' },
  { id: 'treatment', name: 'Assessment & treatment', desc: 'Determines suitability and treats when required.' },
  { id: 'return', name: 'Return to use', desc: 'Routes suitable water back to industrial reuse.' },
];

const journey: ComponentId[] = ['tower', 'exhaust', 'web', 'filaments', 'gutter', 'pipe', 'reservoir', 'treatment', 'return'];

export default function SystemDiagram() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<ComponentId | null>(null);
  const [walkthrough, setWalkthrough] = useState(false);
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '120px' },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const startWalk = () => {
    setWalkthrough(true);
    setStep(0);
  };
  const stopWalk = () => {
    setWalkthrough(false);
    setStep(0);
    setActive(null);
  };

  // advance walkthrough
  const next = () => {
    if (step >= journey.length - 1) {
      stopWalk();
      return;
    }
    setStep((s) => s + 1);
  };

  const walkId = walkthrough ? journey[step] : null;

  return (
    <section
      ref={sectionRef}
      className="section-shell bg-section-deep py-24 md:py-32"
    >
      <div className="container-prose">
        <SectionHeader
          label="Complete system"
          title={
            <>
              The whole journey,
              <span className="text-aqua"> in one diagram.</span>
            </>
          }
        />

        <div className="mb-8 flex flex-wrap items-center gap-4">
          <p className="max-w-xl text-sm leading-relaxed text-muted-slate text-pretty">
            Hover or tap any component to see its role. Or run a guided
            walkthrough that traces the water from exhaust to reuse.
          </p>
          <div className="flex gap-3">
            {!walkthrough ? (
              <button
                onClick={startWalk}
                className="inline-flex items-center gap-2 rounded-full border border-aqua/40 bg-aqua/10 px-4 py-2 text-sm font-medium text-aqua transition-all hover:border-aqua hover:bg-aqua/20"
              >
                <Play size={14} /> Walkthrough
              </button>
            ) : (
              <>
                <button
                  onClick={next}
                  className="inline-flex items-center gap-2 rounded-full border border-aqua bg-aqua/20 px-4 py-2 text-sm font-medium text-aqua"
                >
                  {step >= journey.length - 1 ? 'Finish' : 'Next'} ({step + 1}/{journey.length})
                </button>
                <button
                  onClick={stopWalk}
                  className="inline-flex items-center gap-2 rounded-full border border-fine-border px-4 py-2 text-sm font-medium text-muted-slate hover:text-warm-white"
                >
                  <RotateCcw size={14} /> Reset
                </button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-xl border border-fine-border bg-surface-teal/30">
              <SystemSVG
                active={walkId ?? active}
                onHover={setActive}
                reduce={reduce || !visible}
              />
            </div>
            <p className="mt-3 mono-label normal-case tracking-normal text-muted-slate">
              Follow the flow from drift capture to suitable reuse.
            </p>
          </div>

          <div className="rounded-xl border border-fine-border bg-surface-teal/50 p-6 lg:col-span-4">
            <div className="mono-label mb-3 text-aqua/80">
              {walkthrough
                ? `Walkthrough ${step + 1} / ${journey.length}`
                : active
                  ? 'Selected component'
                  : 'Explore the system'}
            </div>
            <h3 className="font-display text-xl font-medium text-warm-white">
              {components.find((component) => component.id === (walkId ?? active))?.name ??
                'Select a numbered marker'}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted-slate text-pretty">
              {components.find((component) => component.id === (walkId ?? active))?.desc ??
                'Choose a component in the diagram or the key below to see how it contributes to the water recovery route.'}
            </p>
            {walkthrough && (
              <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-fine-border">
                <motion.div
                  className="h-full bg-aqua"
                  initial={{ width: 0 }}
                  animate={{ width: `${((step + 1) / journey.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-3">
            {components.map((component, index) => {
              const selected = (walkId ?? active) === component.id;
              return (
                <button
                  key={component.id}
                  type="button"
                  onClick={() => setActive(selected ? null : component.id)}
                  aria-pressed={selected}
                  className={`flex min-h-24 items-start gap-4 rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua ${
                    selected
                      ? 'border-aqua/60 bg-aqua/10'
                      : 'border-fine-border bg-surface-teal/30 hover:border-aqua/40 hover:bg-surface-teal/60'
                  }`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-aqua/50 font-mono text-sm text-aqua">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="block font-display text-base font-medium text-warm-white">
                      {component.name}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted-slate text-pretty">
                      {component.desc}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function SystemSVG({
  active,
  onHover,
  reduce,
}: {
  active: ComponentId | null;
  onHover: (id: ComponentId | null) => void;
  reduce: boolean | null;
}) {
  const isActive = (id: ComponentId) => active === id;
  const dim = active !== null && active !== undefined;

  return (
    <svg viewBox="0 0 800 500" className="h-full w-full" role="img" aria-label="Complete water recovery system diagram">
      <defs>
        <linearGradient id="sysFlow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#80D9F2" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#42E6C4" stopOpacity="0.8" />
        </linearGradient>
        <radialGradient id="sysDrop" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#80D9F2" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#2bc7a8" stopOpacity="0.8" />
        </radialGradient>
        <marker id="systemArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M 0 0 L 8 4 L 0 8 Z" fill="#42E6C4" />
        </marker>
      </defs>

        <g aria-hidden="true">
          <text
            x="110"
            y="170"
            className="fill-warm-white font-mono text-[11px] uppercase tracking-wider"
          >
            Drift capture
          </text>
          <text
            x="110"
            y="190"
            className="fill-muted-slate font-mono text-[9px] uppercase tracking-wider"
          >
            Air passes · droplets are intercepted
          </text>
          <path
            d="M 110 204 H 300"
            stroke="#24444A"
            strokeWidth="1"
            strokeDasharray="3 5"
          />
        </g>

        {/* Water route from tower and collector through assessment to reuse */}
      <g
        className="transition-opacity duration-300"
        style={{ opacity: dim ? 0.3 : 1 }}
      >
        <path d="M 650 165 Q 580 190 510 220" stroke="url(#sysFlow)" strokeWidth="2.5" fill="none" strokeDasharray="4 6" opacity="0.8" markerEnd="url(#systemArrow)" />
        <path d="M 460 265 L 460 274" stroke="url(#sysFlow)" strokeWidth="2.5" fill="none" opacity="0.8" markerEnd="url(#systemArrow)" />
        <path d="M 440 295 Q 420 315 410 320" stroke="url(#sysFlow)" strokeWidth="2.5" fill="none" opacity="0.8" markerEnd="url(#systemArrow)" />
        <path d="M 350 320 L 340 320" stroke="url(#sysFlow)" strokeWidth="2.5" fill="none" opacity="0.8" markerEnd="url(#systemArrow)" />
        <path d="M 220 320 L 200 320 L 200 380" stroke="url(#sysFlow)" strokeWidth="2.5" fill="none" opacity="0.8" markerEnd="url(#systemArrow)" />
        <path d="M 165 410 L 150 410" stroke="url(#sysFlow)" strokeWidth="2.5" fill="none" opacity="0.8" markerEnd="url(#systemArrow)" />
        <path d="M 120 440 L 120 480 L 760 480 L 760 322" stroke="url(#sysFlow)" strokeWidth="2.5" fill="none" opacity="0.7" strokeDasharray="5 5" markerEnd="url(#systemArrow)" />
        <path d="M 760 278 L 760 205 L 750 205 L 750 130 L 726 130" stroke="url(#sysFlow)" strokeWidth="2.5" fill="none" opacity="0.7" strokeDasharray="5 5" markerEnd="url(#systemArrow)" />
      </g>

      {/* Animated water moving through the complete collection route */}
      {reduce ? (
        <circle cx="690" cy="130" r="3.5" fill="url(#sysDrop)" />
      ) : (
        [0, 1.7, 3.4].map((delay) => (
          <motion.circle
            key={delay}
            r="3.5"
            fill="url(#sysDrop)"
            animate={{
              cx: [690, 620, 520, 460, 460, 410, 280, 200, 160, 120, 120, 760, 760, 750, 725],
              cy: [130, 180, 220, 260, 280, 320, 320, 380, 410, 410, 480, 480, 300, 130, 130],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear', delay }}
          />
        ))
      )}

      {/* Tower */}
      <Comp id="tower" active={isActive('tower')} dim={dim} onHover={onHover} x={690} y={130} number="01" label="Cooling tower" captionY={-40}>
        <path d="M -35 90 Q -25 30 -16 0 L 16 0 Q 25 30 35 90 Z" fill="#123B42" stroke="#1a4a52" strokeWidth="1.5" />
        <ellipse cx="0" cy="0" rx="16" ry="4" fill="#061A20" stroke="#24444A" strokeWidth="1" />
      </Comp>

      {/* Exhaust plume */}
      <Comp id="exhaust" active={isActive('exhaust')} dim={dim} onHover={onHover} x={620} y={180} number="02" label="Exhaust plume" captionY={-24}>
        {reduce ? (
          <>
            <ellipse cx="0" cy="0" rx="30" ry="18" fill="#80D9F2" opacity="0.18" />
            <ellipse cx="-10" cy="-10" rx="22" ry="12" fill="#80D9F2" opacity="0.12" />
          </>
        ) : (
          <>
            <motion.g
              animate={{ y: [2, -9, 2], opacity: [0.55, 1, 0.55] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ellipse cx="0" cy="0" rx="30" ry="18" fill="#80D9F2" opacity="0.18" />
              <ellipse cx="-10" cy="-10" rx="22" ry="12" fill="#80D9F2" opacity="0.12" />
            </motion.g>
            {[0, 1, 2].map((delay) => (
              <motion.circle
                key={delay}
                r="3"
                fill="#B9F1FF"
                animate={{
                  cx: [-4, -18, -34],
                  cy: [5, -12, -30],
                  opacity: [0.2, 0.65, 0],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: 'easeOut',
                  delay: delay * 0.8,
                }}
              />
            ))}
          </>
        )}
      </Comp>

      {/* Web */}
      <Comp id="web" active={isActive('web')} dim={dim} onHover={onHover} x={460} y={220} number="03" label="Modular web" captionY={-56}>
        <rect x="-45" y="-45" width="90" height="90" rx="4" fill="none" stroke="#24444A" strokeWidth="1.5" />
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const r = (deg * Math.PI) / 180;
          return <line key={i} x1="0" y1="0" x2={Math.cos(r) * 42} y2={Math.sin(r) * 42} stroke="#80D9F2" strokeWidth="0.5" opacity="0.6" />;
        })}
        {[14, 28, 42].map((r, i) => (
          <ellipse key={i} cx="0" cy="0" rx={r * 0.9} ry={r} fill="none" stroke="#42E6C4" strokeWidth="0.4" opacity="0.5" />
        ))}
      </Comp>

      {/* Filaments (inset detail) */}
      <Comp id="filaments" active={isActive('filaments')} dim={dim} onHover={onHover} x={460} y={280} number="04" label="Filaments" small captionY={24}>
        <line x1="-14" y1="-8" x2="14" y2="8" stroke="#A1B7BA" strokeWidth="1.2" />
        <line x1="-14" y1="8" x2="14" y2="-8" stroke="#A1B7BA" strokeWidth="1.2" />
        <circle cx="0" cy="0" r="2.5" fill="url(#sysDrop)" />
      </Comp>

      {/* Gutter */}
      <Comp id="gutter" active={isActive('gutter')} dim={dim} onHover={onHover} x={380} y={320} number="05" label="Drainage gutter" small captionY={25}>
        <rect x="-30" y="-7" width="60" height="14" rx="6" fill="#0B2C33" stroke="#42E6C4" strokeWidth="1" />
      </Comp>

      {/* Pipe */}
      <Comp id="pipe" active={isActive('pipe')} dim={dim} onHover={onHover} x={280} y={320} number="06" label="Collection pipe" small captionY={-14}>
        <rect x="-60" y="-4" width="120" height="8" rx="4" fill="#123B42" stroke="#24444A" strokeWidth="1" />
      </Comp>

      {/* Reservoir */}
      <Comp id="reservoir" active={isActive('reservoir')} dim={dim} onHover={onHover} x={200} y={380} number="07" label="Holding reservoir" captionY={58}>
        <rect x="-35" y="0" width="70" height="60" rx="5" fill="#0B2C33" stroke="#24444A" strokeWidth="1.5" />
        <rect x="-31" y="12" width="62" height="44" rx="3" fill="#42E6C4" opacity="0.4" />
      </Comp>

      {/* Treatment */}
      <Comp id="treatment" active={isActive('treatment')} dim={dim} onHover={onHover} x={120} y={380} number="08" label="Assessment and treatment" captionY={82}>
        <rect x="-30" y="0" width="60" height="60" rx="5" fill="#123B42" stroke="#24444A" strokeWidth="1.5" />
        <rect x="-22" y="12" width="44" height="6" fill="#80D9F2" opacity="0.4" />
        <rect x="-22" y="22" width="44" height="6" fill="#42E6C4" opacity="0.5" />
        <rect x="-22" y="32" width="44" height="6" fill="#2bc7a8" opacity="0.4" />
      </Comp>

      {/* Return */}
      <Comp id="return" active={isActive('return')} dim={dim} onHover={onHover} x={760} y={300} number="09" label="Return to suitable use" captionY={62}>
        <path d="M -18 20 L 18 20 L 18 -10 L 0 -22 L -18 -10 Z" fill="#123B42" stroke="#42E6C4" strokeWidth="1.2" />
        <text x="0" y="40" textAnchor="middle" className="fill-muted-slate font-mono text-[8px]">REUSE</text>
      </Comp>
    </svg>
  );
}

function Comp({
  id,
  active,
  dim,
  onHover,
  x,
  y,
  label,
  number,
  captionY,
  small,
  children,
}: {
  id: ComponentId;
  active: boolean;
  dim: boolean;
  onHover: (id: ComponentId | null) => void;
  x: number;
  y: number;
  label: string;
  number: string;
  captionY: number;
  small?: boolean;
  children: React.ReactNode;
}) {
  return (
    <g
      transform={`translate(${x} ${y})`}
      className="cursor-pointer transition-opacity duration-300"
      style={{ opacity: dim && !active ? 0.4 : 1 }}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onHover(active ? null : id)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onHover(active ? null : id);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={label}
      aria-pressed={active}
    >
      {active && (
        <rect
          x={small ? -36 : -52}
          y={small ? -16 : -52}
          width={small ? 72 : 104}
          height={small ? 32 : 104}
          rx="6"
          fill="none"
          stroke="#42E6C4"
          strokeWidth="1.5"
          strokeDasharray="3 4"
          className="pointer-events-none"
        />
      )}
      {children}
      <g transform={`translate(0 ${captionY})`} className="pointer-events-none">
        <circle r="10" fill="#061A20" stroke="#42E6C4" strokeWidth="1.2" />
        <text
          y="3"
          textAnchor="middle"
          className="fill-aqua font-mono text-[7px] font-medium"
        >
          {number}
        </text>
      </g>
    </g>
  );
}
