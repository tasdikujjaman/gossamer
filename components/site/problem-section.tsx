import {
  ArrowDown,
  ArrowDownToLine,
  ArrowRight,
  Droplets,
  FlaskConical,
  Waves,
} from 'lucide-react';
import { SectionHeader } from './section-header';

const researchUrl =
  'https://www.energy.gov/cmei/femp/best-management-practice-10-cooling-tower-management';

const solutionSteps = [
  {
    icon: Waves,
    title: 'Intercept drift',
    text: 'An open, web-like mesh is designed to catch liquid droplets carried out with the exhaust while letting air pass.',
  },
  {
    icon: ArrowDownToLine,
    title: 'Collect the water',
    text: 'Captured droplets could merge, drain from the mesh, and flow to a collection point.',
  },
  {
    icon: FlaskConical,
    title: 'Reuse',
    text: 'Test collected water and treat it when required before deciding whether it is suitable for industrial use.',
  },
];

export default function ProblemSection() {
  return (
    <section
      id="problem"
      className="section-shell bg-section-deep py-24 md:py-32"
    >
      <div className="container-prose">
        <SectionHeader
          label="Issue & our solution"
          title={
            <>
              A real water loss.
              <span className="text-aqua"> A focused response.</span>
            </>
          }
        />

        <div className="grid gap-5 lg:grid-cols-2 lg:gap-8">
          <article
            className="flex flex-col rounded-2xl border border-fine-border bg-deep-teal/70 p-6 sm:p-8 md:p-10"
          >
            <div className="mono-label mb-5 flex items-center gap-3 text-sky-cyan">
              <span className="h-px w-8 bg-sky-cyan/60" />
              The issue
            </div>
            <h3 className="max-w-lg font-display text-2xl font-medium leading-tight text-warm-white sm:text-3xl">
              Every day, droplets drift away with the exhaust.
            </h3>
            <p className="mt-5 leading-relaxed text-muted-slate text-pretty">
              Cooling towers reject heat by evaporating water. Carried upward
              with that exhaust are fine liquid droplets — <em>drift</em> — that
              never return to the basin. They simply leave.
            </p>
            <p className="mt-4 leading-relaxed text-muted-slate text-pretty">
              A web doesn&apos;t stop the air. It lets the plume pass through
              while intercepting the droplets riding on it. Gossamer develops
              that approach into a durable collector.
            </p>

            <div className="mt-8 rounded-xl border border-fine-border bg-midnight/60 p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-sky-cyan/10 text-sky-cyan">
                  <Droplets size={21} aria-hidden="true" />
                </div>
                <div>
                  <p className="font-display text-lg font-medium text-warm-white">
                    The web targets drift—not evaporation.
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-slate">
                    Gossamer targets liquid droplets carried out with the
                    exhaust, not water vapor.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-fine-border/80 bg-midnight/40 p-4">
                <div className="font-display text-2xl font-medium text-warm-white">
                  2–4
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted-slate">
                  typical cycles of concentration in many systems
                </p>
              </div>
              <div className="rounded-xl border border-fine-border/80 bg-midnight/40 p-4">
                <div className="font-display text-2xl font-medium text-warm-white">
                  3 → 6
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted-slate">
                  cycles can reduce make-up water by 20%*
                </p>
              </div>
            </div>
          </article>

          <article
            className="flex flex-col rounded-2xl border border-aqua/25 bg-surface-teal/35 p-6 sm:p-8 md:p-10"
          >
            <div className="mono-label mb-5 flex items-center gap-3 text-aqua">
              <span className="h-px w-8 bg-aqua/60" />
              Our solution
            </div>
            <h3 className="max-w-lg font-display text-2xl font-medium leading-tight text-warm-white sm:text-3xl">
              Catch droplets. Guide them back to use.
            </h3>
            <p className="mt-5 leading-relaxed text-muted-slate text-pretty">
              Gossamer uses an open, web-like collector near the exhaust. It
              follows a direct route from droplet capture to collection and
              water-quality assessment.
            </p>

            <ol className="mt-8 space-y-0">
              {solutionSteps.map(({ icon: Icon, title, text }, index) => (
                <li
                  key={title}
                  className="relative flex gap-4 pb-7 last:pb-0"
                >
                  {index < solutionSteps.length - 1 && (
                    <span
                      className="absolute left-[17px] top-10 h-[calc(100%-1.75rem)] w-px bg-fine-border"
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-aqua/30 bg-midnight text-aqua">
                    <Icon size={16} aria-hidden="true" />
                  </span>
                  <div className="pt-1">
                    <h4 className="font-display font-medium text-warm-white">
                      {title}
                    </h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-slate text-pretty">
                      {text}
                    </p>
                  </div>
                  {index < solutionSteps.length - 1 && (
                    <ArrowDown
                      size={14}
                      className="absolute bottom-2 left-[11px] text-aqua/50"
                      aria-hidden="true"
                    />
                  )}
                </li>
              ))}
            </ol>

          </article>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-fine-border bg-fine-border sm:grid-cols-2">
          <div className="bg-surface-teal/60 p-5">
            <div className="mono-label mb-2">What leaves</div>
            <div className="font-display text-lg text-sky-cyan">
              Liquid droplets
            </div>
          </div>
          <div className="bg-surface-teal/60 p-5">
            <div className="mono-label mb-2">What returns</div>
            <div className="font-display text-lg text-aqua">
              Collected water
            </div>
          </div>
        </div>
        <p className="mt-4 mono-label leading-relaxed normal-case tracking-normal">
          The intended route: drift captured, collected, and assessed for reuse.
        </p>

        <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-relaxed text-muted-slate/80">
          <span>
            * DOE reports that increasing cycles of concentration from 3 to 6
            can reduce make-up water by 20% and blowdown by 50%; actual limits
            depend on water quality and treatment.
          </span>
          <a
            href={researchUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-aqua underline decoration-aqua/40 underline-offset-4 transition-colors hover:text-warm-white"
          >
            U.S. Department of Energy source
            <ArrowRight size={12} aria-hidden="true" />
          </a>
        </p>
      </div>
    </section>
  );
}
