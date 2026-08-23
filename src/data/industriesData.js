export const INDUSTRIES_DATA = {
  restaurants: {
    slug: 'restaurants',
    name: 'Restaurants',
    title: 'Digital Marketing for Restaurants',
    description:
      'Local SEO, Google Business optimization, social content and delivery funnels built to fill more tables for restaurants across India, USA, Canada & Europe.',
    kicker: 'For restaurants',
    h1: 'Get found by hungry people nearby.',
    lead:
      "Most restaurant marketing is a nice logo and a hope. We build the unglamorous stuff that actually works — local search, real content, and ordering funnels that turn a Google search into a booked table.",
    challenges: [
      {
        title: "You're invisible on Google Maps",
        desc: 'A weak Google Business Profile means the restaurant three doors down shows up first — even if your food is better.'
      },
      {
        title: 'Delivery apps eat your margin',
        desc: 'Relying only on Swiggy, Zomato or UberEats hands a cut of every order to a platform instead of your own site.'
      },
      {
        title: 'Social posts with no plan',
        desc: 'Random reels and photo dumps rarely convert into reservations — they need a content plan tied to what actually drives bookings.'
      }
    ],
    whatWeDo: [
      { serviceSlug: 'digital-marketing', label: 'Local SEO & Google Business Profile optimization' },
      { serviceSlug: 'digital-marketing', label: 'Social content and local ad campaigns' },
      { serviceSlug: 'web-development', label: 'A fast, mobile-first website that ranks and converts' },
      { serviceSlug: 'ecommerce', label: 'Online ordering and reservation funnels you actually own' }
    ],
    faqs: [
      {
        q: 'Do you only work with large restaurant chains?',
        a: 'No — most of the restaurants we work with are single-location, independently owned. That is usually where local SEO makes the biggest difference.'
      },
      {
        q: 'Can you help us reduce reliance on delivery apps?',
        a: "We can build and market a direct ordering funnel on your own site, so a share of orders stop costing you a delivery app's commission."
      }
    ]
  },
  'religious-organizations': {
    slug: 'religious-organizations',
    name: 'Religious Organizations',
    title: 'Websites for Religious Organizations',
    description:
      'Websites, donation systems and outreach for temples, churches and gurudwaras — built with respect for tradition and modern usability.',
    kicker: 'For religious organizations',
    h1: 'A digital home for your community.',
    lead:
      "Your congregation already trusts you in person. We help that trust carry over online — with a website, donation flow and outreach presence that feels respectful, not like a template dropped in from a marketplace.",
    challenges: [
      {
        title: 'No easy way to give online',
        desc: 'Donation collection still runs through cash, cheques or a clunky third-party form that discourages first-time givers.'
      },
      {
        title: 'Event and service timings are hard to find',
        desc: 'Visitors and members often cannot find service times, event schedules or livestream links without calling someone.'
      },
      {
        title: 'No presence for people searching nearby',
        desc: 'People new to an area searching for a place of worship rarely find organizations without a real online presence.'
      }
    ],
    whatWeDo: [
      { serviceSlug: 'web-development', label: 'A clear, respectful website with service times, events and livestreams' },
      { serviceSlug: 'ecommerce', label: 'Simple, secure online donation and receipt systems' },
      { serviceSlug: 'digital-marketing', label: 'Local visibility so new members can actually find you' }
    ],
    faqs: [
      {
        q: 'Do you work with organizations of any size?',
        a: 'Yes — from a single local temple, church or gurudwara to organizations with multiple branches or locations.'
      },
      {
        q: 'Can the website support multiple languages?',
        a: 'Yes, multi-language support is something we plan for from the start when it is relevant to your community.'
      }
    ]
  }
};

export const ALL_INDUSTRIES = Object.values(INDUSTRIES_DATA);
