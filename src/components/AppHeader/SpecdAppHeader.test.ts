import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdAppHeader');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-app-header') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdAppHeader', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-app-header')).toBeDefined();
  });

  it('renders .app-header-v2', async () => {
    const el = await makeElement();
    expect(el.querySelector('.app-header-v2')).not.toBeNull();
  });

  it('renders .logo-mark', async () => {
    const el = await makeElement();
    expect(el.querySelector('.logo-mark')).not.toBeNull();
  });

  it('shows default name "Pulse"', async () => {
    const el = await makeElement();
    const nameEl = el.querySelector('.header-name');
    expect(nameEl?.textContent?.trim()).toBe('Pulse');
  });

  it('hides refresh button by default', async () => {
    const el = await makeElement();
    const buttons = el.querySelectorAll('.header-icon-btn');
    expect(buttons.length).toBe(0);
  });

  it('shows refresh button when showrefresh attr set', async () => {
    const el = await makeElement({ showrefresh: '' });
    const buttons = el.querySelectorAll('.header-icon-btn');
    expect(buttons.length).toBe(1);
  });

  it('shows settings button when showsettings attr set', async () => {
    const el = await makeElement({ showsettings: '' });
    const buttons = el.querySelectorAll('.header-icon-btn');
    expect(buttons.length).toBe(1);
  });

  it('fires specd-refresh event on refresh click', async () => {
    const el = await makeElement({ showrefresh: '' });
    let fired = false;
    el.addEventListener('specd-refresh', () => { fired = true; });
    const btn = el.querySelector('.header-icon-btn') as HTMLButtonElement;
    btn.click();
    expect(fired).toBe(true);
  });
});
