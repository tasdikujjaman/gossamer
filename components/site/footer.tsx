import Link from 'next/link';
import { Linkedin, MapPin, Youtube } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import SiteLogo from './site-logo';

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.6 22H2.4l7.3-8.4L1.9 2h6.5l4.5 6.8L18.9 2Zm-1.1 18h1.7L7.4 3.9H5.6L17.8 20Z" />
    </svg>
  );
}

const socialIcons = {
  LinkedIn: Linkedin,
  YouTube: Youtube,
  X: XIcon,
};

export default function Footer() {
  return (
    <footer className="border-t border-fine-border bg-midnight py-14 md:py-16">
      <div className="container-prose">
        <div className="grid gap-10 border-b border-fine-border/70 pb-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <SiteLogo size={40} />
              <span className="font-display text-lg font-semibold text-warm-white">
                {siteConfig.name}
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-slate text-pretty">
              {siteConfig.description}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {siteConfig.socials.map(({ label, href }) => {
                const Icon = socialIcons[label];
                return (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Gossamer on ${label}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-fine-border text-muted-slate transition-colors hover:border-aqua/50 hover:bg-aqua/10 hover:text-aqua"
                    >
                      <Icon size={16} aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <nav aria-label="Product links">
            <h2 className="mono-label mb-4 text-warm-white">Explore</h2>
            <ul className="space-y-3">
              <FooterLink href="/#features">Features</FooterLink>
              <FooterLink href="/how-it-works">How it works</FooterLink>
              <FooterLink href="/#system">Full system</FooterLink>
              <FooterLink href="/#impact">Impact</FooterLink>
            </ul>
          </nav>

          <nav aria-label="Company links">
            <h2 className="mono-label mb-4 text-warm-white">Company</h2>
            <ul className="space-y-3">
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
              <FooterLink href="/legal">Legal & policies</FooterLink>
            </ul>
          </nav>

          <div>
            <h2 className="mono-label mb-4 text-warm-white">Start a conversation</h2>
            <p className="mb-3 text-sm leading-relaxed text-muted-slate">
              Questions, research, or collaboration ideas? We would be glad to hear from you.
            </p>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="break-all text-sm font-medium text-aqua underline decoration-aqua/30 underline-offset-4 transition-colors hover:text-warm-white"
            >
              {siteConfig.contactEmail}
            </a>
            <p className="mt-4 flex items-center gap-2 text-sm text-muted-slate">
              <MapPin
                size={15}
                className="shrink-0 text-aqua"
                aria-hidden="true"
              />
              {siteConfig.location}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="mono-label normal-case tracking-normal text-muted-slate/60">
            Capture · collect · assess · reuse
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <nav aria-label="Legal links">
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                <FooterLink href="/legal#privacy">Privacy</FooterLink>
                <FooterLink href="/legal#terms">Terms</FooterLink>
                <FooterLink href="/legal#cookies">Cookies</FooterLink>
              </ul>
            </nav>
            <span className="mono-label normal-case tracking-normal text-muted-slate/60">
              © {new Date().getFullYear()} {siteConfig.name}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-muted-slate transition-colors hover:text-aqua"
      >
        {children}
      </Link>
    </li>
  );
}
