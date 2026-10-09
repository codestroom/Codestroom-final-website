// Live websites Codestroom built, shown on /portfolio (Development).
// Screenshots in public/assets/work/sites/ were captured from the live sites (Oct 2026):
// <slug>-desktop.webp is a stitched scroll of the top of the homepage, <slug>-mobile.webp
// the first phone screen. Features are things visible on each site — keep them that way.
// `caseSlug` links a site to its Instagram case study in caseStudies.js.

export const LIVE_SITES = [
  {
    slug: 'ancientmovers',
    name: 'Ancient Movers',
    url: 'https://ancientmovers.com/',
    domain: 'ancientmovers.com',
    category: 'Moving company',
    location: 'Detroit, Michigan · USA',
    accent: '#f28c28',
    summary: 'A lead-generation site for a Detroit moving company — built to turn visitors into quote requests.',
    features: ['60-second quote form', 'Click-to-call everywhere', 'Service & area pages'],
  },
  {
    slug: 'pannuvaid',
    name: 'Pannu Vaid',
    url: 'https://pannuvaid.com/',
    domain: 'pannuvaid.com',
    category: 'Ayurvedic clinic',
    location: 'Samrala, Punjab · India',
    accent: '#3f8f2f',
    summary: 'A clinic website for an Ayurvedic practice — treatments, herbal remedies and consultations in one place.',
    features: ['Treatments & remedies catalogue', 'WhatsApp & call booking', 'Light & dark mode'],
    caseSlug: 'pannu-vaid',
  },
  {
    slug: 'sirjanavillage',
    name: 'Sirjana Pind',
    url: 'https://sirjanavillage.com/',
    domain: 'sirjanavillage.com',
    category: 'Community village project',
    location: 'Hoshiarpur, Punjab · India',
    accent: '#c98a16',
    summary: 'A story-led site for a 25-acre village built by 100 families — vision, facilities and membership.',
    features: ['English, Hindi & Punjabi', '35-facility explorer', 'Membership applications'],
  },
  {
    slug: 'blushbeautystudioz',
    name: 'Blush Beauty Studio',
    url: 'https://blushbeautystudioz.com/',
    domain: 'blushbeautystudioz.com',
    category: 'Beauty studio',
    location: 'USA',
    accent: '#d9827f',
    summary: 'An elegant studio site for lashes, brows, permanent make-up and facials — with booking built in.',
    features: ['Online booking form', 'Services gallery', 'Click-to-call'],
  },
  {
    slug: 'sanjhaghar',
    name: 'Sanjha Ghar',
    url: 'https://sanjhaghar.com/',
    domain: 'sanjhaghar.com',
    category: 'Restaurant, farm shop & stay',
    location: 'Samrala, Punjab · India',
    accent: '#7a1f1f',
    summary: 'A warm, bilingual site for a pure-veg Punjabi restaurant with rooms, a rooftop, a pool and a farm shop.',
    features: ['Menu with tabs', 'Table booking', 'Rooms, events & farm shop'],
    caseSlug: 'sanjha-ghar',
  },
];

export const siteShot = (slug, kind) => `/assets/work/sites/${slug}-${kind}.webp`;
