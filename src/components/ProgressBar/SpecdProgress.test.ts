import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdProgress');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-progress') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdProgress', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-progress')).toBeDefined();
  });

  it('renders a .progress-track element', async () => {
    const el = await makeElement({ value: '50' });
    expect(el.querySelector('.progress-track')).not.toBeNull();
  });

  it('renders a .progress-fill inside the track', async () => {
    const el = await makeElement({ value: '50' });
    expect(el.querySelector('.progress-fill')).not.toBeNull();
  });

  it('sets fill width to match value', async () => {
    const el = await makeElement({ value: '75' });
    const fill = el.querySelector('.progress-fill') as HTMLElement | null;
    expect(fill?.style.width).toBe('75%');
  });

  it('clamps value to 100', async () => {
    const el = await makeElement({ value: '150' });
    const fill = el.querySelector('.progress-fill') as HTMLElement | null;
    expect(fill?.style.width).toBe('100%');
  });

  it('sets aria-valuenow to value', async () => {
    const el = await makeElement({ value: '42' });
    const track = el.querySelector('.progress-track');
    expect(track?.getAttribute('aria-valuenow')).toBe('42');
  });

  it('does not set aria-valuenow for indeterminate (no value)', async () => {
    const el = await makeElement();
    const track = el.querySelector('.progress-track');
    expect(track?.hasAttribute('aria-valuenow')).toBe(false);
  });

  it('applies progress-positive class on fill when intent=positive', async () => {
    const el = await makeElement({ value: '50', intent: 'positive' });
    expect(el.querySelector('.progress-fill')?.className).toContain('progress-positive');
  });

  it('applies progress-warning class on fill when intent=warning', async () => {
    const el = await makeElement({ value: '50', intent: 'warning' });
    expect(el.querySelector('.progress-fill')?.className).toContain('progress-warning');
  });

  it('applies progress-negative class on fill when intent=negative', async () => {
    const el = await makeElement({ value: '50', intent: 'negative' });
    expect(el.querySelector('.progress-fill')?.className).toContain('progress-negative');
  });

  it('applies custom height via style', async () => {
    const el = await makeElement({ value: '50', height: '4' });
    const track = el.querySelector('.progress-track') as HTMLElement | null;
    expect(track?.style.height).toBe('4px');
  });

  it('sets aria-label on the track', async () => {
    const el = await makeElement({ value: '50', 'aria-label': 'Health score' });
    const track = el.querySelector('.progress-track');
    expect(track?.getAttribute('aria-label')).toBe('Health score');
  });
});
