import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './SpecdColorSwatch.js';

describe('SpecdColorSwatch', () => {
  let el: HTMLElement;

  beforeEach(() => {
    el = document.createElement('specd-color-swatch');
    document.body.appendChild(el);
  });

  afterEach(() => { el.remove(); });

  it('renders qf-replace-swatch for square variant (default)', async () => {
    el.setAttribute('color', '#ff0000');
    await (el as any).updateComplete;
    expect(el.querySelector('.qf-replace-swatch')).toBeTruthy();
  });

  it('renders color-swatch for chip variant', async () => {
    el.setAttribute('color', '#ff0000');
    el.setAttribute('variant', 'chip');
    el.setAttribute('label', 'Red');
    await (el as any).updateComplete;
    expect(el.querySelector('.color-swatch')).toBeTruthy();
    expect(el.querySelector('.color-swatch-dot')).toBeTruthy();
    expect(el.querySelector('.color-swatch-label')).toBeTruthy();
  });

  it('renders typography variant with Aa glyph', async () => {
    el.setAttribute('color', '#ff0000');
    el.setAttribute('variant', 'typography');
    await (el as any).updateComplete;
    const typo = el.querySelector('.color-swatch-typography');
    expect(typo).toBeTruthy();
    expect(typo?.textContent?.trim()).toBe('Aa');
  });
});
