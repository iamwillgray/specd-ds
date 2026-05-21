import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdKvRow');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement & { updateComplete: Promise<boolean> }> {
  const el = document.createElement('specd-kv-row') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdKvRow', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-kv-row')).toBeDefined();
  });

  it('renders .kv-row', async () => {
    const el = await makeElement({ label: 'Name', value: 'John' });
    expect(el.querySelector('.kv-row')).not.toBeNull();
  });

  it('shows label text', async () => {
    const el = await makeElement({ label: 'Version', value: '1.0.0' });
    expect(el.querySelector('.kv-label')?.textContent?.trim()).toBe('Version');
  });

  it('shows value text', async () => {
    const el = await makeElement({ label: 'Version', value: '1.0.0' });
    expect(el.querySelector('.kv-value')?.textContent?.trim()).toBe('1.0.0');
  });

  it('applies .mono class when mono=true', async () => {
    const el = await makeElement({ label: 'ID', value: 'abc123', mono: '' });
    expect(el.querySelector('.kv-value')?.className).toContain('mono');
  });
});
