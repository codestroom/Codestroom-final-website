// Rules for the "Build my growth plan" tool on /services.
// Timelines are typical ranges, confirmed on the free call.
// Set `fromPrice` on a service (e.g. '₹15,000') to show a starting price;
// leave it null to show "exact quote" instead.

export const BUSINESS_TYPES = [
  { id: 'local', label: 'Local shop / service', emoji: '🏪', local: true },
  { id: 'food', label: 'Restaurant & café', emoji: '🍽️', local: true },
  { id: 'clinic', label: 'Clinic & healthcare', emoji: '🩺', local: true },
  { id: 'creator', label: 'Coach / creator', emoji: '🎤' },
  { id: 'ecom', label: 'Product brand', emoji: '🛍️' },
  { id: 'startup', label: 'Startup / SaaS', emoji: '🚀' },
  { id: 'b2b', label: 'Company / factory', emoji: '🏭' },
  { id: 'realestate', label: 'Real estate', emoji: '🏠', local: true },
  { id: 'education', label: 'Education', emoji: '🎓', local: true }
];

export const GOALS = [
  { id: 'leads', label: 'More leads & customers', emoji: '📈' },
  { id: 'brand', label: 'Build my personal brand', emoji: '⭐' },
  { id: 'sell', label: 'Sell online', emoji: '🛒' },
  { id: 'website', label: 'A new website', emoji: '🖥️' },
  { id: 'app', label: 'A mobile app', emoji: '📱' },
  { id: 'automate', label: 'Automate my work', emoji: '🤖' },
  { id: 'social', label: 'Grow on social media', emoji: '💬' },
  { id: 'google', label: 'Rank on Google', emoji: '🔎' }
];

export const STAGES = [
  { id: 'zero', label: 'Starting from zero', hint: 'No website or social pages yet' },
  { id: 'some', label: 'I have the basics', hint: 'Website or socials exist, growth is slow' },
  { id: 'scale', label: 'Ready to scale', hint: 'Things work — I want more, faster' }
];

// phase: build | launch | grow   · weeks: [min, max] for build items
export const PLAN_SERVICES = {
  static: { name: 'Static Website', icon: 'file', phase: 'build', weeks: [1, 2], fromPrice: null },
  dynamic: { name: 'Dynamic Website', icon: 'layers', phase: 'build', weeks: [3, 6], fromPrice: null },
  ecommerce: { name: 'E-commerce Website', icon: 'cart', phase: 'build', weeks: [3, 6], fromPrice: null },
  shopify: { name: 'Shopify Store', icon: 'bag', phase: 'build', weeks: [2, 4], fromPrice: null },
  app: { name: 'Mobile App (iOS & Android)', icon: 'phone', phase: 'build', weeks: [8, 16], fromPrice: null },
  software: { name: 'Custom Software', icon: 'code', phase: 'build', weeks: [6, 14], fromPrice: null },
  ai: { name: 'AI Automation', icon: 'bot', phase: 'build', weeks: [2, 6], fromPrice: null },
  crm: { name: 'CRM', icon: 'users', phase: 'build', weeks: [4, 8], fromPrice: null },
  erp: { name: 'ERP', icon: 'grid', phase: 'build', weeks: [8, 16], fromPrice: null },
  setup: { name: 'Platform Setup', icon: 'flag', phase: 'launch', fromPrice: null },
  seo: { name: 'SEO', icon: 'search', phase: 'launch', fromPrice: null },
  localseo: { name: 'Google Maps & Local SEO', icon: 'search', phase: 'launch', fromPrice: null },
  branding: { name: 'Personal Branding', icon: 'user', phase: 'grow', fromPrice: null },
  content: { name: 'Content & Creatives', icon: 'pen', phase: 'grow', fromPrice: null },
  leads: { name: 'Lead Generation', icon: 'magnet', phase: 'grow', fromPrice: null },
  ads: { name: 'Paid Ads (Google & Meta)', icon: 'megaphone', phase: 'grow', fromPrice: null },
  funnel: { name: 'Sales Funnels', icon: 'sales', phase: 'grow', fromPrice: null },
  growth: { name: 'Business Growth Strategy', icon: 'growth', phase: 'grow', fromPrice: null },
  youtube: { name: 'YouTube', icon: 'youtube', phase: 'grow', fromPrice: null },
  instagram: { name: 'Instagram', icon: 'instagram', phase: 'grow', fromPrice: null },
  facebook: { name: 'Facebook', icon: 'facebook', phase: 'grow', fromPrice: null },
  tiktok: { name: 'TikTok', icon: 'tiktok', phase: 'grow', fromPrice: null }
};

// Social channels that usually work best for each business type.
const CHANNELS = {
  local: ['instagram', 'facebook'],
  food: ['instagram', 'facebook'],
  clinic: ['instagram', 'facebook'],
  creator: ['instagram', 'youtube', 'tiktok'],
  ecom: ['instagram', 'facebook', 'tiktok'],
  startup: ['youtube', 'instagram'],
  b2b: ['youtube', 'facebook'],
  realestate: ['instagram', 'youtube', 'facebook'],
  education: ['instagram', 'youtube', 'facebook']
};

export function buildPlan({ type, goals, stage }) {
  const t = BUSINESS_TYPES.find((b) => b.id === type);
  const picked = new Set();
  const add = (...ids) => ids.forEach((id) => picked.add(id));
  const channels = CHANNELS[type] || ['instagram', 'facebook'];
  const wantsSite = goals.includes('website') || stage === 'zero';

  if (goals.includes('sell')) add(type === 'ecom' || type === 'creator' ? 'shopify' : 'ecommerce', 'ads');
  else if (wantsSite) add(stage === 'scale' || type === 'startup' || type === 'education' ? 'dynamic' : 'static');

  if (goals.includes('app')) add('app');
  if (goals.includes('automate')) {
    add('ai', 'crm');
    if (['b2b', 'ecom', 'local'].includes(type)) add('erp');
    if (type === 'startup') add('software');
  }
  if (goals.includes('leads')) add('leads', 'ads', 'funnel');
  if (goals.includes('brand')) add('branding', 'content', channels[0]);
  if (goals.includes('social')) add('content', ...channels.slice(0, 2));
  if (goals.includes('google')) add('seo');
  if (t?.local && (goals.includes('google') || goals.includes('leads'))) add('localseo');
  if (stage === 'zero') add('setup');
  if (stage === 'scale') add('growth');
  if (picked.size === 0) add('growth', 'seo', channels[0]);

  const items = [...picked].map((id) => ({ id, ...PLAN_SERVICES[id] }));
  const phases = ['build', 'launch', 'grow']
    .map((p) => ({ id: p, items: items.filter((i) => i.phase === p) }))
    .filter((p) => p.items.length);

  const buildItems = items.filter((i) => i.weeks);
  const buildWeeks = buildItems.length
    ? [Math.max(...buildItems.map((i) => i.weeks[0])), Math.max(...buildItems.map((i) => i.weeks[1]))]
    : null;

  const hasMarketing = items.some((i) => i.phase === 'grow' || i.phase === 'launch');
  const prices = items.map((i) => i.fromPrice).filter(Boolean);

  return { type: t, phases, items, buildWeeks, hasMarketing, prices };
}
