import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => { await import('./SpecdIgnoreFooter.js'); });

describe('SpecdIgnoreFooter', () => {
  it('renders .ignore-footer with all/cancel buttons', async () => {
    const el = document.createElement('specd-ignore-footer') as any;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.ignore-footer')).not.toBeNull();
    expect(el.querySelector('specd-button[data-action="ignore-all"]')).not.toBeNull();
    expect(el.querySelector('specd-button[data-action="ignore-cancel"]')).not.toBeNull();
    el.remove();
  });

  it('hides selected button by default', async () => {
    const el = document.createElement('specd-ignore-footer') as any;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('specd-button[data-action="ignore-selected"]')).toBeNull();
    el.remove();
  });

  it('shows selected button when showselected=true', async () => {
    const el = document.createElement('specd-ignore-footer') as any;
    el.showselected = true;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('specd-button[data-action="ignore-selected"]')).not.toBeNull();
    el.remove();
  });

  it('fires specd-ignore-all on click', async () => {
    const el = document.createElement('specd-ignore-footer') as any;
    document.body.appendChild(el);
    await el.updateComplete;
    let fired = false;
    el.addEventListener('specd-ignore-all', () => { fired = true; });
    el.querySelector('specd-button[data-action="ignore-all"]').click();
    expect(fired).toBe(true);
    el.remove();
  });

  it('uses specd-button elements internally', async () => {
    const el = document.createElement('specd-ignore-footer') as any;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelectorAll('specd-button').length).toBeGreaterThan(0);
    el.remove();
  });
});
