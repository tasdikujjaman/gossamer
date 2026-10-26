'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Register GSAP plugins once on the client.
 */
export function useGsapReady() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
  }, []);
}

/**
 * Run GSAP setup inside a scoped context that auto-cleans on unmount.
 * The callback receives a gsap selector scoped to the container.
 */
export function useGsapContext(
  setup: (self: gsap.Context, scope: HTMLElement) => void,
  deps: unknown[] = [],
) {
  const scopeRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!scopeRef.current) return;
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReduced) {
      return;
    }

    const ctx = gsap.context((self) => {
      if (self.selector && scopeRef.current) {
        setup(self, scopeRef.current);
      }
    }, scopeRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scopeRef;
}

export { gsap, ScrollTrigger };
