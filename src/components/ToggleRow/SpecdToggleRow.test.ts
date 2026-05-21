import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdToggleRow');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-toggle-row') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdToggleRow', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-toggle-row')).toBeDefined();
  });

  it('renders .toggle-row', async () => {
    const el = await makeElement({ label: 'Ignore hidden layers' });
    expect(el.querySelector('.toggle-row')).not.toBeNull();
  });

  it('shows label', async () => {
    const el = await makeElement({ label: 'Ignore hidden layers' });
    expect(el.querySelector('.toggle-row-label')?.textContent?.trim()).toBe('Ignore hidden layers');
  });

  it('shows hint when set', async () => {
    const el = await makeElement({ label: 'Ignore hidden layers', hint: 'Skip hidden nodes' });
    expect(el.querySelector('.toggle-row-hint')?.textContent?.trim()).toBe('Skip hidden nodes');
  });

  it('renders .toggle-track', async () => {
    const el = await makeElement({ label: 'Ignore hidden layers' });
    expect(el.querySelector('.toggle-track')).not.toBeNull();
  });

  it('.toggle-track has class on when checked attr set', async () => {
    const el = await makeElement({ label: 'Ignore hidden layers', checked: '' });
    expect(el.querySelector('.toggle-track')?.classList.contains('on')).toBe(true);
  });

  it('fires specd-change on toggle click', async () => {
    const el = await makeElement({ label: 'Ignore hidden layers' });
    let eventDetail: { checked: boolean } | null = null;
    el.addEventListener('specd-change', (e: Event) => {
      eventDetail = (e as CustomEvent).detail;
    });
    const toggle = el.querySelector('.toggle') as HTMLLabelElement;
    toggle.click();
    await (el as HTMLElement & { updateComplete: Promise<boolean> }).updateComplete;
    expect(eventDetail).not.toBeNull();
    expect(typeof eventDetail!.checked).toBe('boolean');
  });
});
