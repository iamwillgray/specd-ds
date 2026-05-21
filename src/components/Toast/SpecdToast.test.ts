import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdToast');
});

async function makeElement(attrs: Record<string, string | number> = {}): Promise<HTMLElement & { updateComplete: Promise<boolean> }> {
  const el = document.createElement('specd-toast') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'duration') (el as any).duration = v;
    else el.setAttribute(k, String(v));
  }
  // Set duration=0 by default to avoid auto-dismiss in tests
  if (!('duration' in attrs)) (el as any).duration = 0;
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdToast', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-toast')).toBeDefined();
  });

  it('renders .toast', async () => {
    const el = await makeElement({ title: 'Hello' });
    expect(el.querySelector('.toast')).not.toBeNull();
  });

  it('renders title text', async () => {
    const el = await makeElement({ title: 'Test Toast' });
    expect(el.querySelector('.toast-title')?.textContent?.trim()).toBe('Test Toast');
  });

  it('renders .toast-desc when description set', async () => {
    const el = await makeElement({ title: 'Hi', description: 'A description' });
    expect(el.querySelector('.toast-desc')?.textContent?.trim()).toBe('A description');
  });

  it('applies toast-positive class', async () => {
    const el = await makeElement({ title: 'OK', intent: 'positive' });
    expect(el.querySelector('.toast')?.className).toContain('toast-positive');
  });

  it('applies toast-warning class', async () => {
    const el = await makeElement({ title: 'Warn', intent: 'warning' });
    expect(el.querySelector('.toast')?.className).toContain('toast-warning');
  });

  it('applies toast-negative class', async () => {
    const el = await makeElement({ title: 'Error', intent: 'negative' });
    expect(el.querySelector('.toast')?.className).toContain('toast-negative');
  });

  it('fires specd-dismiss on close button click', async () => {
    const el = await makeElement({ title: 'Bye' });
    let fired = false;
    el.addEventListener('specd-dismiss', () => { fired = true; });
    const btn = el.querySelector('.toast-close') as HTMLButtonElement;
    btn.click();
    expect(fired).toBe(true);
  });

  it('removes element on dismiss', async () => {
    const el = await makeElement({ title: 'Gone' });
    document.body.appendChild(el);
    const btn = el.querySelector('.toast-close') as HTMLButtonElement;
    btn.click();
    expect(document.body.contains(el)).toBe(false);
  });
});
