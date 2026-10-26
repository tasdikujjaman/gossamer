import Link from 'next/link';
import {
  Blocks,
  CircleDot,
  MoveDownRight,
  Network,
} from 'lucide-react';
import { SectionHeader } from './section-header';

const features = [
  {
    icon: Blocks,
    title: 'Modular support frame',
    spec: 'Corrosion-resistant alloy · bolted modules',
    desc: 'A serviceable frame supports the collector across the exhaust path. Modular bays are designed to allow staged installation and replacement.',
  },
  {
    icon: CircleDot,
    title: 'Hydrophilic filaments',
    spec: 'UV-stable polymer · treated surface',
    desc: 'Fine filaments form the open web. Their hydrophilic surface is intended to encourage intercepted droplets to cling and gather.',
  },
  {
    icon: Network,
    title: 'Radial web geometry',
    spec: 'Open area ~85% · multi-angle interception',
    desc: 'A radial-and-concentric layout provides multiple interception angles while preserving an open path for airflow.',
  },
  {
    icon: MoveDownRight,
    title: 'Gravity-fed drainage',
    spec: 'Drainage edge · coated collection channel',
    desc: 'A lower edge guides captured water into a gutter, then onward to a collection point away from the exhaust.',
  },
];

export default function FeatureSection() {
  return (
    <section
      id="features"
      className="section-shell bg-section-deep py-20 md:py-24"
    >
      <div className="container-prose">
        <SectionHeader
          label="Features"
          className="mb-8 md:mb-10"
          title={
            <>
              Designed around the journey
              <span className="text-aqua"> each droplet takes.</span>
            </>
          }
        />

        <p className="mb-8 max-w-3xl leading-relaxed text-muted-slate text-pretty">
          An open collector brings together a durable frame, fine filaments,
          purposeful geometry, and a clear drainage route.
        </p>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {features.map(({ icon: Icon, title, spec, desc }) => (
            <li
              key={title}
              className="rounded-2xl border border-fine-border bg-deep-teal/65 p-6 transition-colors hover:border-aqua/35 hover:bg-deep-teal/90"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-aqua/25 bg-aqua/10 text-aqua">
                <Icon size={19} aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-display text-lg font-medium leading-snug text-warm-white">
                {title}
              </h3>
              <p className="mt-3 border-t border-fine-border pt-3 text-xs leading-relaxed text-aqua/80">
                {spec}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-slate text-pretty">
                {desc}
              </p>
            </li>
          ))}
        </ul>
        <Link
          href="/how-it-works"
          className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-aqua transition-colors hover:text-warm-white"
        >
          See how the features work together
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
