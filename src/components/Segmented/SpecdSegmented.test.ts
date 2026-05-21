import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdSegmented');
});

const OPTIONS = JSON.stringify([
  { value: 'coverage', label: 'Coverage' },
  { value: 'rules', label: 'Rules' },
  { value: 'tokens', label: 'Tokens' },
]);

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-segmented') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdSegmented', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-segmented')).toBeDefined();
  });

  it('renders .segmented-toggle', async () => {
    const el = await makeElement({ options: OPTIONS, value: 'coverage' });
    expect(el.querySelector('.segmented-toggle')).not.toBeNull();
  });

  it('renders correct button count', async () => {
    const el = await makeElement({ options: OPTIONS, value: 'coverage' });
    expect(el.querySelectorAll('.seg-btn').length).toBe(3);
  });

  it('active button has .active class', async () => {
    const el = await makeElement({ options: OPTIONS, value: 'rules' });
    const buttons = el.querySelectorAll('.seg-btn');
    expect(buttons[1].classList.contains('active')).toBe(true);
  });

  it('inactive buttons lack .active class', async () => {
    const el = await makeElement({ options: OPTIONS, value: 'rules' });
    const buttons = el.querySelectorAll('.seg-btn');
    expect(buttons[0].classList.contains('active')).toBe(false);
    expect(buttons[2].classList.contains('active')).toBe(false);
  });

  it('clicking fires specd-change with correct value', async () => {
    const el = await makeElement({ options: OPTIONS, value: 'coverage' });
    let eventDetail: { value: string } | null = null;
    el.addEventListener('specd-change', (e: Event) => {
      eventDetail = (e as CustomEvent).detail;
    });
    const btn = el.querySelectorAll('.seg-btn')[2] as HTMLButtonElement;
    btn.click();
    await (el as HTMLElement & { updateComplete: Promise<boolean> }).updateComplete;
    expect(eventDetail).not.toBeNull();
    expect(eventDetail!.value).toBe('tokens');
  });
});
