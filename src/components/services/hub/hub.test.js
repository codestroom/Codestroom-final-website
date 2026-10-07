import { describe, it, expect } from 'vitest';
import { normalizeUrl, parseReport, tone } from './auditReport';
import { buildPlan } from '../../../data/planBuilder';

describe('normalizeUrl', () => {
  it('adds https and rejects junk', () => {
    expect(normalizeUrl('example.com')).toBe('https://example.com/');
    expect(normalizeUrl('http://shop.example.in/a')).toBe('http://shop.example.in/a');
    expect(normalizeUrl('hello')).toBeNull();
    expect(normalizeUrl('   ')).toBeNull();
  });
});

describe('tone', () => {
  it('matches Lighthouse colour bands', () => {
    expect(tone(95)).toBe('good');
    expect(tone(70)).toBe('ok');
    expect(tone(20)).toBe('bad');
  });
});

describe('parseReport', () => {
  const data = {
    lighthouseResult: {
      finalDisplayedUrl: 'https://example.com/',
      categories: {
        performance: {
          score: 0.42,
          auditRefs: [
            { id: 'largest-contentful-paint', weight: 25, group: 'metrics' },
            { id: 'unused-javascript', weight: 0 },
            { id: 'fine-audit', weight: 0 }
          ]
        },
        seo: { score: 0.9, auditRefs: [{ id: 'image-alt', weight: 10 }] },
        accessibility: { score: 0.8, auditRefs: [{ id: 'image-alt', weight: 10 }, { id: 'manual-one', weight: 0 }] },
        'best-practices': { score: 1, auditRefs: [] }
      },
      audits: {
        'largest-contentful-paint': { score: 0.1, displayValue: '6.2 s' },
        'unused-javascript': { score: 0.3, title: 'Reduce unused `JavaScript`', displayValue: 'Est savings of 300 KiB', details: { overallSavingsMs: 1200 } },
        'fine-audit': { score: 1, title: 'Fine' },
        'image-alt': { score: 0, title: 'Image elements do not have `[alt]` attributes' },
        'manual-one': { score: 0, title: 'Manual', scoreDisplayMode: 'manual' },
        'final-screenshot': { details: { data: 'data:image/jpeg;base64,AAA' } }
      }
    }
  };

  it('extracts scores, metrics, screenshot and deduped issues', () => {
    const r = parseReport(data);
    expect(r.scores.map((s) => s.score)).toEqual([42, 90, 80, 100]);
    expect(r.metrics[0]).toMatchObject({ value: '6.2 s', score: 10 });
    expect(r.screenshot).toBe('data:image/jpeg;base64,AAA');
    expect(r.issues.map((i) => i.id)).toEqual(['image-alt', 'unused-javascript']);
    expect(r.issues[0].title).toBe('Image elements do not have alt attributes');
    expect(r.issues[1].title).toBe('Reduce unused JavaScript');
  });
});

describe('buildPlan', () => {
  it('builds a store + ads plan for a product brand that wants to sell', () => {
    const plan = buildPlan({ type: 'ecom', goals: ['sell'], stage: 'some' });
    const ids = plan.items.map((i) => i.id);
    expect(ids).toEqual(expect.arrayContaining(['shopify', 'ads']));
    expect(plan.buildWeeks).toEqual([2, 4]);
    expect(plan.phases.map((p) => p.id)).toEqual(['build', 'grow']);
  });

  it('adds website, setup and local SEO for a local business starting from zero', () => {
    const plan = buildPlan({ type: 'food', goals: ['leads'], stage: 'zero' });
    const ids = plan.items.map((i) => i.id);
    expect(ids).toEqual(expect.arrayContaining(['static', 'setup', 'localseo', 'leads', 'ads', 'funnel']));
  });

  it('never returns an empty plan', () => {
    const plan = buildPlan({ type: 'b2b', goals: [], stage: 'some' });
    expect(plan.items.length).toBeGreaterThan(0);
  });
});
