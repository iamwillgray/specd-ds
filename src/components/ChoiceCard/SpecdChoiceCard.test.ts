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

  it('renders pill when pill attr set', async () => {
    const el = await makeElement({ title: 'X', pill: 'Popular' });
    expect(el.querySelector('.choice-card-pill')?.textContent?.trim()).toBe('Popular');
  });

  it('renders .choice-card-icon when icon prop is set', async () => {
    const el = await makeElement({ icon: '<svg></svg>' });
    expect(el.querySelector('.choice-card-icon')).not.toBeNull();
  });

  it('adds gradient class to icon when iconvariant=gradient', async () => {
    const el = await makeElement({ icon: '<svg></svg>', iconvariant: 'gradient' });
    expect(el.querySelector('.choice-card-icon')?.className).toContain('gradient');
  });

  it('renders pill with mint class by default', async () => {
    const el = await makeElement({ pill: 'New' });
    expect(el.querySelector('.choice-card-pill')?.className).toContain('mint');
  });

  it('renders pill with blue class when pillcolor=blue', async () => {
    const el = await makeElement({ pill: 'Pro', pillcolor: 'blue' });
    expect(el.querySelector('.choice-card-pill')?.className).toContain('blue');
  });

  it('renders a button element at root', async () => {
    const el = document.createElement('specd-choice-card') as any;
    el.title = 'Option A';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('button')).not.toBeNull();
    expect(el.querySelector('button')?.getAttribute('type')).toBe('button');
    el.remove();
  });

  it('forwards disabled to button', async () => {
    const el = document.createElement('specd-choice-card') as any;
    el.disabled = true;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('button')?.disabled).toBe(true);
    el.remove();
  });

  it('renders .choice-card-arrow with an SVG', async () => {
    const el = await makeElement({ title: 'Option A' });
    const arrow = el.querySelector('.choice-card-arrow');
    expect(arrow).not.toBeNull();
    expect(arrow?.querySelector('svg')).not.toBeNull();
    el.remove();
  });
});
