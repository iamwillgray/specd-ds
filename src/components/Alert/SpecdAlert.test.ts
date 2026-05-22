import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdAlert');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement & { updateComplete: Promise<boolean> }> {
  const el = document.createElement('specd-alert') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdAlert', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-alert')).toBeDefined();
  });

  it('renders .alert', async () => {
    const el = await makeElement({ title: 'Info' });
    expect(el.querySelector('.alert')).not.toBeNull();
  });

  it('applies alert-neutral class by default', async () => {
    const el = await makeElement({ title: 'Note' });
    expect(el.querySelector('.alert')?.className).toContain('alert-neutral');
  });

  it('applies alert-positive class', async () => {
    const el = await makeElement({ intent: 'positive', title: 'Good' });
    expect(el.querySelector('.alert')?.className).toContain('alert-positive');
  });

  it('applies alert-warning class', async () => {
    const el = await makeElement({ intent: 'warning', title: 'Warn' });
    expect(el.querySelector('.alert')?.className).toContain('alert-warning');
  });

  it('applies alert-negative class', async () => {
    const el = await makeElement({ intent: 'negative', title: 'Error' });
    expect(el.querySelector('.alert')?.className).toContain('alert-negative');
  });

  it('renders title text', async () => {
    const el = await makeElement({ title: 'Alert Title' });
    expect(el.querySelector('.alert-title')?.textContent?.trim()).toBe('Alert Title');
  });

  it('renders description when set', async () => {
    const el = await makeElement({ title: 'Hi', description: 'Some detail' });
    expect(el.querySelector('.alert-desc')?.textContent?.trim()).toBe('Some detail');
  });

  it('omits description when not set', async () => {
    const el = await makeElement({ title: 'Hi' });
    expect(el.querySelector('.alert-desc')).toBeNull();
  });

  it('has role="alert" for negative intent', async () => {
    const el = await makeElement({ intent: 'negative', title: 'Error' });
    expect(el.querySelector('[role="alert"]')).not.toBeNull();
  });

  it('has role="alert" for warning intent', async () => {
    const el = await makeElement({ intent: 'warning', title: 'Caution' });
    expect(el.querySelector('[role="alert"]')).not.toBeNull();
  });

  it('has role="status" for positive intent', async () => {
    const el = await makeElement({ intent: 'positive', title: 'Success' });
    expect(el.querySelector('[role="status"]')).not.toBeNull();
  });

  it('has role="status" for neutral intent', async () => {
    const el = await makeElement({ intent: 'neutral', title: 'Info' });
    expect(el.querySelector('[role="status"]')).not.toBeNull();
  });
});
