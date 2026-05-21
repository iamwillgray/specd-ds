import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => { await import('./SpecdVariablePicker.js'); });

const OPTS = JSON.stringify([
  { id: 'v1', name: 'color/primary/navy', collection: 'Brand', type: 'semantic' },
  { id: 'v2', name: 'color/lime/400',     collection: 'Primitives' },
]);

describe('SpecdVariablePicker', () => {
  it('renders nothing when open=false', async () => {
    const el = document.createElement('specd-variable-picker') as any;
    el.options = OPTS;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.variable-picker-modal')).toBeNull();
    el.remove();
  });

  it('renders modal when open=true', async () => {
    const el = document.createElement('specd-variable-picker') as any;
    el.open = true;
    el.options = OPTS;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.variable-picker-modal')).not.toBeNull();
    el.remove();
  });

  it('renders a radio row per option', async () => {
    const el = document.createElement('specd-variable-picker') as any;
    el.open = true;
    el.options = OPTS;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelectorAll('.vp-radio-row').length).toBe(2);
    el.remove();
  });

  it('fires specd-pick when option selected', async () => {
    const el = document.createElement('specd-variable-picker') as any;
    el.open = true;
    el.options = OPTS;
    document.body.appendChild(el);
    await el.updateComplete;
    let detail: any = null;
    el.addEventListener('specd-pick', (e: any) => { detail = e.detail; });
    el.querySelectorAll('input[type="radio"]')[0].dispatchEvent(new Event('change', { bubbles: true }));
    expect(detail?.id).toBe('v1');
    el.remove();
  });

  it('fires specd-close when close button clicked', async () => {
    const el = document.createElement('specd-variable-picker') as any;
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
