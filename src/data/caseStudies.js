// Real client results (Instagram), taken from the clients' own profiles.
// Every account lists "Managed by @codestroom" in its bio, so visitors can verify.
// `after` = end of the reported period; `now` = live count checked on Instagram (Oct 2026).
// Profile cards show `now` when present. Instagram rounds large counts (21K).
// `proofNote` explains how the original post relates to today's numbers.

export const CASE_STUDIES = [
  {
    slug: 'sukhdarshan-muni-ji',
    name: 'Sukhdarshan Muni Ji',
    handle: 'sukhdarshanmuniji',
    category: 'Spiritual leader · Jain community',
    bio: 'Teaching love, kindness & Jain values',
    avatar: '/assets/work/ig-sukhdarshan-muni-ji.webp',
    proof: '/assets/work/sukhdarshan-muni-ji.webp',
    period: '6 months',
    proofNote: 'Our 6-month growth report (under the old handle @sukhdarshan.muni.ji).',
    before: { followers: 2958, posts: 355, following: 325 },
    after: { followers: 9430, posts: 476, following: 15 },
    now: { followers: 11000, posts: 677, following: 147 },
    headline: 'From 2,958 to 9,430 followers in 6 months — now 11K.',
    work: ['Account management', 'Content strategy', 'Profile clean-up']
  },
  {
    slug: 'pannu-vaid',
    name: 'Pannu Vaid',
    handle: 'pannu__vaid',
    category: 'Ayurvedic clinic · Samrala, Punjab',
    bio: 'Health & beauty · Dukh Door Dawakhana',
    avatar: '/assets/work/ig-pannu-vaid.webp',
    proof: '/assets/work/pannu-vaid.webp',
    period: 'Live count · Oct 2026',
    milestone: { followers: 20600, label: 'Hit 20K in under a year' },
    after: { followers: 21000, posts: 322, following: 10 },
    headline: 'Hit 20K in under a year — now 21K and growing.',
    proofNote: 'Posted when the account hit 20K (under its old handle @pannu_vaid_new).',
    work: ['Account management', 'Content & reels', 'Local audience growth']
  },
  {
    slug: 'sanjha-ghar',
    name: 'Sanjha Ghar',
    handle: 'sanjhaghar',
    category: 'Punjabi blog & community',
    bio: 'Personal blog · sanjhaghar.com',
    avatar: '/assets/work/ig-sanjha-ghar.webp',
    proof: '/assets/work/sanjha-ghar.webp',
    period: 'Live count · Oct 2026',
    milestone: { followers: 12300, label: 'Hit 12K in under a year' },
    after: { followers: 26000, posts: 689, following: 16 },
    headline: 'Hit 12K in under a year — now 26K.',
    proofNote: 'Posted when the account hit 12.3K. It has more than doubled since.',
    work: ['Account management', 'Content & reels', 'Community growth']
  }
];

export const instagramUrl = (handle) => `https://www.instagram.com/${handle}/`;

export const TOTAL_FOLLOWERS = CASE_STUDIES.reduce((sum, c) => sum + (c.now || c.after).followers, 0);
