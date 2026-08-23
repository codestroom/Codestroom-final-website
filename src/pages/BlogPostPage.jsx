import { Link, useParams } from 'react-router-dom';
import Reveal from '../components/Reveal';
import CTA from '../components/CTA';
import SEOHead from '../components/SEOHead';
import NotFound from './NotFound';
import { BLOG_POSTS, formatBlogDate, getBlogPost } from '../data/blogData';

function Block({ block }) {
  if (block.type === 'h2') return <h2>{block.text}</h2>;
  if (block.type === 'quote') return <blockquote className="post-quote">{block.text}</blockquote>;
  if (block.type === 'ul') {
    return (
      <ul className="post-list">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  return <p>{block.text}</p>;
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = getBlogPost(slug);

  if (!post) return <NotFound />;

  const related = BLOG_POSTS.filter(
    (item) => item.slug !== post.slug && item.category === post.category
  )
    .concat(BLOG_POSTS.filter((item) => item.slug !== post.slug && item.category !== post.category))
    .slice(0, 3);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.tags.join(', '),
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@id': 'https://codestroom.com/#organization' },
    mainEntityOfPage: `https://codestroom.com/blog/${post.slug}`
  };

  return (
    <>
      <SEOHead
        title={`${post.title} | Codestroom Blog`}
        description={post.excerpt}
        canonicalPath={`/blog/${post.slug}`}
        ogType="article"
        schemas={[schema]}
      />

      <article className="post">
        <header className={`post-hero ${post.tint}`}>
          <div className="wrap">
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link to="/blog">Blog</Link>
              <span aria-hidden="true">/</span>
              <span>{post.category}</span>
            </nav>

            <h1>{post.title}</h1>
            <p className="post-hero-excerpt">{post.excerpt}</p>

            <div className="post-hero-meta">
              <span>{post.author}</span>
              <span aria-hidden="true">•</span>
              <span>{formatBlogDate(post.date)}</span>
              <span aria-hidden="true">•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </header>

        <div className="wrap post-layout">
          <div className="post-body">
            {post.body.map((block, idx) => (
              <Block block={block} key={`${block.type}-${idx}`} />
            ))}

            <div className="tag-list post-tags">
              {post.tags.map((tag) => (
                <span className="tag" key={tag}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <aside className="post-aside">
            <div className="case-aside-card">
              <h3>Working on something like this?</h3>
              <p>
                We are happy to be a second opinion before you commit a budget — no deck, no
                discovery fee for the first call.
              </p>
              <Link to="/contact" className="btn btn-gradient">
                Talk it through →
              </Link>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="post-more">
            <div className="wrap">
              <Reveal className="section-head">
                <span className="kicker">Keep reading</span>
                <h2>More from the blog</h2>
              </Reveal>

              <div className="blog-grid">
                {related.map((item) => (
                  <Reveal as="article" className="blog-card" key={item.slug}>
                    <div className={`blog-card-band ${item.tint}`} aria-hidden="true"></div>
                    <div className="blog-card-body">
                      <div className="blog-card-meta">
                        <span className="blog-card-cat">{item.category}</span>
                        <span>{item.readTime}</span>
                      </div>
                      <h3>
                        <Link to={`/blog/${item.slug}`}>{item.title}</Link>
                      </h3>
                      <p>{item.excerpt}</p>
                      <div className="blog-card-foot">
                        <span>{formatBlogDate(item.date)}</span>
                        <Link to={`/blog/${item.slug}`} className="case-card-link">
                          Read →
                        </Link>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <CTA />
    </>
  );
}
