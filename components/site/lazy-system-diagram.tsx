'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const SystemDiagram = dynamic(() => import('./system-diagram'), {
  ssr: false,
});

export default function LazySystemDiagram() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px' },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div id="system" ref={sectionRef}>
      {shouldLoad ? <SystemDiagram /> : <SystemPlaceholder />}
    </div>
  );
}

function SystemPlaceholder() {
  return (
    <section
      aria-label="Full system diagram loading"
      className="section-shell bg-section-deep py-24 md:py-32"
    >
      <div className="container-prose">
        <div className="mb-12">
          <div className="mono-label flex items-center gap-4">
            <span className="h-px w-12 bg-aqua/40" />
            Complete system
          </div>
          <h2 className="mt-6 max-w-3xl font-display text-3xl font-medium leading-[1.08] tracking-tight text-warm-white sm:text-4xl md:text-5xl">
            The whole journey,
            <span className="text-aqua"> in one diagram.</span>
          </h2>
        </div>
        <div className="grid animate-pulse gap-6 lg:grid-cols-12">
          <div className="min-h-[24rem] rounded-xl border border-fine-border bg-surface-teal/25 lg:col-span-8" />
          <div className="min-h-48 rounded-xl border border-fine-border bg-surface-teal/25 lg:col-span-4" />
          <div className="h-24 rounded-xl border border-fine-border bg-surface-teal/25 lg:col-span-4" />
          <div className="h-24 rounded-xl border border-fine-border bg-surface-teal/25 lg:col-span-4" />
          <div className="h-24 rounded-xl border border-fine-border bg-surface-teal/25 lg:col-span-4" />
        </div>
      </div>
    </section>
  );
}
