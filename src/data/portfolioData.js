// Capability showcase for the Portfolio page.
//
// Describes what we're equipped to build per category — approach, deliverables,
// stack. Development items also carry plain-language fields for the portfolio
// bento (outcome, forWho, benefits, weeks, service = contact-form preset, demo).
// Real client results live in caseStudies.js; don't invent metrics here.

// The portfolio page is split into these two segments; every capability
// belongs to exactly one of them.
export const PORTFOLIO_SEGMENTS = [
  {
    id: 'development',
    label: 'Development',
    icon: '</>',
    tagline: 'Websites, apps, AI & software',
  },
  {
    id: 'digital',
    label: 'Digital',
    icon: '📈',
    tagline: 'Social, SEO, ads & content',
  },
];

export const CAPABILITIES = [
  {
    slug: 'ai-agents-automation',
    category: 'ai',
    segment: 'development',
    snippet: "agent.answer(question, { sources: 'your docs' })",
    demo: 'ai',
    outcome: 'A 24/7 assistant that knows your business.',
    forWho: 'Clinics, schools, support teams, busy front desks',
    benefits: [
      'Answers customers instantly — from your own FAQs and documents',
      'Books, forwards or escalates to a human when it should',
      'Your data stays private, never used to train public AI',
    ],
    weeks: '2–6 weeks',
    service: 'ai-services',
    chipsLabel: 'It can handle',
    chips: ['Opening hours', 'Fees & prices', 'Appointments', 'Order status', 'Admissions'],
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
    segment: 'development',
    snippet: "app.tenant('your-brand').deploy()",
    demo: 'web',
    outcome: 'Portals and dashboards your team will actually use.',
    forWho: 'Growing businesses, agencies, startups',
    benefits: [
      'Customer & staff logins, roles and admin panels',
      'Live numbers on one screen instead of ten spreadsheets',
      'Fast, secure and built to grow with you',
    ],
    weeks: '6–14 weeks',
    service: 'custom-software',
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
    segment: 'development',
    snippet: 'sync.whenOnline(offlineQueue)',
    demo: 'mobile',
    outcome: 'Apps that keep working — even with no signal.',
    forWho: 'Field teams, delivery, schools, service businesses',
    benefits: [
      'One app for iPhone and Android',
      'Works offline, syncs automatically when back online',
      'We publish it on the App Store and Play Store for you',
    ],
    weeks: '8–16 weeks',
    service: 'mobile-app',
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
    segment: 'development',
    snippet: 'checkout.create({ currency: visitor.locale })',
    demo: 'shop',
    outcome: 'Online stores built to sell — in any currency.',
    forWho: 'Product brands, retailers, D2C sellers',
    benefits: [
      'Shopify or WooCommerce, set up around your catalogue',
      'Quick, simple checkout that turns visitors into buyers',
      'Sell abroad with local currencies and taxes',
    ],
    weeks: '3–6 weeks',
    service: 'e-commerce',
    chipsLabel: 'Take payments with',
    chips: ['UPI & Razorpay', 'Stripe', 'PayPal', 'Cash on delivery'],
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
    segment: 'digital',
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
