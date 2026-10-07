// Turns a PageSpeed Insights (Lighthouse) response into the audit report shown on /services.

export const CATEGORIES = [
  { id: 'performance', label: 'Speed' },
  { id: 'seo', label: 'SEO' },
  { id: 'accessibility', label: 'Accessibility' },
  { id: 'best-practices', label: 'Best practices' }
];

const METRICS = [
  { id: 'largest-contentful-paint', label: 'Main content visible' },
  { id: 'first-contentful-paint', label: 'First thing on screen' },
  { id: 'total-blocking-time', label: 'Page frozen for' },
  { id: 'cumulative-layout-shift', label: 'Layout jumping' }
];


export function normalizeUrl(raw) {
  const value = raw.trim();
  if (!value) return null;
  const withScheme = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const url = new URL(withScheme);
    if (!url.hostname.includes('.')) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function tone(score) {
  if (score >= 90) return 'good';
  if (score >= 50) return 'ok';
  return 'bad';
}

export function verdict(speed) {
  if (speed >= 90) return 'Excellent — your site is in great shape. The next step is bringing more people to it.';
  if (speed >= 50) return 'Decent, but there is real speed and ranking left on the table.';
  return 'Slow on mobile — many visitors leave before a page like this finishes loading.';
}

function cleanTitle(title) {
  return title.replace(/`/g, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[[\]]/g, '');
}

export function parseReport(data) {
  const lh = data.lighthouseResult;
  const audits = lh.audits;

  const scores = CATEGORIES.map((c) => ({
    ...c,
    score: Math.round((lh.categories[c.id]?.score ?? 0) * 100)
  }));

  const metrics = METRICS.map((m) => ({
    ...m,
    value: audits[m.id]?.displayValue ?? '—',
    score: Math.round((audits[m.id]?.score ?? 0) * 100)
  }));

  const seen = new Set();
  const issues = [];
  CATEGORIES.forEach((c) => {
    (lh.categories[c.id]?.auditRefs || []).forEach((ref) => {
      const a = audits[ref.id];
      if (!a || seen.has(ref.id) || ref.group === 'metrics') return;
      if (a.score === null || a.score >= 0.9) return;
      if (['informative', 'notApplicable', 'manual'].includes(a.scoreDisplayMode)) return;
      seen.add(ref.id);
      const savingsMs = a.details?.overallSavingsMs || 0;
      issues.push({
        id: ref.id,
        category: c.label,
        title: cleanTitle(a.title),
        detail: a.displayValue || '',
        priority: (ref.weight || 0) + savingsMs / 400 + (1 - a.score)
      });
    });
  });
  issues.sort((x, y) => y.priority - x.priority);

  return {
    url: lh.finalDisplayedUrl || lh.finalUrl || data.id,
    scores,
    metrics,
    issues: issues.slice(0, 6),
    issueCount: issues.length,
    screenshot: audits['final-screenshot']?.details?.data || null
  };
}
