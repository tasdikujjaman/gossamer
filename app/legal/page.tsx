import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/site/navbar';
import Footer from '@/components/site/footer';

const sections = [
  { id: 'privacy', label: 'Privacy' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'terms', label: 'Terms of use' },
  { id: 'content', label: 'Content & research' },
];

export default function LegalPage() {
  return (
    <>
      <Navbar />
      <main>
        <header className="section-shell bg-hero-vignette pb-12 pt-32 md:pb-16 md:pt-40">
          <div className="container-prose">
            <p className="mono-label mb-5 flex items-center gap-3 text-aqua">
              <span className="h-px w-8 bg-aqua/70" />
              GOSSAMER POLICIES
            </p>
            <h1 className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-warm-white sm:text-5xl md:text-6xl">
              Legal information,
              <span className="text-aqua"> in one place.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-slate md:text-lg text-pretty">
              How this website handles information, cookies, and the material
              shared about Gossamer.
            </p>
            <nav
              aria-label="Legal page sections"
              className="mt-8 flex flex-wrap gap-2"
            >
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="rounded-full border border-fine-border bg-midnight/50 px-4 py-2 text-sm text-muted-slate transition-colors hover:border-aqua/40 hover:text-aqua"
                >
                  {section.label}
                </a>
              ))}
            </nav>
          </div>
        </header>

        <div className="section-shell bg-section-deep py-10 md:py-14">
          <div className="container-prose">
            <div className="mx-auto max-w-4xl space-y-5">
              <LegalSection id="privacy" title="Privacy notice">
                <p>
                  Gossamer does not provide an account system or a contact
                  form on this website. If you choose to email us, your email
                  application sends the message and related information to
                  <a
                    href="mailto:gossamer.hq@gmail.com"
                    className="mx-1 text-aqua underline decoration-aqua/40 underline-offset-4"
                  >
                    gossamer.hq@gmail.com
                  </a>
                  . We use the information you choose to include to respond to
                  your inquiry and manage the conversation.
                </p>
                <p>
                  The hosting provider may process technical information such
                  as request time, browser details, and network identifiers to
                  deliver, secure, and troubleshoot the website. The precise
                  information and retention period depend on the hosting
                  provider and its applicable policies.
                </p>
                <p>
                  We do not intentionally sell personal information collected
                  through this site. We do not include advertising or analytics
                  trackers in the current website. External links open
                  services with their own privacy practices.
                </p>
                <p>
                  To ask about, correct, or request deletion of information
                  you have sent us, email the address below. We may retain
                  information where needed to respond, meet legal obligations,
                  or protect the project.
                </p>
              </LegalSection>

              <LegalSection id="cookies" title="Cookies and similar technologies">
                <p>
                  The current Gossamer website does not set advertising or
                  analytics cookies, and does not require cookies for an
                  account or sign-in. The hosting platform or browser may use
                  essential technical storage to deliver or protect the site.
                  Those services are governed by their own policies.
                </p>
                <p>
                  You can manage or clear cookies and site storage through your
                  browser settings. If future features introduce optional
                  cookies or analytics, this page should be updated to explain
                  them and any choices available to visitors.
                </p>
              </LegalSection>

              <LegalSection id="terms" title="Terms of use">
                <p>
                  You may browse this website for personal, educational, and
                  informational purposes. Do not interfere with its operation,
                  attempt unauthorized access, or use its content in a way
                  that violates applicable law or another person&apos;s rights.
                </p>
                <p>
                  Website content is provided for general information. It is
                  not engineering, water-quality, health, safety, regulatory,
                  or other professional advice. Do not use it as a substitute
                  for site-specific assessment by qualified professionals.
                </p>
                <p>
                  The website is provided without a guarantee that it will
                  always be available, error-free, or current. To the extent
                  allowed by applicable law, Gossamer is not responsible for
                  losses arising solely from reliance on general website
                  information. Nothing here limits rights that cannot legally
                  be limited.
                </p>
                <p>
                  These terms may be updated as the website changes. Continued
                  use after an update means you accept the revised terms to
                  the extent permitted by law.
                </p>
              </LegalSection>

              <LegalSection id="content" title="Content, research, and project information">
                <p>
                  Gossamer describes a web-like approach intended to intercept
                  liquid droplets carried out of cooling-tower exhaust and
                  route collected water toward testing and suitable reuse.
                  Water quality must be assessed and treated when required
                  before reuse is considered.
                </p>
                <p>
                  Research figures cited on this website refer to the
                  conditions and technology described in their original
                  publications. In particular, the published membrane
                  condenser results are not performance results for
                  Gossamer&apos;s droplet-interception system. See{' '}
                  <a
                    href="https://doi.org/10.4491/eer.2018.192"
                    target="_blank"
                    rel="noreferrer"
                    className="text-aqua underline decoration-aqua/40 underline-offset-4"
                  >
                    Macedonio et al. (2019)
                  </a>{' '}
                  for the separately tested membrane-condenser study.
                </p>
                <p>
                  Project descriptions explain design intent and potential
                  applications; they are not a guarantee of operating
                  performance, collection rates, savings, or suitability at a
                  particular site. Any use of collected water requires
                  appropriate testing and operational review.
                </p>
                <p>
                  Gossamer names, original text, and original visual materials
                  are presented as project materials. Third-party names,
                  research, and linked content remain the property of their
                  respective owners. For questions about permission or
                  attribution, contact us.
                </p>
              </LegalSection>

              <section className="rounded-2xl border border-aqua/25 bg-surface-teal/35 p-6 sm:p-8">
                <p className="mono-label text-aqua">Questions about these policies?</p>
                <h2 className="mt-3 font-display text-2xl font-medium text-warm-white">
                  Contact the Gossamer team.
                </h2>
                <Link
                  href="mailto:gossamer.hq@gmail.com"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-aqua transition-colors hover:text-warm-white"
                >
                  gossamer.hq@gmail.com
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
                <p className="mt-5 border-t border-fine-border pt-4 text-xs leading-relaxed text-muted-slate">
                  This page is general website information and should be
                  reviewed for the laws and requirements that apply to the
                  project before being relied on as a formal legal agreement.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function LegalSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 rounded-2xl border border-fine-border bg-deep-teal/55 p-6 sm:p-8"
    >
      <h2 className="font-display text-2xl font-medium text-warm-white">
        {title}
      </h2>
      <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-slate text-pretty">
        {children}
      </div>
    </section>
  );
}
