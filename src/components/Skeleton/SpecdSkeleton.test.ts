import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdSkeleton');
});

async function makeElement(props: Record<string, unknown> = {}): Promise<HTMLElement & { updateComplete: Promise<boolean> }> {
  const el = document.createElement('specd-skeleton') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(props)) {
    (el as any)[k] = v;
  }
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdSkeleton', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-skeleton')).toBeDefined();
  });

  it('renders .skeleton', async () => {
    const el = await makeElement();
    expect(el.querySelector('.skeleton')).not.toBeNull();
  });

  it('text variant renders .skeleton-text', async () => {
    const el = await makeElement({ variant: 'text' });
    expect(el.querySelector('.skeleton-text')).not.toBeNull();
  });

  it('rect variant renders .skeleton-rect', async () => {
    const el = await makeElement({ variant: 'rect' });
    expect(el.querySelector('.skeleton-rect')).not.toBeNull();
  });

  it('circle variant renders .skeleton-circle', async () => {
    const el = await makeElement({ variant: 'circle' });
    expect(el.querySelector('.skeleton-circle')).not.toBeNull();
  });

  it('multi-line renders N skeleton-text elements', async () => {
    const el = await makeElement({ variant: 'text', lines: 3 });
    expect(el.querySelectorAll('.skeleton-text').length).toBe(3);
  });

  it('last line of multi-line has width:60% style', async () => {
    const el = await makeElement({ variant: 'text', lines: 3 });
    const lines = el.querySelectorAll('.skeleton-text');
    const lastLine = lines[lines.length - 1] as HTMLElement;
    expect(lastLine.style.width).toBe('60%');
  });
});
