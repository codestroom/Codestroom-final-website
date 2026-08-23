import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from './App';
import { BLOG_POSTS } from './data/blogData';

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );
}

describe('routing', () => {
  it('renders the home page at /, including the strategy mix slider', () => {
    renderAt('/');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('IT & Marketing for absolutely everybody.');
    expect(screen.getByText('Drag to find your marketing mix. No math required.')).toBeInTheDocument();
  });

  it.each([
    ['/services', 'One team, every channel your business needs.'],
    ['/about', 'The origin story'],
    ['/global-reach', 'Local insight, wherever your audience hangs out.'],
    ['/process', 'One engagement, four checkpoints.'],
    ['/work', 'Built for the businesses and people who serve their communities.'],
    ['/portfolio', "The kind of work we're built for."],
    ['/blog', 'Things we learned the expensive way, written down.'],
    ['/contact', "However you'd rather start the conversation."],
  ])('renders %s', (path, heading) => {
    renderAt(path);
    expect(screen.getByText(heading)).toBeInTheDocument();
  });

  it.each(BLOG_POSTS.map((post) => [`/blog/${post.slug}`, post.title]))(
    'renders blog post %s',
    (path, title) => {
      const page = renderAt(path);
      expect(page.getByRole('heading', { level: 1 })).toHaveTextContent(title);
      page.unmount();
    }
  );

  it.each([['/blog/not-a-post']])(
    'falls back to the 404 page for %s',
    (path) => {
      const page = renderAt(path);
      expect(page.getByText('This page ghosted us.')).toBeInTheDocument();
      page.unmount();
    }
  );

  it('no longer serves a standalone /case-studies page', () => {
    renderAt('/case-studies');
    expect(screen.getByText('This page ghosted us.')).toBeInTheDocument();
  });

  it.each([
    ['/industries/restaurants', 'Get found by hungry people nearby.'],
    ['/industries/religious-organizations', 'A digital home for your community.'],
    ['/industries/ecommerce', 'Turn more browsers into buyers.'],
    ['/industries/startups', 'Marketing that fits an early-stage budget.'],
    ['/industries/political-campaigns', 'Build visibility people actually trust.'],
  ])('renders industry page %s', (path, heading) => {
    const page = renderAt(path);
    expect(page.getByRole('heading', { level: 1 })).toHaveTextContent(heading);
    page.unmount();
  });

  it('redirects an unknown industry slug back to /work', () => {
    renderAt('/industries/not-a-real-industry');
    expect(screen.getByText('Built for the businesses and people who serve their communities.')).toBeInTheDocument();
  });

  it.each([
    ['/services/ai-solutions', 'AI Services & Enterprise Intelligence'],
    ['/services/web-development', 'Modern Web Development & Web Apps'],
    ['/services/custom-software', 'Custom Software Development'],
    ['/services/mobile-apps', 'Mobile App Development'],
    ['/services/backend-development', 'Backend Development & Cloud APIs'],
    ['/services/ecommerce', 'E-Commerce Solutions & Store Growth'],
    ['/services/digital-marketing', 'Digital Marketing & Performance Growth'],
    ['/services/creative-design', 'Creative Design, Video Editing & Brand Identity'],
  ])('renders detailed service page %s', (path) => {
    const page = renderAt(path);
    expect(page.queryByText('This page ghosted us.')).not.toBeInTheDocument();
    page.unmount();
  });

  it('no longer serves a standalone /blend-lab page', () => {
    renderAt('/blend-lab');
    expect(screen.getByText('This page ghosted us.')).toBeInTheDocument();
  });

  it('renders the 404 page for an unknown route', () => {
    renderAt('/does-not-exist');
    expect(screen.getByText('This page ghosted us.')).toBeInTheDocument();
  });

  it('every header nav link points to a route the app actually renders', () => {
    const home = renderAt('/');
    const nav = home.getByRole('navigation');
    const hrefs = [...nav.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href'));
    expect(hrefs.length).toBeGreaterThan(0);
    home.unmount();

    for (const href of hrefs) {
      const page = renderAt(href);
      expect(page.queryByText('This page ghosted us.')).not.toBeInTheDocument();
      page.unmount();
    }
  });
});
