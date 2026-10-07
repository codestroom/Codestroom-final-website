// Capability showcase for the Portfolio page.
//
// Describes what we're equipped to build per category — approach, deliverables,
// stack. Real client results live in caseStudies.js; don't invent metrics here.

export const PORTFOLIO_CATEGORIES = [
  { id: 'all', label: 'Everything' },
  { id: 'ai', label: 'AI & Automation' },
  { id: 'web', label: 'Web & SaaS' },
  { id: 'mobile', label: 'Mobile Apps' },
  { id: 'commerce', label: 'E-Commerce' },
  { id: 'marketing', label: 'Marketing' },
];

export const CAPABILITIES = [
  {
    slug: 'ai-agents-automation',
    category: 'ai',
    title: 'AI agents & automation',
    mark: 'AI',
    tint: 'grad-1',
    summary:
      'Custom AI agents and retrieval-augmented pipelines that plug into your own data — support desks, intake flows, document processing — grounded in your knowledge base instead of generic chatbot answers.',
    deliverables: [
      'Retrieval-augmented generation on your own documents',
      'Multi-step agent workflows with human-in-the-loop review',
      'Private or VPC deployment where data residency matters',
    ],
    stack: ['LangGraph', 'FastAPI', 'Postgres', 'pgvector', 'OpenAI / Claude'],
  },
  {
    slug: 'web-saas',
    category: 'web',
    title: 'Web apps & SaaS platforms',
    mark: 'WS',
    tint: 'grad-2',
    summary:
      'Multi-tenant portals, dashboards and marketing sites on modern, maintainable stacks — built to handle real usage from day one, not just look good in a demo.',
    deliverables: [
      'Multi-tenant architecture and authentication',
      'Realtime data (WebSockets/SSE) where it actually matters',
      'Fast, accessible marketing and product sites',
    ],
    stack: ['Next.js', 'React', 'Node', 'Postgres', 'Redis'],
  },
  {
    slug: 'mobile-apps',
    category: 'mobile',
    title: 'Mobile apps',
    mark: 'MB',
    tint: 'grad-3',
    summary:
      'Cross-platform and native apps with offline-first sync, so field teams and end users keep working without signal — everything reconciles automatically once they are back online.',
    deliverables: [
      'Offline-first data sync engines',
      'Push notifications and deep linking',
      'App Store and Play Store publishing',
    ],
    stack: ['Flutter', 'React Native', 'Firebase', 'SQLite'],
  },
  {
    slug: 'ecommerce',
    category: 'commerce',
    title: 'E-commerce builds',
    mark: 'EC',
    tint: 'grad-1',
    summary:
      'Storefronts and checkout flows engineered for speed and conversion — from headless replatforms to structured CRO programmes, on whichever platform actually fits your catalogue.',
    deliverables: [
      'Headless or standard Shopify / WooCommerce builds',
      'Checkout and conversion-rate optimisation',
      'Multi-currency, multi-tax support',
    ],
    stack: ['Shopify Hydrogen', 'WooCommerce', 'Stripe', 'Klaviyo'],
  },
  {
    slug: 'marketing-growth',
    category: 'marketing',
    title: 'Marketing & growth',
    mark: 'MK',
    tint: 'grad-2',
    summary:
      'Local SEO, paid social and content programmes measured on the outcome you actually care about — bookings, calls, footfall — not vanity impressions.',
    deliverables: [
      'Local SEO and Google Business optimisation',
      'Paid social and search campaigns',
      'Content calendars and creative production',
    ],
    stack: ['Google Business', 'Meta Ads', 'Google Ads', 'GA4'],
  },
];
