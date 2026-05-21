import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => { await import('./SpecdColorSwatch.js'); });

describe('SpecdColorSwatch', () => {
  it('renders .qf-replace-swatch element', async () => {
    const el = document.createElement('specd-color-swatch') as any;
    el.color = '#ff0000';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.qf-replace-swatch')).not.toBeNull();
    el.remove();
  });

  it('applies background color style', async () => {
    const el = document.createElement('specd-color-swatch') as any;
    el.color = '#336699';
    document.body.appendChild(el);
    await el.updateComplete;
    const swatch = el.querySelector('.qf-replace-swatch') as HTMLElement;
    expect(swatch.style.background).toBeTruthy();
    el.remove();
  });
});
