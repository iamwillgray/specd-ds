import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdEmptyState');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement & { updateComplete: Promise<boolean> }> {
  const el = document.createElement('specd-empty-state') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdEmptyState', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-empty-state')).toBeDefined();
  });

  it('renders .empty-state', async () => {
    const el = await makeElement({ title: 'Nothing here' });
    expect(el.querySelector('.empty-state')).not.toBeNull();
  });

  it('renders title text', async () => {
    const el = await makeElement({ title: 'No results' });
    expect(el.querySelector('.empty-state-title')?.textContent?.trim()).toBe('No results');
  });

  it('renders description when set', async () => {
    const el = await makeElement({ title: 'Empty', description: 'Try again' });
    expect(el.querySelector('.empty-state-desc')?.textContent?.trim()).toBe('Try again');
  });

  it('omits description when not set', async () => {
    const el = await makeElement({ title: 'Empty' });
    expect(el.querySelector('.empty-state-desc')).toBeNull();
  });

  it('renders .empty-state-icon when icon is set', async () => {
    const el = await makeElement({ title: 'Empty', icon: '<svg></svg>' });
    expect(el.querySelector('.empty-state-icon')).not.toBeNull();
  });
});
