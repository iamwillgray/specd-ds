import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdChoiceCard');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-choice-card') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdChoiceCard', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-choice-card')).toBeDefined();
  });

  it('renders .choice-card', async () => {
    const el = await makeElement({ title: 'Option A' });
    expect(el.querySelector('.choice-card')).not.toBeNull();
  });

  it('renders title text', async () => {
    const el = await makeElement({ title: 'Pro Plan' });
    expect(el.querySelector('.choice-card-title')?.textContent?.trim()).toBe('Pro Plan');
  });

  it('renders description when set', async () => {
    const el = await makeElement({ title: 'Free', description: 'No cost forever' });
    expect(el.querySelector('.choice-card-desc')?.textContent?.trim()).toBe('No cost forever');
  });

  it('does not have .gradient class by default', async () => {
    const el = await makeElement({ title: 'Default' });
    expect(el.querySelector('.choice-card')?.className).not.toContain('gradient');
  });

  it('adds .gradient class when variant="gradient"', async () => {
    const el = await makeElement({ title: 'Gradient', variant: 'gradient' });
    expect(el.querySelector('.choice-card')?.className).toContain('gradient');
  });

  it('renders pill span when pill attr set', async () => {
    const el = await makeElement({ title: 'X', pill: 'Popular' });
    expect(el.querySelector('.chip-v2')?.textContent?.trim()).toBe('Popular');
  });
});
