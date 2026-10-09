// Home page "Ask us anything" chat. Answers must stay consistent with promises made
// elsewhere on the site (48h reply, timelines from planBuilder.js, real clients).
// `link` (optional) adds a button under the answer. Also used for the FAQPage schema.

export const HOME_FAQ = [
  {
    q: 'How much does it cost?',
    a: 'It depends on what you need — a simple website and a full app are very different jobs. What we promise: you get a clear, fixed price before any work starts, and no surprise invoices later. The first call is free.',
    link: { to: '/contact', label: 'Get my free quote' },
  },
  {
    q: 'How long does a website take?',
    a: 'A simple website usually takes 1–2 weeks. Bigger sites and online stores take around 3–6 weeks, and mobile apps 8–16 weeks. You get a live preview link, so you can watch it come together.',
  },
  {
    q: 'When will I see results from marketing?',
    a: 'Your content can be live in the first week. Real growth builds over 3–6 months — for example, Sukhdarshan Muni Ji’s Instagram went from 2,958 to 9,430 followers in 6 months with us.',
    link: { to: '/portfolio#sukhdarshan-muni-ji', label: 'See that case study' },
  },
  {
    q: 'Do you do both the website and the marketing?',
    a: 'Yes — that’s the whole point. One team builds your website and grows your social media, so nothing falls between two agencies. Sanjha Ghar and Pannu Vaid both have their website and Instagram with us.',
  },
  {
    q: 'Who owns the website and accounts?',
    a: 'You do, completely. Your domain, website, social media accounts and ad accounts are all in your name. If you ever leave, everything goes with you.',
  },
  {
    q: 'Do you work with businesses outside India?',
    a: 'Yes. We work with clients in India, Canada, the USA and Europe — Ancient Movers in Detroit is one of our live websites. We plan calls around your time zone.',
  },
  {
    q: 'What happens after my website goes live?',
    a: 'We don’t disappear. We stay on to fix anything, keep it updated and help it grow — whether that’s new pages, SEO or marketing.',
  },
  {
    q: 'How do we get started?',
    a: 'Send us a message or book a free call. Tell us what you need, and you’ll get a real reply from a real person within 48 hours — with a plan and a price.',
    link: { to: '/contact', label: 'Start the conversation' },
  },
];

export const homeFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: HOME_FAQ.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};
