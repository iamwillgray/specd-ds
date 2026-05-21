import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdTabBar');
});

const TABS = JSON.stringify([
  { id: 'overview', label: 'Overview' },
  { id: 'issues', label: 'Issues', badge: 7 },
  { id: 'components', label: 'Components' },
]);

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-tab-bar') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdTabBar', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-tab-bar')).toBeDefined();
  });

  it('renders .tab-bar-v2', async () => {
    const el = await makeElement({ tabs: TABS, active: 'overview' });
    expect(el.querySelector('.tab-bar-v2')).not.toBeNull();
  });

  it('renders correct tab count', async () => {
    const el = await makeElement({ tabs: TABS, active: 'overview' });
    const buttons = el.querySelectorAll('.tab-v2');
    expect(buttons.length).toBe(3);
  });

  it('active tab has .active class', async () => {
    const el = await makeElement({ tabs: TABS, active: 'issues' });
    const buttons = el.querySelectorAll('.tab-v2');
    expect(buttons[1].classList.contains('active')).toBe(true);
  });

  it('inactive tabs do not have .active class', async () => {
    const el = await makeElement({ tabs: TABS, active: 'issues' });
    const buttons = el.querySelectorAll('.tab-v2');
    expect(buttons[0].classList.contains('active')).toBe(false);
    expect(buttons[2].classList.contains('active')).toBe(false);
  });

  it('clicking fires specd-tab-change event with correct id', async () => {
    const el = await makeElement({ tabs: TABS, active: 'overview' });
    let eventDetail: { id: string } | null = null;
    el.addEventListener('specd-tab-change', (e: Event) => {
      eventDetail = (e as CustomEvent).detail;
    });
    const btn = el.querySelectorAll('.tab-v2')[2] as HTMLButtonElement;
    btn.click();
    await (el as HTMLElement & { updateComplete: Promise<boolean> }).updateComplete;
    expect(eventDetail).not.toBeNull();
    expect(eventDetail!.id).toBe('components');
  });

  it('badge renders when provided', async () => {
    const el = await makeElement({ tabs: TABS, active: 'overview' });
    const badge = el.querySelector('.tab-badge');
    expect(badge).not.toBeNull();
    expect(badge?.textContent?.trim()).toBe('7');
  });
});
