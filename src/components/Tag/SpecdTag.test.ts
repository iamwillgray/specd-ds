import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => { await import('./SpecdTag.js'); });

describe('SpecdTag', () => {
  it('renders a span with .issue-tag', async () => {
    const el = document.createElement('specd-tag') as any;
    el.label = 'No description';
    el.intent = 'crit';
    document.body.appendChild(el);
    await el.updateComplete;
    const span = el.querySelector('span');
    expect(span?.className).toContain('issue-tag');
    expect(span?.className).toContain('crit');
    expect(span?.textContent?.trim()).toBe('No description');
    el.remove();
  });

  it('renders neutral intent', async () => {
    const el = document.createElement('specd-tag') as any;
    el.label = 'Published';
    el.intent = 'neutral';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('span')?.className).toContain('neutral');
    el.remove();
  });

  it('renders sub label when provided', async () => {
    const el = document.createElement('specd-tag') as any;
    el.label = 'HC colours';
    el.sub = 'Fill';
    el.intent = 'warn';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.issue-tag-sub')).not.toBeNull();
    el.remove();
  });
});
