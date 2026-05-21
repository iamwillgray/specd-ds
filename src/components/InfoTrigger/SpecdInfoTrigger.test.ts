import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => { await import('./SpecdInfoTrigger.js'); });

describe('SpecdInfoTrigger', () => {
  it('renders .info-trigger button', async () => {
    const el = document.createElement('specd-info-trigger') as any;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.info-trigger')).not.toBeNull();
    el.remove();
  });

  it('fires specd-info event on click', async () => {
    const el = document.createElement('specd-info-trigger') as any;
    document.body.appendChild(el);
    await el.updateComplete;
    let fired = false;
    el.addEventListener('specd-info', () => { fired = true; });
    el.querySelector('.info-trigger').click();
    expect(fired).toBe(true);
    el.remove();
  });
});
