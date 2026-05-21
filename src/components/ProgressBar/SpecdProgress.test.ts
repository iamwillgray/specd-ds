import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdProgress');
});

async function makeElement(attrs: Record<string, string | number> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-progress') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdProgress', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-progress')).toBeDefined();
  });

  it('renders a .progress-bar element', async () => {
    const el = await makeElement({ value: '50' });
    expect(el.querySelector('.progress-bar')).not.toBeNull();
  });

  it('renders a .progress-bar-fill inside the track', async () => {
    const el = await makeElement({ value: '50' });
    expect(el.querySelector('.progress-bar-fill')).not.toBeNull();
  });

  it('sets fill width to match value', async () => {
    const el = await makeElement({ value: '75' });
    const fill = el.querySelector('.progress-bar-fill') as HTMLElement | null;
    expect(fill?.style.width).toBe('75%');
  });

  it('clamps value to 100', async () => {
    const el = await makeElement({ value: '150' });
    const fill = el.querySelector('.progress-bar-fill') as HTMLElement | null;
    expect(fill?.style.width).toBe('100%');
  });

  it('sets aria-valuenow to value', async () => {
    const el = await makeElement({ value: '42' });
    const track = el.querySelector('.progress-bar');
    expect(track?.getAttribute('aria-valuenow')).toBe('42');
  });

  it('does not set aria-valuenow for indeterminate (no value)', async () => {
    const el = await makeElement();
    const track = el.querySelector('.progress-bar');
    expect(track?.hasAttribute('aria-valuenow')).toBe(false);
  });

  it('applies positive class on fill when intent=positive', async () => {
    const el = await makeElement({ value: '50', intent: 'positive' });
    expect(el.querySelector('.progress-bar-fill')?.className).toContain('positive');
  });

  it('applies warning class on fill when intent=warning', async () => {
    const el = await makeElement({ value: '50', intent: 'warning' });
    expect(el.querySelector('.progress-bar-fill')?.className).toContain('warning');
  });

  it('applies negative class on fill when intent=negative', async () => {
    const el = await makeElement({ value: '50', intent: 'negative' });
    expect(el.querySelector('.progress-bar-fill')?.className).toContain('negative');
  });

  it('applies custom height via style', async () => {
    const el = await makeElement({ value: '50', height: '4' });
    const track = el.querySelector('.progress-bar') as HTMLElement | null;
    expect(track?.style.height).toBe('4px');
  });

  it('sets aria-label on the track', async () => {
    const el = await makeElement({ value: '50', 'aria-label': 'Health score' });
    const track = el.querySelector('.progress-bar');
    expect(track?.getAttribute('aria-label')).toBe('Health score');
  });

  it('renders .progress-bar track element', async () => {
    const el = await makeElement({ value: '60' });
    expect(el.querySelector('.progress-bar')).not.toBeNull();
  });

  it('renders .progress-bar-fill with correct width', async () => {
    const el = await makeElement({ value: '60' });
    const fill = el.querySelector('.progress-bar-fill') as HTMLElement;
    expect(fill).not.toBeNull();
    expect(fill.style.width).toBe('60%');
  });
});
