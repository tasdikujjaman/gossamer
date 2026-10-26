import { Building2, Factory, Droplets, Waves } from 'lucide-react';
import { SectionHeader } from './section-header';

const opportunities = [
  {
    icon: Building2,
    title: 'Data centers',
    text: 'At sites using evaporative or hybrid cooling, recovered drift water could supplement cooling-tower make-up and help ease freshwater demand.',
  },
  {
    icon: Factory,
    title: 'Power plants',
    text: 'Cooling towers release water with their exhaust. Capturing some liquid drift could return an additional stream for assessment and suitable plant reuse.',
  },
  {
    icon: Droplets,
    title: 'Water-smart industry',
    text: 'Industrial facilities could add recovered water to a local reuse loop, turning a small exhaust loss into a resource considered alongside other non-potable supplies.',
  },
  {
    icon: Waves,
    title: 'Water-stressed regions',
    text: 'Where cooling towers operate under water constraints, even a supplemental source could support more resilient operations—subject to testing and water-quality checks.',
  },
];

const plumeResearchUrl = 'https://doi.org/10.4491/eer.2018.192';
const dataCenterResearchUrl =
  'https://doi.org/10.1080/01457632.2018.1436418';

export default function ImpactSection() {
  return (
    <section
      id="impact"
      className="section-shell bg-section-deep py-16 md:py-20"
    >
      <div className="container-prose">
        <SectionHeader
          label="The potential"
          dark
          className="mb-5 md:mb-7"
          title={
            <>
              Keep more water
              <span className="text-aqua2-600"> in circulation.</span>
            </>
          }
        />

        <p className="mb-6 max-w-3xl leading-relaxed text-muted-slate text-pretty">
          Gossamer aims to turn liquid drift from cooling-tower exhaust into a
          supplemental water stream for assessment and potential industrial
          reuse — from data-center cooling to power generation.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {opportunities.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-fine-border bg-deep-teal p-4 transition-colors hover:border-aqua2-600/40"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-aqua/20 bg-aqua/10 text-aqua">
                <item.icon size={18} aria-hidden="true" />
              </div>
              <h3 className="mt-3 font-display text-base font-medium text-warm-white">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-slate text-pretty">
                {item.text}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-5 rounded-xl border border-aqua/25 bg-surface-teal/35 p-4 sm:p-5">
          <div className="grid gap-4 md:grid-cols-[auto_1fr] md:items-center">
            <div className="md:min-w-44">
              <div className="mono-label text-aqua/80">
                Published research · membrane condenser
              </div>
              <p className="mt-1.5 font-display text-2xl font-medium text-warm-white">
                46% to &gt;70%
              </p>
              <p className="mt-1 text-sm text-muted-slate">
                recovery under the study conditions
              </p>
            </div>
            <div>
              <p className="text-sm leading-relaxed text-muted-slate text-pretty">
                At a plume temperature near 25°C, relative humidity around
                142%, and a feed-flow-to-membrane-area ratio of 2.7 m/h,
                Macedonio et al. measured 46.04% recovery at a 6°C temperature
                difference and more than 70% at about 13.9°C in a prototype
                <em> membrane condenser</em>. This separate technology offers
                plume-water recovery context; the figures describe membrane
                condensation, not Gossamer&apos;s droplet-interception design.
              </p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs">
                <a
                  href={plumeResearchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-aqua underline decoration-aqua/40 underline-offset-4 hover:text-warm-white"
                >
                  Macedonio et al., “Recovery of water and contaminants from
                  cooling tower plume” (2019)
                </a>
                <a
                  href={dataCenterResearchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-aqua underline decoration-aqua/40 underline-offset-4 hover:text-warm-white"
                >
                  Ndukaife &amp; Nnanna, “Optimization of Water Consumption in
                  Hybrid Evaporative Cooling Air Conditioning Systems for Data
                  Center Cooling Applications” (2018)
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
