import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdAiPill');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-ai-pill') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdAiPill', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-ai-pill')).toBeDefined();
  });

  it('renders an inner <span> with ai-pill class', async () => {
    const el = await makeElement();
    const inner = el.querySelector('span');
    expect(inner).not.toBeNull();
    expect(inner?.className).toContain('ai-pill');
  });

  it('renders default label "Fix with AI"', async () => {
    const el = await makeElement();
    expect(el.textContent?.trim()).toContain('Fix with AI');
  });

  it('renders a custom label', async () => {
    const el = await makeElement({ label: 'Auto-fix' });
    expect(el.textContent?.trim()).toContain('Auto-fix');
  });

  it('renders a sparkle SVG icon', async () => {
    const el = await makeElement();
    const svg = el.querySelector('svg');
    expect(svg).not.toBeNull();
  });
});
