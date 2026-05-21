import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdFormRow');
});

async function makeElement(attrs: Record<string, string> = {}, withSlot = false): Promise<HTMLElement> {
  const el = document.createElement('specd-form-row') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  if (withSlot) {
    const input = document.createElement('input');
    input.type = 'text';
    el.appendChild(input);
  }
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdFormRow', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-form-row')).toBeDefined();
  });

  it('renders .form-row', async () => {
    const el = await makeElement({ label: 'API Token' });
    expect(el.querySelector('.form-row')).not.toBeNull();
  });

  it('renders .form-label with text', async () => {
    const el = await makeElement({ label: 'API Token' });
    const label = el.querySelector('.form-label');
    expect(label).not.toBeNull();
    expect(label?.textContent?.trim()).toBe('API Token');
  });

  it('renders slot', async () => {
    const el = await makeElement({ label: 'API Token' }, true);
    const slot = el.querySelector('slot');
    expect(slot).not.toBeNull();
  });

  it('renders .form-hint when hint set', async () => {
    const el = await makeElement({ label: 'API Token', hint: 'Found in account settings' });
    const hint = el.querySelector('.form-hint');
    expect(hint).not.toBeNull();
    expect(hint?.textContent?.trim()).toBe('Found in account settings');
  });

  it('omits hint when not set', async () => {
    const el = await makeElement({ label: 'API Token' });
    expect(el.querySelector('.form-hint')).toBeNull();
  });
});
