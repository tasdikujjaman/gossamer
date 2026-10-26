import {
  ArrowUpRight,
  Linkedin,
  Mail,
  MapPin,
  Youtube,
} from 'lucide-react';
import Navbar from '@/components/site/navbar';
import Footer from '@/components/site/footer';
import { siteConfig } from '@/lib/site-config';

const socialIcons = {
  LinkedIn: Linkedin,
  YouTube: Youtube,
  X: XIcon,
};

function XIcon({ size = 20 }: { size?: number }) {
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

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <header className="section-shell bg-hero-vignette pb-14 pt-32 md:pb-20 md:pt-40">
          <div className="container-prose">
            <p className="mono-label mb-5 flex items-center gap-3 text-aqua">
              <span className="h-px w-8 bg-aqua/70" />
              CONTACT
            </p>
            <h1 className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-warm-white sm:text-5xl md:text-6xl text-balance">
              Have a question?
              <span className="text-aqua"> Let&apos;s connect.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-slate md:text-lg text-pretty">
              We welcome conversations about the Gossamer system, research
              opportunities, and potential collaboration.
            </p>
          </div>
        </header>

        <section className="section-shell bg-section-deep pt-8 pb-20 md:pt-12 md:pb-28">
          <div className="container-prose">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
              <div>
                <p className="mono-label flex items-center gap-3 text-aqua">
                  <Mail size={15} aria-hidden="true" />
                  Email us
                </p>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="group mt-4 inline-flex max-w-full flex-wrap items-center gap-x-3 gap-y-1 font-display text-2xl font-medium tracking-tight text-warm-white transition-colors hover:text-aqua sm:text-3xl md:text-4xl"
                >
                  <span className="break-all">{siteConfig.contactEmail}</span>
                  <ArrowUpRight
                    size={22}
                    className="text-aqua transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
                <p className="mt-4 text-sm leading-relaxed text-muted-slate">
                  Send us a note about the project, research, or potential
                  collaboration.
                </p>
                <p className="mt-8 flex items-center gap-2.5 text-sm text-muted-slate">
                  <MapPin size={17} className="text-aqua" aria-hidden="true" />
                  {siteConfig.location}
                </p>
              </div>

              <div className="flex items-center gap-4 border-t border-fine-border pt-8 sm:gap-6 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
                <ul aria-label="Social media" className="flex items-center gap-4 sm:gap-6">
                  {siteConfig.socials.map(({ label, href }) => {
                    const Icon = socialIcons[label];
                    return (
                      <li key={label}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Gossamer on ${label}`}
                          className="group flex h-14 w-14 items-center justify-center rounded-full border border-fine-border bg-deep-teal/50 text-warm-white transition-all hover:border-aqua/60 hover:bg-aqua/10 hover:text-aqua focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-midnight sm:h-16 sm:w-16"
                        >
                          <Icon size={21} aria-hidden="true" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
