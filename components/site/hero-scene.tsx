import { ArrowDown, ArrowRight, Play } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export default function HeroScene() {
  return (
    <section
      id="home"
      className="relative flex min-h-[min(900px,100svh)] w-full items-center overflow-hidden bg-hero-vignette py-28 sm:min-h-screen"
    >
      <div className="absolute inset-0 bg-grid-fine opacity-[0.06] [mask-image:radial-gradient(80%_60%_at_60%_45%,black,transparent)]" />
      <HeroSVG />

      <div className="container-prose relative z-10">
        <div className="max-w-4xl">
          <p className="mono-label mb-6 flex items-center gap-3 text-sky-cyan">
            <span className="h-px w-8 bg-sky-cyan/70" />
            WATER RECOVERY · COOLING TOWERS
          </p>

          <h1 className="max-w-4xl font-display text-4xl font-medium leading-[1.02] tracking-tight text-warm-white sm:text-5xl md:text-6xl lg:text-[4.5rem] text-balance">
            What if a <span className="text-aqua text-glow-aqua">web</span>{' '}
            could catch the water we lose?
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-slate md:text-lg text-pretty">
            Cooling towers send water droplets away with their exhaust. What if
            we could catch those droplets and put that water back to work?
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#system"
              className="group inline-flex min-h-12 items-center gap-2.5 rounded-full bg-aqua px-6 py-3 text-sm font-semibold text-midnight shadow-lg shadow-aqua/10 transition-colors hover:bg-warm-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-midnight"
            >
              <Play size={14} fill="currentColor" aria-hidden="true" />
              Watch demo
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
            <a
              href="#features"
              className="group inline-flex min-h-12 items-center gap-2.5 rounded-full border border-fine-border bg-midnight/65 px-6 py-3 text-sm font-medium text-warm-white transition-colors hover:border-aqua/50 hover:bg-aqua/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-midnight"
            >
              Explore features
              <ArrowDown
                size={15}
                className="transition-transform group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>

          <p className="mt-7 mono-label">
            {siteConfig.name} · drift recovery
          </p>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-slate sm:flex"
        aria-hidden="true"
      >
        <span className="mono-label">Scroll to explore</span>
        <span className="flex h-10 w-6 items-start justify-center rounded-full border border-fine-border p-1.5">
          <span className="h-1.5 w-1.5 animate-[hero-scroll_1.8s_ease-in-out_infinite] rounded-full bg-aqua" />
        </span>
      </div>
    </section>
  );
}

function HeroSVG() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMaxYMid slice"
      role="img"
      aria-label="A cooling tower plume passing through a web-like droplet collector"
      style={{
        opacity: 0.65,
        maskImage: 'linear-gradient(90deg, transparent 20%, black 68%)',
      }}
    >
      <defs>
        <radialGradient id="hero-plume">
          <stop stopColor="#80D9F2" stopOpacity=".2" />
          <stop offset="1" stopColor="#80D9F2" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hero-web" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#80D9F2" stopOpacity=".75" />
          <stop offset="1" stopColor="#42E6C4" stopOpacity=".35" />
        </linearGradient>
        <linearGradient id="hero-tower" x1="0" x2="1">
          <stop stopColor="#0B2C33" />
          <stop offset=".5" stopColor="#123B42" />
          <stop offset="1" stopColor="#0B2C33" />
        </linearGradient>
      </defs>

      <g className="hero-scene-art">
        <g className="hero-plume">
          <ellipse cx="1130" cy="240" rx="230" ry="270" fill="url(#hero-plume)" />
          <path
            d="M1130 430C1080 330 1190 250 1120 145"
            fill="none"
            stroke="#80D9F2"
            strokeDasharray="3 10"
            strokeOpacity=".24"
            strokeWidth="2"
          />
          <circle cx="1102" cy="365" r="5" fill="#80D9F2" fillOpacity=".6" />
          <circle cx="1158" cy="300" r="4" fill="#80D9F2" fillOpacity=".45" />
          <circle cx="1090" cy="237" r="3" fill="#80D9F2" fillOpacity=".55" />
        </g>

        <g className="hero-web">
          <rect
            x="475"
            y="300"
            width="280"
            height="300"
            rx="8"
            fill="#0B2C33"
            fillOpacity=".24"
            stroke="#80D9F2"
            strokeOpacity=".18"
          />
          <g transform="translate(615 450)" fill="none" stroke="url(#hero-web)">
            <circle r="34" strokeWidth="1" />
            <circle r="68" strokeOpacity=".8" strokeWidth="1" />
            <circle r="102" strokeOpacity=".65" strokeWidth="1" />
            <circle r="136" strokeOpacity=".5" strokeWidth="1" />
            <path d="M-136 0H136M0-145V145M-102-102 102 102M102-102-102 102" strokeOpacity=".7" />
            <path d="M-52-125Q-20-20 78 110M-118-68Q-15-38 132 42M-126 54Q-20 10 82-126M-69 118Q-50 15 125-56" strokeOpacity=".55" />
          </g>
          <circle cx="566" cy="413" r="5" fill="#B9F1FF" />
          <circle cx="660" cy="500" r="4" fill="#42E6C4" />
          <circle cx="615" cy="345" r="4" fill="#80D9F2" />
          <path
            d="M615 600C610 640 575 665 548 700H490"
            fill="none"
            stroke="#42E6C4"
            strokeDasharray="4 8"
            strokeOpacity=".55"
            strokeWidth="2"
          />
        </g>

        <g className="hero-tower">
          <path
            d="M1015 810Q1048 545 1080 425H1180Q1212 545 1245 810Z"
            fill="url(#hero-tower)"
            stroke="#1a4a52"
            strokeWidth="2"
          />
          <ellipse
            cx="1130"
            cy="425"
            rx="51"
            ry="13"
            fill="#061A20"
            stroke="#24444A"
            strokeWidth="2"
          />
          <path
            d="M1050 650H1210M1032 760H1228"
            stroke="#24444A"
            strokeOpacity=".55"
          />
        </g>
      </g>
    </svg>
  );
}
