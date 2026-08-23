import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import CTA from '../components/CTA';
import SEOHead from '../components/SEOHead';
import { BLOG_CATEGORIES, BLOG_POSTS, formatBlogDate } from '../data/blogData';

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'The Codestroom Blog',
  description: 'Notes on AI engineering, performance marketing, design systems and running a software business.',
  url: 'https://codestroom.com/blog',
  blogPost: BLOG_POSTS.map((post) => ({
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.date,
    description: post.excerpt,
    url: `https://codestroom.com/blog/${post.slug}`
  }))
};

export default function BlogPage() {
  const [category, setCategory] = useState('All');

  const sorted = useMemo(
    () => [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1)),
    []
  );

  const featured = sorted.find((post) => post.featured) ?? sorted[0];

  const listed = useMemo(
    () =>
      sorted.filter(
        (post) => post.slug !== featured.slug && (category === 'All' || post.category === category)
      ),
    [sorted, featured, category]
  );

  return (
    <>
      <SEOHead
        title="Blog — Notes on AI, Engineering & Growth | Codestroom"
        description="Practical writing from the Codestroom team on retrieval-augmented AI, blended ROAS and attribution, design systems for small teams, honest project scoping and web performance."
        canonicalPath="/blog"
        schemas={[blogSchema]}
      />

      <PageHero
        kicker="The blog"
        title="Things we learned the expensive way, written down."
        lead="No listicles and no reheated press releases. These are the notes we would want to read before starting the same piece of work."
      />

      <section className="blog-section">
        <div className="wrap">
          <Reveal as="article" className={`blog-featured ${featured.tint}`}>
            <div className="blog-featured-body">
              <span className="case-badge">Latest</span>
              <h2>
                <Link to={`/blog/${featured.slug}`}>{featured.title}</Link>
              </h2>
              <p>{featured.excerpt}</p>
              <div className="blog-featured-meta">
                <span>{featured.category}</span>
                <span aria-hidden="true">•</span>
                <span>{formatBlogDate(featured.date)}</span>
                <span aria-hidden="true">•</span>
                <span>{featured.readTime}</span>
              </div>
              <Link to={`/blog/${featured.slug}`} className="btn btn-primary">
                Read the post →
              </Link>
            </div>
          </Reveal>

          <div className="filter-bar" role="group" aria-label="Filter posts by category">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                aria-pressed={category === cat}
                className={`filter-chip ${category === cat ? 'is-active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {listed.length > 0 ? (
            <div className="blog-grid">
              {listed.map((post) => (
                <Reveal as="article" className="blog-card" key={post.slug}>
                  <div className={`blog-card-band ${post.tint}`} aria-hidden="true"></div>
                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span className="blog-card-cat">{post.category}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3>
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p>{post.excerpt}</p>
                    <div className="blog-card-foot">
                      <span>{formatBlogDate(post.date)}</span>
                      <Link to={`/blog/${post.slug}`} className="case-card-link">
                        Read →
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="portfolio-empty">
              Nothing filed under that yet — try{' '}
              <button type="button" onClick={() => setCategory('All')}>
                all posts
              </button>
              .
            </p>
          )}
        </div>
      </section>

      <CTA />
    </>
  );
}
