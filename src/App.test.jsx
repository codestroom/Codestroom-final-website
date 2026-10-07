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
  it('renders the home page at /, including the strategy mix slider', async () => {
    renderAt('/');
    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent('IT & Marketing for absolutely everybody.');
    expect(await screen.findByText('Drag to find your marketing mix. No math required.')).toBeInTheDocument();
  });

  it.each([
    ['/services', 'Two paths.'],
    ['/about', 'The origin story'],
    ['/global-reach', 'Local insight, wherever your audience hangs out.'],
    ['/process', 'One engagement, four checkpoints.'],
    ['/work', 'Built for the businesses and people who serve their communities.'],
    ['/portfolio', 'Real accounts. Real growth.'],
    ['/blog', 'Things we learned the expensive way, written down.'],
    ['/contact', "However you'd rather start the conversation."],
  ])('renders %s', async (path, heading) => {
    renderAt(path);
    expect(await screen.findByText(heading)).toBeInTheDocument();
  });

  it.each(BLOG_POSTS.map((post) => [`/blog/${post.slug}`, post.title]))(
    'renders blog post %s',
    async (path, title) => {
      const page = renderAt(path);
      expect(await page.findByRole('heading', { level: 1 })).toHaveTextContent(title);
      page.unmount();
    }
  );

  it.each([['/blog/not-a-post']])(
    'falls back to the 404 page for %s',
    async (path) => {
      const page = renderAt(path);
      expect(await page.findByText('This page ghosted us.')).toBeInTheDocument();
      page.unmount();
    }
  );

  it('no longer serves a standalone /case-studies page', async () => {
    renderAt('/case-studies');
    expect(await screen.findByText('This page ghosted us.')).toBeInTheDocument();
  });

  it.each([
    ['/industries/restaurants', 'Get found by hungry people nearby.'],
    ['/industries/religious-organizations', 'A digital home for your community.'],
    ['/industries/ecommerce', 'Turn more browsers into buyers.'],
    ['/industries/startups', 'Marketing that fits an early-stage budget.'],
    ['/industries/political-campaigns', 'Build visibility people actually trust.'],
  ])('renders industry page %s', async (path, heading) => {
    const page = renderAt(path);
    expect(await page.findByRole('heading', { level: 1 })).toHaveTextContent(heading);
    page.unmount();
  });

  it('redirects an unknown industry slug back to /work', async () => {
    renderAt('/industries/not-a-real-industry');
    expect(await screen.findByText('Built for the businesses and people who serve their communities.')).toBeInTheDocument();
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
  ])('renders detailed service page %s', async (path) => {
    const page = renderAt(path);
    await page.findByRole('heading', { level: 1 });
    expect(page.queryByText('This page ghosted us.')).not.toBeInTheDocument();
    page.unmount();
  });

  it('no longer serves a standalone /blend-lab page', async () => {
    renderAt('/blend-lab');
    expect(await screen.findByText('This page ghosted us.')).toBeInTheDocument();
  });

  it('renders the 404 page for an unknown route', async () => {
    renderAt('/does-not-exist');
    expect(await screen.findByText('This page ghosted us.')).toBeInTheDocument();
  });

  it('every header nav link points to a route the app actually renders', async () => {
    const home = renderAt('/');
    const nav = await home.findByRole('navigation');
    const hrefs = [...nav.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href'));
    expect(hrefs.length).toBeGreaterThan(0);
    home.unmount();

    for (const href of hrefs) {
      const page = renderAt(href);
      await page.findByRole('heading', { level: 1 });
      expect(page.queryByText('This page ghosted us.')).not.toBeInTheDocument();
      page.unmount();
    }
  });
});
