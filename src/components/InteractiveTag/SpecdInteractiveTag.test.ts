import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './SpecdInteractiveTag.js';

describe('SpecdInteractiveTag', () => {
  let el: HTMLElement;

  beforeEach(() => {
    el = document.createElement('specd-interactive-tag');
    document.body.appendChild(el);
  });

  afterEach(() => { el.remove(); });

  it('renders matched variant', async () => {
    el.setAttribute('variant', 'matched');
    el.setAttribute('label', 'Matched');
    await (el as any).updateComplete;
    const span = el.querySelector('span');
    expect(span?.className).toContain('btn-sb-good');
    expect(span?.textContent?.trim()).toBe('Matched');
  });

  it('renders missing variant', async () => {
    el.setAttribute('variant', 'missing');
    el.setAttribute('label', 'Missing');
    await (el as any).updateComplete;
    const span = el.querySelector('span');
    expect(span?.className).toContain('btn-sb-bad');
  });

  it('renders muted variant', async () => {
    el.setAttribute('variant', 'muted');
    el.setAttribute('label', '—');
    await (el as any).updateComplete;
    const span = el.querySelector('span');
    expect(span?.className).toContain('btn-sb-muted');
  });
});
