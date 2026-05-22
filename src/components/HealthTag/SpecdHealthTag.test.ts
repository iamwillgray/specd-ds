import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './SpecdHealthTag.js';

describe('SpecdHealthTag', () => {
  let el: HTMLElement;

  beforeEach(() => {
    el = document.createElement('specd-health-tag');
    document.body.appendChild(el);
  });

  afterEach(() => { el.remove(); });

  it('registers as specd-health-tag', () => {
    expect(customElements.get('specd-health-tag')).toBeDefined();
  });

  it('renders health-badge class with tier and size', async () => {
    el.setAttribute('tier', 'good');
    el.setAttribute('label', 'Healthy');
    el.setAttribute('size', 'md');
    await (el as any).updateComplete;
    const span = el.querySelector('.health-badge');
    expect(span).toBeTruthy();
    expect(span?.classList.contains('sz-md')).toBe(true);
    expect(span?.classList.contains('tier-good')).toBe(true);
    expect(span?.textContent?.trim()).toBe('Healthy');
  });
});
