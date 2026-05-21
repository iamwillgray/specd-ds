import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdSeverityHeader');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-severity-header') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdSeverityHeader', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-severity-header')).toBeDefined();
  });

  it('renders a .severity-header div', async () => {
    const el = await makeElement({ intent: 'info', label: 'Info' });
    expect(el.querySelector('.severity-header')).not.toBeNull();
  });

  it('applies .severity-dot.critical for critical intent', async () => {
    const el = await makeElement({ intent: 'critical', label: 'Critical' });
    const dot = el.querySelector('.severity-dot');
    expect(dot?.className).toContain('critical');
  });

  it('applies .severity-dot.warning for warning intent', async () => {
    const el = await makeElement({ intent: 'warning', label: 'Warnings' });
    const dot = el.querySelector('.severity-dot');
    expect(dot?.className).toContain('warning');
  });

  it('applies .severity-dot.info for info intent', async () => {
    const el = await makeElement({ intent: 'info', label: 'Info' });
    const dot = el.querySelector('.severity-dot');
    expect(dot?.className).toContain('info');
  });

  it('shows the label text', async () => {
    const el = await makeElement({ intent: 'info', label: 'All Issues' });
    expect(el.querySelector('.severity-title')?.textContent?.trim()).toBe('All Issues');
  });

  it('shows count when count attr is set', async () => {
    const el = await makeElement({ intent: 'critical', label: 'Critical', count: '3' });
    const countEl = el.querySelector('.severity-count');
    expect(countEl).not.toBeNull();
    expect(countEl?.textContent?.trim()).toBe('3');
  });

  it('omits count span when count attr is not set', async () => {
    const el = await makeElement({ intent: 'info', label: 'All Issues' });
    expect(el.querySelector('.severity-count')).toBeNull();
  });
});
