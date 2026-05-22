import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './SpecdColorSwatch.js';

describe('SpecdColorSwatch', () => {
  let el: HTMLElement;

  beforeEach(() => {
    el = document.createElement('specd-color-swatch');
    document.body.appendChild(el);
  });

  afterEach(() => { el.remove(); });

  it('renders qf-replace-swatch by default', async () => {
    el.setAttribute('color', '#ff0000');
    await (el as any).updateComplete;
    expect(el.querySelector('.qf-replace-swatch')).toBeTruthy();
  });

  it('renders color-swatch-sm when sm attribute is set', async () => {
    el.setAttribute('color', '#ff0000');
    el.setAttribute('sm', '');
    await (el as any).updateComplete;
    expect(el.querySelector('.color-swatch-sm')).toBeTruthy();
  });

  it('uses aria-label from label attribute', async () => {
    el.setAttribute('color', '#ff0000');
    el.setAttribute('label', 'Red');
    await (el as any).updateComplete;
    const span = el.querySelector('.qf-replace-swatch');
    expect(span?.getAttribute('aria-label')).toBe('Red');
  });
});
