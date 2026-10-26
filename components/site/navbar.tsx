'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';
import SiteLogo from './site-logo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const sectionLinks = siteConfig.nav.filter((item) =>
    ['home', 'features', 'system', 'impact'].includes(item.id),
  );
  const pageLinks = siteConfig.nav.filter((item) =>
    ['how-it-works', 'about', 'contact'].includes(item.id),
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== '/') {
      setActive(pathname);
      return;
    }

    const ids = siteConfig.nav
      .map((item) => item.id)
      .filter((id) => !id.startsWith('/'));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.1, 0.3, 0.6] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-all duration-300',
          scrolled
            ? 'border-fine-border/70 bg-midnight/90 shadow-lg shadow-black/10 backdrop-blur-xl'
            : 'border-fine-border/30 bg-midnight/65 backdrop-blur-lg',
        )}
      >
        <div className="container-prose flex h-[4.5rem] items-center justify-between">
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5"
            aria-label={`${siteConfig.name} home`}
            onClick={() => setOpen(false)}
          >
            <SiteLogo size={34} />
            <span className="font-display text-base font-semibold tracking-tight text-warm-white">
              {siteConfig.name}
            </span>
          </Link>

          <nav
            className="hidden items-center gap-5 xl:flex"
            aria-label="Main navigation"
          >
            <div className="flex items-center gap-0.5">
              {sectionLinks.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  active={active === item.id || pathname === `/${item.id}`}
                  onClick={() => setOpen(false)}
                />
              ))}
            </div>
            <div className="flex items-center gap-0.5 border-l border-fine-border pl-4">
              {pageLinks.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  active={active === item.id || pathname === `/${item.id}`}
                  onClick={() => setOpen(false)}
                />
              ))}
            </div>
          </nav>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-fine-border text-warm-white transition-colors hover:border-aqua/50 xl:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        <ScrollProgress />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[4.5rem] z-40 bg-midnight/95 backdrop-blur-xl xl:hidden"
          >
            <nav className="container-prose flex flex-col gap-1 py-6" aria-label="Mobile navigation">
              {siteConfig.nav.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * index }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-fine-border/50 py-4 text-left font-display text-lg text-warm-white transition-colors hover:text-aqua"
                  >
                    {item.label}
                    <span aria-hidden="true" className="text-aqua">→</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({
  item,
  active,
  onClick,
}: {
  item: (typeof siteConfig.nav)[number];
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        'relative whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-medium transition-colors duration-200',
        active
          ? 'bg-aqua/10 text-aqua'
          : 'text-muted-slate hover:text-warm-white',
      )}
    >
      {item.label}
    </Link>
  );
}

function ScrollProgress() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return <ProgressFollower />;
}

function ProgressFollower() {
  useEffect(() => {
    let raf = 0;
    const el = document.getElementById('scroll-progress-bar');
    if (!el) return;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        const progress = max > 0 ? h.scrollTop / max : 0;
        el.style.transform = `scaleX(${progress})`;
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return (
    <div
      id="scroll-progress-bar"
      className="absolute bottom-0 left-0 h-px w-full origin-left bg-gradient-to-r from-aqua via-sky-cyan to-aqua"
      style={{ transform: 'scaleX(0)' }}
    />
  );
}
