export const siteConfig = {
  name: 'Gossamer',
  tagline: 'What if a web could catch the water we lose?',
  description:
    'A spider-web-like collector designed to intercept liquid water droplets escaping from industrial cooling towers and route collected water toward assessment and suitable reuse.',
  location: 'Dhaka, Bangladesh',
  contactEmail: 'gossamer.hq@gmail.com',
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/gossamerhq' },
    { label: 'YouTube', href: 'https://www.youtube.com/@Gossamer-hq' },
    { label: 'X', href: 'https://x.com/gossamer_hq' },
  ],
  nav: [
    { label: 'Home', href: '/', id: 'home' },
    { label: 'Features', href: '/#features', id: 'features' },
    { label: 'How it works', href: '/how-it-works', id: 'how-it-works' },
    { label: 'Full system', href: '/#system', id: 'system' },
    { label: 'Impact', href: '/#impact', id: 'impact' },
    { label: 'About', href: '/about', id: 'about' },
    { label: 'Contact', href: '/contact', id: 'contact' },
  ],
  stages: [
    { key: 'capture', label: 'Capture', word: 'Intercept' },
    { key: 'collect', label: 'Collect', word: 'Gather' },
    { key: 'check', label: 'Check', word: 'Assess' },
    { key: 'reuse', label: 'Reuse', word: 'Return' },
  ] as const,
  disclaimer:
    'Designed to intercept liquid drift and route collected water toward assessment and suitable reuse.',
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
export type StageKey = (typeof siteConfig.stages)[number]['key'];
