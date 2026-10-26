import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/site/navbar';
import Footer from '@/components/site/footer';

const team = [
  {
    initials: 'AY',
    name: 'Abu Yousuf Md Tasdikujjaman',
    focus: 'Research & Technological Planning',
    bio: 'Full Stack Development | Infrastructure Engineering | Business Strategy',
  },
  {
    initials: 'ME',
    name: 'Mst Tasfia Jaman Efti',
    focus: 'Strategy & Communication',
    bio: 'Strategic Planning | Communication | Team Coordination',
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <header className="section-shell bg-hero-vignette pb-16 pt-32 md:pb-24 md:pt-40">
          <div className="container-prose">
            <p className="mono-label mb-5 flex items-center gap-3 text-aqua">
              <span className="h-px w-8 bg-aqua/70" />
              ABOUT GOSSAMER
            </p>
            <h1 className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-warm-white sm:text-5xl md:text-6xl text-balance">
              Finding value in the
              <span className="text-aqua"> droplets that drift away.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-slate md:text-lg text-pretty">
              Gossamer explores a simple idea: an open, web-like collector could
              intercept liquid drift leaving industrial cooling towers, then
              guide collected water toward testing and suitable reuse.
            </p>
          </div>
        </header>

        <section className="section-shell bg-section-deep py-16 md:py-20">
          <div className="container-prose">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div>
                <p className="mono-label text-aqua">Our approach</p>
                <h2 className="mt-4 max-w-md font-display text-3xl font-medium leading-tight text-warm-white sm:text-4xl">
                  Let air pass.
                  <span className="text-aqua"> Catch the liquid.</span>
                </h2>
              </div>
              <div className="space-y-4 text-base leading-relaxed text-muted-slate text-pretty">
                <p>
                  Cooling towers carry fine liquid droplets away with their
                  exhaust. Gossamer focuses on those droplets—not on capturing
                  the air itself or condensing water vapor.
                </p>
                <p>
                  The system brings together an open web, a drainage route, and
                  a holding reservoir. Collected water is tested and treated
                  when required before any decision about industrial reuse.
                </p>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center gap-2 pt-2 font-medium text-aqua transition-colors hover:text-warm-white"
                >
                  See how it works
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell bg-midnight py-16 md:py-20">
          <div className="container-prose">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="mono-label text-aqua">The team</p>
                <h2 className="mt-4 font-display text-3xl font-medium text-warm-white sm:text-4xl">
                  People behind the idea.
                </h2>
              </div>
              <p className="max-w-lg text-sm leading-relaxed text-muted-slate">
                Research, technical planning, strategy, and communication come
                together to shape Gossamer.
              </p>
            </div>

            <ul className="grid gap-4 md:grid-cols-2">
              {team.map((member) => (
                <li
                  key={member.name}
                  className="rounded-2xl border border-fine-border bg-deep-teal/65 p-6 sm:p-8"
                >
                  <div className="flex items-start gap-5">
                    <span
                      aria-hidden="true"
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-aqua/30 bg-aqua/10 font-display text-lg font-semibold text-aqua"
                    >
                      {member.initials}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-medium leading-snug text-warm-white">
                        {member.name}
                      </h3>
                      <p className="mt-2 text-sm font-medium text-aqua">
                        {member.focus}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-slate text-pretty">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-shell bg-section-deep py-14 md:py-16">
          <div className="container-prose">
            <div className="flex flex-col justify-between gap-6 rounded-2xl border border-aqua/25 bg-surface-teal/40 p-6 sm:flex-row sm:items-center sm:p-8">
              <div>
                <p className="mono-label text-aqua">Continue exploring</p>
                <h2 className="mt-3 font-display text-2xl font-medium text-warm-white">
                  Let&apos;s talk about water recovery.
                </h2>
              </div>
              <Link
                href="/contact"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-aqua px-5 py-3 text-sm font-semibold text-midnight transition-colors hover:bg-warm-white"
              >
                Get in touch
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
