'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import { SectionHeader } from './section-header';

const STEP_DURATION_MS = 5000;

const steps = [
  {
    id: 0,
    title: 'Encounter',
    text: 'Airborne droplets meet the filaments. The plume keeps moving — only the liquid is asked to stop.',
  },
  {
    id: 1,
    title: 'Adhere',
    text: 'A hydrophilic surface is intended to encourage droplets to cling rather than rebound.',
  },
  {
    id: 2,
    title: 'Coalesce',
    text: 'Captured droplets merge at contact points, growing heavier until gravity overcomes adhesion.',
  },
  {
    id: 3,
    title: 'Drain',
    text: 'Larger drops slide along the filament toward the drainage edge, clearing the surface for new arrivals.',
  },
];

export default function DropletCapture() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % steps.length);
    }, STEP_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [active]);

  return (
    <section
      id="capture"
      className="section-shell bg-section-deep py-24 md:py-32"
    >
      <div className="container-prose">
        <SectionHeader
          label="Catch the droplets"
          dark
          title={
            <>
              Liquid meets filament —
              <span className="text-aqua2-600"> not a wall.</span>
            </>
          }
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-xl border border-fine-border bg-deep-teal">
              <CaptureSVG step={active} reduce={reduce} />
            </div>
            <p className="mt-4 mono-label normal-case tracking-normal text-muted-slate">
              Close-up mechanism. This shows liquid-droplet interception — not
              condensation of invisible vapor.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="flex flex-col gap-2">
              {steps.map((st, i) => (
                <button
                  key={st.id}
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className={`group border-l-2 py-4 pl-5 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua2-500 focus-visible:ring-offset-2 focus-visible:ring-offset-deep-teal ${
                    active === i
                      ? 'border-aqua2-600 bg-aqua2-500/5'
                      : 'border-fine-border hover:border-aqua2-600/40'
                  }`}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="mono-label text-muted-slate/70">
                      0{i + 1}
                    </span>
                    <h3
                      className={`font-display text-base font-medium transition-colors ${
                        active === i ? 'text-warm-white' : 'text-muted-slate'
                      }`}
                    >
                      {st.title}
                    </h3>
                  </div>
                  {active === i && (
                    <div className="mt-3 h-0.5 overflow-hidden bg-fine-border/70">
                      <motion.div
                        key={`progress-${active}`}
                        className="h-full origin-left bg-aqua2-500"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          duration: reduce ? 0 : STEP_DURATION_MS / 1000,
                          ease: 'linear',
                        }}
                      />
                    </div>
                  )}
                  <AnimatePresence mode="wait">
                    {active === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-2 overflow-hidden text-sm leading-relaxed text-muted-slate text-pretty"
                        aria-live="polite"
                      >
                        {st.text}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              ))}
            </div>

            <div className="mt-8 rounded-lg border border-aqua2-500/20 bg-aqua2-500/5 p-5">
              <p className="text-sm leading-relaxed text-muted-slate text-pretty">
                <span className="font-medium text-warm-white">Important:</span>{' '}
                This open mesh is designed to intercept liquid droplets, not
                capture invisible water vapor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CaptureSVG({ step, reduce }: { step: number; reduce: boolean | null }) {
  return (
    <svg viewBox="0 0 700 480" className="h-full w-full bg-deep-teal" role="img" aria-label={`Droplet capture stage ${step + 1} of 4: ${steps[step].title}`}>
      <defs>
        <radialGradient id="capDrop" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="55%" stopColor="#80D9F2" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#2bc7a8" stopOpacity="0.85" />
        </radialGradient>
        <linearGradient id="fil" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#A1B7BA" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#A1B7BA" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#A1B7BA" stopOpacity="0.3" />
        </linearGradient>
        <radialGradient id="capPlume" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#80D9F2" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#80D9F2" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="captureTank" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#174750" />
          <stop offset="100%" stopColor="#0B2C33" />
        </linearGradient>
        <linearGradient id="captureWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#80D9F2" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#42E6C4" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* airflow continues through the open web at every stage */}
      <g>
        <ellipse cx="120" cy="240" rx="90" ry="160" fill="url(#capPlume)" />
        {/* flow arrows */}
        {[120, 180, 240, 300, 360].map((y, i) => (
          <motion.line
            key={i}
            x1="40"
            y1={y}
            x2="90"
            y2={y}
            stroke="#80D9F2"
            strokeWidth="1"
            opacity="0.4"
            animate={reduce ? {} : { x1: [40, 55, 40], x2: [90, 105, 90] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
          />
        ))}
        {[120, 180, 240, 300, 360].map((y, i) => (
          <motion.line
            key={`r-${i}`}
            x1="610"
            y1={y}
            x2="660"
            y2={y}
            stroke="#80D9F2"
            strokeWidth="1"
            opacity="0.3"
            animate={reduce ? {} : { x1: [610, 630, 610], x2: [660, 680, 660] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
          />
        ))}
      </g>

      {/* droplets approach the web during encounter */}
      {step === 0 && (
        <g>
          {[150, 200, 250, 300, 330].map((y, i) => (
            <motion.circle
              key={`in-${i}`}
              cx={reduce ? 280 : 60}
              cy={y}
              r={3 + (i % 2)}
              fill="url(#capDrop)"
              animate={
                reduce
                  ? { opacity: 1 }
                  : { cx: [60, 280, 280], opacity: [0, 1, 1, 0] }
              }
              transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.3, ease: 'easeIn' }}
            />
          ))}
        </g>
      )}

      {/* filaments — three diagonal strands */}
      <g>
        <line x1="280" y1="120" x2="520" y2="380" stroke="url(#fil)" strokeWidth="2" />
        <line x1="280" y1="200" x2="520" y2="300" stroke="url(#fil)" strokeWidth="2" />
        <line x1="280" y1="280" x2="520" y2="220" stroke="url(#fil)" strokeWidth="2" />
        <line x1="280" y1="360" x2="520" y2="140" stroke="url(#fil)" strokeWidth="2" />
        {/* crossing nodes */}
        {[
          [400, 250],
          [360, 230],
          [440, 280],
          [380, 300],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="#123B42" opacity="0.6" />
        ))}
      </g>
      <text
        x="400"
        y="105"
        textAnchor="middle"
        className="fill-muted-slate font-mono text-[10px] uppercase tracking-wider"
      >
        Web
      </text>
      <text
        x="120"
        y="430"
        textAnchor="middle"
        className="fill-muted-slate font-mono text-[10px] uppercase tracking-wider"
      >
        Cooling tower
      </text>

      {/* STEP 1: encounter — droplets at filament contact */}
      {step === 0 && (
        <g>
          {[
            [360, 230],
            [440, 280],
            [400, 250],
          ].map(([x, y], i) => (
            <motion.circle
              key={`enc-${i}`}
              cx={x}
              cy={y}
              r="4"
              fill="url(#capDrop)"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity, repeatDelay: 1 }}
            />
          ))}
        </g>
      )}

      {/* STEP 2: adhere — droplets sticking, some passing through */}
      {step === 1 && (
        <g>
          {[
            [350, 215],
            [430, 295],
            [395, 255],
            [375, 240],
          ].map(([x, y], i) => (
            <motion.circle
              key={`adh-${i}`}
              cx={x}
              cy={y}
              r={5 + (i % 2)}
              fill="url(#capDrop)"
              initial={{ opacity: 0 }}
              animate={reduce ? { opacity: 1 } : { opacity: [0, 1, 1], scale: [0.6, 1.1, 1] }}
              transition={{ duration: 1.4, delay: i * 0.15, repeat: Infinity, repeatDelay: 0.8 }}
            />
          ))}
          {/* a few passing through (right side) */}
          {reduce
            ? null
            : [180, 260, 340].map((y, i) => (
                <motion.circle
                  key={`pass-${i}`}
                  cx={560}
                  cy={y}
                  r="2.5"
                  fill="url(#capDrop)"
                  animate={{ cx: [560, 660], opacity: [0.8, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.4 }}
                />
              ))}
        </g>
      )}

      {/* STEP 3: coalesce — droplets merging into bigger drops */}
      {step === 2 && (
        <g>
          {[400, 360, 440].map((x, i) => (
            <motion.circle
              key={`coal-${i}`}
              cx={x}
              cy={250 - i * 10}
              r="7"
              fill="url(#capDrop)"
              initial={{ r: 3 }}
              animate={reduce ? { r: 8 } : { r: [3, 9, 7] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
            />
          ))}
          {/* merge lines */}
          {reduce ? null : (
            <motion.line
              x1="360"
              y1="240"
              x2="400"
              y2="250"
              stroke="#80D9F2"
              strokeWidth="1"
              opacity="0"
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
          )}
        </g>
      )}

      {/* STEP 3: drain — drops sliding down filaments to gutter */}
      {step === 3 && (
        <g>
          {/* gutter channels water into the collection tank */}
          <path
            d="M 270 397 Q 400 410 530 397 L 530 417 Q 400 430 270 417 Z"
            fill="#123B42"
            stroke="#42E6C4"
            strokeWidth="1"
          />
          <path
            d="M 520 407 L 555 407 L 555 360"
            fill="none"
            stroke="#42E6C4"
            strokeOpacity="0.75"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* reservoir */}
          <g>
            <path
              d="M 562 300 Q 562 290 572 290 L 652 290 Q 662 290 662 300 L 662 420 Q 662 434 648 434 L 576 434 Q 562 434 562 420 Z"
              fill="url(#captureTank)"
              stroke="#42E6C4"
              strokeOpacity="0.8"
              strokeWidth="2"
            />
            <path
              d="M 570 335 Q 607 328 654 335 L 654 419 Q 654 426 646 426 L 578 426 Q 570 426 570 418 Z"
              fill="url(#captureWater)"
            >
              {!reduce && (
                <animate
                  attributeName="d"
                  values="M 570 375 Q 607 368 654 375 L 654 419 Q 654 426 646 426 L 578 426 Q 570 426 570 418 Z;M 570 335 Q 607 328 654 335 L 654 419 Q 654 426 646 426 L 578 426 Q 570 426 570 418 Z"
                  dur="4s"
                  repeatCount="indefinite"
                />
              )}
            </path>
            <ellipse
              cx="612"
              cy="290"
              rx="40"
              ry="7"
              fill="#0B2C33"
              stroke="#42E6C4"
              strokeOpacity="0.8"
              strokeWidth="1.5"
            />
            <path
              d="M 575 308 L 575 321 M 649 308 L 649 321"
              stroke="#80D9F2"
              strokeOpacity="0.45"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <text
              x="612"
              y="454"
              textAnchor="middle"
              className="fill-muted-slate font-mono text-[10px] uppercase tracking-wider"
            >
              Reservoir
            </text>
          </g>

          {/* drops traveling down */}
          {[
            { x: 330, y: 174, endY: 380 },
            { x: 390, y: 239, endY: 380 },
            { x: 370, y: 238, endY: 300 },
            { x: 450, y: 271, endY: 300 },
          ].map(({ x, y, endY }, i) => (
            <motion.circle
              key={`drn-${i}`}
              cx={x}
              cy={y}
              r="5"
              fill="url(#capDrop)"
              animate={
                reduce
                  ? { cx: 562, cy: 360, opacity: 1 }
                  : {
                      cx: [x, 400, 520, 555],
                      cy: [y, endY, 407, 360],
                      opacity: [0, 1, 1, 0.4],
                    }
              }
              transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.4, ease: 'easeIn' }}
            />
          ))}
        </g>
      )}

      {/* step indicator */}
      <g>
        <text x="350" y="40" textAnchor="middle" className="fill-warm-white font-mono text-[11px] uppercase tracking-wider">
          Stage {step + 1} / 4 — {steps[step].title}
        </text>
      </g>
    </svg>
  );
}
