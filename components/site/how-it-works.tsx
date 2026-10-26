import {
  ArrowDownToLine,
  ArrowRight,
  Droplets,
  FlaskConical,
  Wind,
} from 'lucide-react';
import Link from 'next/link';
import { SectionHeader } from './section-header';

const steps = [
  {
    icon: Wind,
    title: 'Intercept drift',
    text: 'The open web sits across the exhaust path. Air continues through while liquid droplets meet the filaments.',
  },
  {
    icon: Droplets,
    title: 'Gather droplets',
    text: 'Droplets cling to the filaments, join together, and move downward under gravity.',
  },
  {
    icon: ArrowDownToLine,
    title: 'Collect the flow',
    text: 'A drainage edge guides water into a gutter, then through a pipe to a holding reservoir.',
  },
  {
    icon: FlaskConical,
    title: 'Test, then reuse',
    text: 'Check collected water quality and treat when needed before routing suitable water to an industrial use.',
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="section-shell bg-midnight py-16 md:py-20"
    >
      <div className="container-prose">
        <SectionHeader
          label="How it works"
          className="mb-8 md:mb-10"
          title={
            <>
              Four steps from
              <span className="text-aqua"> exhaust to reuse.</span>
            </>
          }
        />

        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <li
              key={title}
              className="relative rounded-xl border border-fine-border bg-deep-teal/65 p-5"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-aqua/30 bg-aqua/10 text-aqua">
                  <Icon size={18} aria-hidden="true" />
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-medium text-warm-white">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-slate text-pretty">
                {text}
              </p>
              {index < steps.length - 1 && (
                <ArrowRight
                  size={16}
                  className="absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 text-aqua/70 xl:block"
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>
        <Link
          href="/how-it-works"
          className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-aqua transition-colors hover:text-warm-white"
        >
          Explore the full process
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
