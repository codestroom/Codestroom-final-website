import { useEffect } from 'react';

const BASE_URL = 'https://codestroom.com';
const DEFAULT_IMAGE = 'https://codestroom.com/assets/logo.png';
const SITE_NAME = 'Codestroom';

export default function SEOHead({
  title,
  description,
  canonicalPath = '',
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  schemas = [],
  noindex = false
}) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const normalizedPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
  const canonicalUrl = normalizedPath === '/' ? `${BASE_URL}/` : `${BASE_URL}${normalizedPath.replace(/\/+$/, '')}` || BASE_URL;

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

    // Helper to update or create meta tags
    const setMetaTag = (attrName, attrVal, content) => {
      if (!content) return;
      let tag = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attrName, attrVal);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // 2. Set Standard Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag(
      'name',
      'robots',
      noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    );

    // 3. Set Canonical Link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // 4. OpenGraph Tags
    setMetaTag('property', 'og:site_name', SITE_NAME);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', ogImage);

    // 5. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // 6. JSON-LD Structured Data Schema
    const baseOrgSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': 'https://codestroom.com/#organization',
      name: 'Codestroom',
      url: 'https://codestroom.com',
      logo: 'https://codestroom.com/assets/logo.png',
      description: 'International AI, IT Services, Web & Mobile App Development, and Performance Marketing Company.',
      email: 'contact@codestroom.com',
      telephone: '+919464529126',
      sameAs: [
        'https://www.instagram.com/codestroom/',
        'https://www.facebook.com/profile.php?id=61573358163342'
      ],
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'IN'
      }
    };

    const allSchemas = [baseOrgSchema, ...(Array.isArray(schemas) ? schemas : [schemas])].filter(Boolean);

    let scriptTag = document.getElementById('structured-data-seo');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'structured-data-seo';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(allSchemas.length === 1 ? allSchemas[0] : allSchemas);

    return () => {
      // Optional cleanup on unmount
    };
  }, [fullTitle, description, canonicalUrl, ogType, ogImage, schemas, noindex]);

  return null;
}
