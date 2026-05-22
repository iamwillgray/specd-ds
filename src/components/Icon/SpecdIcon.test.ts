import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => { await import('./SpecdIcon.js'); });

async function makeIcon(props: Record<string, unknown> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-icon') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(props)) {
    if (k === 'size') {
      (el as any).size = v;
    } else {
      el.setAttribute(k, String(v));
    }
  }
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdIcon', () => {
  it('renders an svg for known icon name', async () => {
    const el = await makeIcon({ name: 'check' });
    expect(el.querySelector('svg')).not.toBeNull();
    el.remove();
  });

  it('renders empty for unknown icon name', async () => {
    const el = await makeIcon({ name: 'unknown' });
    expect(el.querySelector('svg')).toBeNull();
    el.remove();
  });

  it('applies custom size to svg', async () => {
    const el = await makeIcon({ name: 'info', size: 20 });
    const svg = el.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('20');
    expect(svg?.getAttribute('height')).toBe('20');
    el.remove();
  });

  it('renders logo-mark icon', async () => {
    const el = await makeIcon({ name: 'logo-mark' });
    expect(el.querySelector('svg')).toBeTruthy();
    el.remove();
  });

  it('renders arrow-left icon', async () => {
    const el = await makeIcon({ name: 'arrow-left' });
    expect(el.querySelector('svg')).toBeTruthy();
    el.remove();
  });

  it('renders plus icon', async () => {
    const el = await makeIcon({ name: 'plus' });
    expect(el.querySelector('svg')).toBeTruthy();
    el.remove();
  });

  it('renders trash-2 icon', async () => {
    const el = await makeIcon({ name: 'trash-2' });
    expect(el.querySelector('svg')).toBeTruthy();
    el.remove();
  });
});
