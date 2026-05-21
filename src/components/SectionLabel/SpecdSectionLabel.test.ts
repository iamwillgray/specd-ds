import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdSectionLabel');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-section-label') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdSectionLabel', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-section-label')).toBeDefined();
  });

  it('renders .section-label', async () => {
    const el = await makeElement({ label: 'Token Coverage' });
    expect(el.querySelector('.section-label')).not.toBeNull();
  });

  it('shows label text', async () => {
    const el = await makeElement({ label: 'Token Coverage' });
    expect(el.querySelector('.section-label')?.textContent?.trim()).toBe('Token Coverage');
  });

  it('renders .section-label-hint when hint set', async () => {
    const el = await makeElement({ label: 'Token Coverage', hint: 'Bound vs hard-coded' });
    expect(el.querySelector('.section-label-hint')).not.toBeNull();
    expect(el.querySelector('.section-label-hint')?.textContent?.trim()).toBe('Bound vs hard-coded');
  });

  it('omits hint element when not set', async () => {
    const el = await makeElement({ label: 'Token Coverage' });
    expect(el.querySelector('.section-label-hint')).toBeNull();
  });
});
