import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('../RadioRow/SpecdRadioRow.js');
  await import('./SpecdComponentPicker.js');
});

const OPTS = JSON.stringify([
  { id: 'c1', name: 'Button/Primary', library: 'Acme DS' },
  { id: 'c2', name: 'Card/Product', library: 'Acme DS' },
]);

const SUGG = JSON.stringify([
  { id: 'c1', name: 'Button/Primary', library: 'Acme DS' },
]);

describe('SpecdComponentPicker', () => {
  it('renders nothing when open=false', async () => {
    const el = document.createElement('specd-component-picker') as any;
    el.options = OPTS;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.picker-modal')).toBeNull();
    el.remove();
  });

  it('renders modal when open=true', async () => {
    const el = document.createElement('specd-component-picker') as any;
    el.open = true;
    el.options = OPTS;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.picker-modal')).not.toBeNull();
    el.remove();
  });

  it('renders specd-radio-row per option (flat list when no suggestions)', async () => {
    const el = document.createElement('specd-component-picker') as any;
    el.open = true;
    el.options = OPTS;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelectorAll('specd-radio-row').length).toBe(2);
    el.remove();
  });

  it('renders Suggested and All Components sections when suggestions provided', async () => {
    const el = document.createElement('specd-component-picker') as any;
    el.open = true;
    el.options = OPTS;
    el.suggestions = SUGG;
    document.body.appendChild(el);
    await el.updateComplete;
    const titles = Array.from(el.querySelectorAll('.vp-section-title')).map((h: any) => h.textContent.trim());
    expect(titles).toContain('Suggested');
    expect(titles).toContain('All Components');
    el.remove();
  });

  it('section meta shows correct count', async () => {
    const el = document.createElement('specd-component-picker') as any;
    el.open = true;
    el.options = OPTS;
    el.suggestions = SUGG;
    document.body.appendChild(el);
    await el.updateComplete;
    const metas = el.querySelectorAll('.vp-section-meta');
    expect(metas[0]?.textContent?.trim()).toBe('1 result');
    expect(metas[1]?.textContent?.trim()).toBe('2 results');
    el.remove();
  });

  it('filters options by search query', async () => {
    const el = document.createElement('specd-component-picker') as any;
    el.open = true;
    el.options = OPTS;
    document.body.appendChild(el);
    await el.updateComplete;
    const input = el.querySelector('.vp-search') as HTMLInputElement;
    input.value = 'card';
    input.dispatchEvent(new Event('input'));
    await el.updateComplete;
    expect(el.querySelectorAll('specd-radio-row').length).toBe(1);
    el.remove();
  });

  it('fires specd-pick with id and name when a row is chosen', async () => {
    const el = document.createElement('specd-component-picker') as any;
    el.open = true;
    el.options = OPTS;
    document.body.appendChild(el);
    await el.updateComplete;
    let detail: any = null;
    el.addEventListener('specd-pick', (e: any) => { detail = e.detail; });
    el.querySelectorAll('specd-radio-row')[0].dispatchEvent(
      new CustomEvent('specd-change', { detail: { value: 'c1' }, bubbles: true })
    );
    expect(detail?.id).toBe('c1');
    expect(detail?.name).toBe('Button/Primary');
    el.remove();
  });

  it('fires specd-close when close button clicked', async () => {
    const el = document.createElement('specd-component-picker') as any;
    el.open = true;
    el.options = OPTS;
    document.body.appendChild(el);
    await el.updateComplete;
    let fired = false;
    el.addEventListener('specd-close', () => { fired = true; });
    el.querySelector('.vp-close').click();
    expect(fired).toBe(true);
    el.remove();
  });
});
