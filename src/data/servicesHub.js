// Content for the /services hub page (two paths: Grow & Build).

export const GROW_CORE = [
  { icon: 'user', name: 'Personal Branding', line: 'Become the name people trust in your field.' },
  { icon: 'growth', name: 'Business Growth', line: 'A clear plan to reach more of the right customers.' },
  { icon: 'sales', name: 'Sales Funnels', line: 'Turn visitors into buyers, step by step.' },
  { icon: 'magnet', name: 'Lead Generation', line: 'A steady flow of qualified enquiries.' }
];

export const GROW_OUTER = [
  { icon: 'search', name: 'SEO', line: 'Rank on Google when customers search for you.' },
  { icon: 'youtube', name: 'YouTube', line: 'Channel growth, videos and ads.', platform: 'yt' },
  { icon: 'flag', name: 'Platform Setup', line: 'Your brand set up properly on every channel.' },
  { icon: 'instagram', name: 'Instagram', line: 'Reels, stories and an engaged following.', platform: 'ig' },
  { icon: 'megaphone', name: 'Paid Ads', line: 'Google & Meta campaigns built for return.' },
  { icon: 'facebook', name: 'Facebook', line: 'Community, pages and targeted ads.', platform: 'fb' },
  { icon: 'pen', name: 'Content & Creatives', line: 'Posts, reels and ads people stop to watch.', to: '/services/creative-design' },
  { icon: 'tiktok', name: 'TikTok', line: 'Short-form content that travels.', platform: 'tt' }
];

export const GROW_ALL = [...GROW_CORE, ...GROW_OUTER];

export const BUILD = [
  { icon: 'file', name: 'Static Website', line: 'Fast, clean sites for brands and portfolios.', preview: 'static', to: '/services/web-development' },
  { icon: 'layers', name: 'Dynamic Website', line: 'Sites you update yourself, with logins and data.', preview: 'dynamic', to: '/services/web-development' },
  { icon: 'cart', name: 'E-commerce Website', line: 'Online stores that sell around the clock.', preview: 'shop', to: '/services/ecommerce' },
  { icon: 'bag', name: 'Shopify Store', line: 'Custom Shopify themes, apps and setup.', preview: 'shopify', to: '/services/ecommerce' },
  { icon: 'phone', name: 'Mobile Apps', line: 'iOS & Android apps, from idea to store launch.', preview: 'app', to: '/services/mobile-apps' },
  { icon: 'code', name: 'Custom Software', line: 'Tools built around how your team works.', preview: 'software', to: '/services/custom-software' },
  { icon: 'bot', name: 'AI Automation', line: 'Chatbots and agents that handle repetitive work.', preview: 'ai', to: '/services/ai-solutions' },
  { icon: 'grid', name: 'ERP', line: 'Inventory, accounts and operations in one place.', preview: 'erp', to: '/services/custom-software' },
  { icon: 'users', name: 'CRM', line: 'Track every lead, deal and customer.', preview: 'crm', to: '/services/custom-software' },
  { icon: 'server', name: 'APIs & Cloud', line: 'Secure backends that scale with you.', preview: 'api', to: '/services/backend-development' }
];

export const GROW_TOASTS = [
  { icon: 'magnet', text: 'New lead from Instagram' },
  { icon: 'sales', text: 'Order received' },
  { icon: 'search', text: 'Ranked on page 1' },
  { icon: 'youtube', text: 'New subscriber' }
];

export const BUILD_TOASTS = [
  { icon: 'check', text: 'Website deployed' },
  { icon: 'phone', text: 'App published' },
  { icon: 'cart', text: 'Store is live' },
  { icon: 'bot', text: 'Automation running' }
];

export const PROMISES = [
  { icon: 'shield', title: 'Clear scope & pricing', text: 'You know the cost and timeline before we start.' },
  { icon: 'chart', title: 'Honest reporting', text: 'Regular updates with real numbers, not jargon.' },
  { icon: 'users', title: 'One dedicated team', text: 'Marketers and engineers working together for you.' },
  { icon: 'clock', title: 'Support after launch', text: 'We stay with you to fix, improve and grow.' }
];

export const STEPS = ['Free consultation', 'Plan & quote', 'Build & launch', 'Grow together'];

// Real client redesigns for the before/after slider on /services.
// Put screenshots in public/assets/redesigns/ (same size, ~1400×860 works well), e.g.
// { name: 'Client name', url: 'clientsite.com', before: '/assets/redesigns/x-before.webp',
//   after: '/assets/redesigns/x-after.webp', result: 'Load time 6.1s → 1.3s · enquiries doubled' }
// While empty, the before/after section is hidden.
export const REDESIGNS = [];
