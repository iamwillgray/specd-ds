import { describe, it, expect, beforeAll } from 'vitest';
beforeAll(async () => { await import('./SpecdDrillHeader'); });

async function make(attrs: Record<string,string> = {}) {
  const el = document.createElement('specd-drill-header') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k,v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdDrillHeader', () => {
  it('registers', () => { expect(customElements.get('specd-drill-header')).toBeDefined(); });
  it('renders .dd-bar with back label', async () => {
    const el = await make({ 'back-label': 'Overview', crumb: 'Variable Coverage' });
    expect(el.querySelector('.dd-bar')).not.toBeNull();
    expect(el.querySelector('.dd-back')?.textContent?.trim()).toContain('Overview');
  });
  it('renders crumb and parent', async () => {
    const el = await make({ parent: 'Overview Report', crumb: 'Descriptions' });
    expect(el.querySelector('.dd-crumb')?.textContent).toContain('Overview Report');
    expect(el.querySelector('.dd-crumb b')?.textContent?.trim()).toBe('Descriptions');
  });
  it('emits "back" event on back click', async () => {
    const el = await make({ 'back-label': 'Overview', crumb: 'X' });
    let fired = false; el.addEventListener('back', () => { fired = true; });
    (el.querySelector('.dd-back') as HTMLElement).click();
    expect(fired).toBe(true);
  });
});
